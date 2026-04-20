import React, { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import jsPDF from "jspdf";

const supabaseUrl = "https://sbmlhkniysjflvaxwomp.supabase.co";
const supabaseAnonKey = "YOUR_KEY_HERE";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const logoUrl = "/logo.jpg";

function App() {
  const [customers, setCustomers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [customerSearch, setCustomerSearch] = useState("");

  const selected = customers.find(c => c.id === selectedId) || null;

  const filteredCustomers = customers.filter((c) => {
    const q = customerSearch.trim().toLowerCase();
    if (!q) return true;
    return [c.name, c.phone, c.email].join(" ").toLowerCase().includes(q);
  });

  function buildPdf(title, text) {
    const pdf = new jsPDF({ unit: "pt", format: "letter" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 40;
    const contentWidth = pageWidth - margin * 2;

    let y = 40;

    try {
      pdf.addImage(logoUrl, "JPEG", margin, y, 120, 60);
    } catch (e) {}

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.text("AtticSafe", margin + 135, 58);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text("2511 Stenson Dr, Cedar Park, TX 78613", margin + 135, 74);
    pdf.text("(512) 766-9089  •  office@atticsafe.com", margin + 135, 88);

    y = 120;

    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, y, pageWidth - margin, y);
    y += 24;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text(title, margin, y);
    y += 20;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);

    const lines = pdf.splitTextToSize(text, contentWidth);

    lines.forEach((line) => {
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = 40;
      }

      const trimmed = String(line).trim();
      const isSection =
        trimmed === trimmed.toUpperCase() &&
        trimmed.length > 0 &&
        trimmed.length < 60 &&
        !trimmed.includes(":");

      if (isSection) {
        y += 8;
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(11);
        pdf.text(trimmed, margin, y);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        y += 14;
      } else {
        pdf.text(line, margin, y);
        y += 14;
      }
    });

    return pdf;
  }

  function downloadPdf() {
    if (!selected) return;
    const pdf = buildPdf("Service Agreement", "Sample text...");
    pdf.save("agreement.pdf");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Customers</h2>

      <input
        value={customerSearch}
        onChange={(e) => setCustomerSearch(e.target.value)}
        placeholder="Search..."
        style={{ marginBottom: 10 }}
      />

      {filteredCustomers.map(c => (
        <div key={c.id} onClick={() => setSelectedId(c.id)}>
          {c.name}
        </div>
      ))}

      <button onClick={downloadPdf}>Download PDF</button>
    </div>
  );
}

export default App;
