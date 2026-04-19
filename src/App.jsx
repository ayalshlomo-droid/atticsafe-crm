import React, { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sbmlhkniysjflvaxwomp.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNibWxoa25peXNqZmx2YXh3b21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MDQzMTMsImV4cCI6MjA5MjE4MDMxM30.Gc7IZt0czP6XM1FOsGUMVtyjoZZSZd1gzc2pwBLTNak";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const contractFinePrint = `1. PARTIES
This Agreement is entered into between the Owner and Contractor: AtticSafe, 2511 Stenson Dr, Cedar Park, TX 78613.

2. SCOPE OF WORK
Protection & Containment
• Seal attic access point
• Install protective plastic barriers
• Protect the home from dust and cross-contamination during removal and installation

Removal & Disposal of Existing Insulation
• Complete vacuum extraction of old insulation
• Safe bagging and containment of contaminated materials
• Proper haul-away and disposal of debris

Important:
Removal services are limited to insulation and insulation-related materials only (including dust, loose debris, and contaminants that can be removed using standard insulation removal equipment). Contractor is not responsible for removal of construction debris, roofing materials, wood, drywall, furniture, personal items, or any non-insulation-related materials discovered in the attic. Contractor may, at its sole discretion, remove certain additional debris; however, such removal is not included in this Agreement and may result in additional charges if performed. Any non-insulation debris removal requested by Owner will be treated as additional work and priced separately.

Attic Sanitizing & Deodorizing
• Application of professional-grade disinfectant
• Treatment to eliminate bacteria and odor-causing contaminants
• Improve overall attic cleanliness and air quality

Rodent Proofing & Sealing
• Identify potential entry points
• Seal obvious accessible gaps, cracks, and vulnerable openings as much as possible from the attic only

New Insulation Installation
• Installation of new insulation
• Full coverage across approximately ____ sq ft
• Installed to meet current energy efficiency and building code standards

3. CONTRACT PRICE
Pricing is valid for 14 days from estimate date. Any additional work not listed in the Scope must be approved in writing (text or email acceptable) before being performed.

4. PAYMENT TERMS
Final payment is due immediately upon completion and before Contractor leaves the property. Late payments accrue interest at 1.5% per month (or maximum allowed by Texas law). Contractor reserves the right to file a mechanic’s lien in accordance with Texas Property Code if payment is not received.

5. PROJECT SCHEDULE
Estimated Start Date: ____ Estimated Completion Date: ____

6. NO ENERGY SAVINGS GUARANTEE
Owner understands Contractor does not guarantee specific energy savings, temperature reduction, or utility bill decreases. Results vary based on HVAC performance, duct leakage, home construction, ventilation, and other factors beyond Contractor’s control.

7. PRE-EXISTING CONDITIONS
Contractor is not responsible for pre-existing attic conditions including but not limited to roof leaks, mold or microbial growth, pest or rodent damage, damaged ductwork, electrical issues, improper ventilation, structural defects, prior code violations. Discovery of hazardous materials (including vermiculite, asbestos, or suspected mold contamination) will result in immediate suspension of work pending further evaluation.

8. OWNER RESPONSIBILITIES
Owner agrees to provide safe attic access, remove or protect personal belongings, ensure electricity is available, keep children and pets away from work area, and not enter attic during installation. Attic work may generate dust despite reasonable containment efforts.

9. DOCUMENTATION
Contractor may take before-and-after photographs for documentation, quality control, and dispute prevention purposes. Photos will not include personal identifying information.

10. WARRANTY
Contractor provides a 1-Year Workmanship Warranty and manufacturer warranty on materials (if applicable). Warranty excludes water intrusion, pest infestation, structural movement, acts of God, and damage caused by others after completion. Contractor’s maximum liability shall not exceed the total contract price.

11. UNFORESEEN CONDITIONS
If concealed conditions are discovered that require additional work, Contractor will notify Owner and provide written change order before proceeding.

12. INSURANCE
Contractor maintains General Liability Insurance. Proof available upon request.

13. RIGHT TO CANCEL (TEXAS LAW)
You may cancel this transaction without penalty within three (3) business days from the date of signing. Cancellation must be submitted in writing before midnight of the third business day.

14. LIMITATION OF SERVICES
Contractor’s services are limited to attic insulation work, treatment and removal of contaminants, and disinfection intended to improve attic conditions and indoor air quality. Contractor may seal obvious and accessible openings observed from within the attic during the performance of work; however, Contractor does not perform roofing, exterior repairs, structural repairs, pest control services, or comprehensive exclusion work. Any sealing performed is limited to interior attic areas only and does not constitute a guarantee against pest entry, re-entry, or future contamination. Conditions outside visible and reasonably accessible attic areas are excluded from the scope of this Agreement unless expressly stated in writing.

Debris Limitation Clause:
Contractor’s debris removal services are strictly limited to insulation and insulation-related materials that can be removed using standard insulation vacuum equipment. Contractor shall not be obligated to remove large, heavy, hazardous, or non-insulation-related items including but not limited to construction debris, lumber, roofing materials, stored items, or abandoned materials found in the attic. Any such items remain the responsibility of the Owner unless otherwise agreed to in writing.

15. ENTIRE AGREEMENT
This document represents the entire agreement between the parties. No verbal statements are binding unless included in writing.

AtticSafe / (512) 766-9089 / office@atticsafe.com / 2511 Stenson Drive, Cedar Park, TX 78613`;

const completionFinePrint = `Final Work Completion & Customer Acceptance

Customer Acceptance
I / We have inspected the work performed at the property listed above and confirm that the services have been completed to our satisfaction. By signing below, we acknowledge that the project has been completed and accepted in its current condition.
I / We hereby release AtticSafe and its owners, employees, and representatives from further liability related to the completed work described above.

AtticSafe | 2511 Stenson Drive, Cedar Park, TX 78613 | www.atticsafe.com | 512.766.9089`;

const logoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/320px-Placeholder_view_vector.svg.png";

const cardStyle = { background: "var(--card)", border: "1px solid var(--line)", borderRadius: 20, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" };
const inputStyle = { width: "100%", padding: "10px 12px", borderRadius: 12, border: "1px solid var(--line)", background: "#fff" };
const buttonStyle = { padding: "10px 14px", borderRadius: 12, border: "1px solid var(--line)", background: "white", cursor: "pointer" };
const primaryButton = { ...buttonStyle, background: "var(--blue)", color: "white", borderColor: "var(--blue)" };

function App() {
  const [session, setSession] = useState(null);
  const [mode, setMode] = useState("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", address: "", stage: "Lead", notes: "",
    service_scope: "", completion_scope: "", contract_price: "", deposit: "",
    balance_due: "", report_no: "", estimate_date: ""
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) loadCustomers();
  }, [session]);

  async function loadCustomers() {
    setLoading(true);
    const { data, error } = await supabase.from("customers").select("*").order("estimate_date", { ascending: false });
    if (!error) {
      setCustomers(data || []);
      if ((data || []).length && !selectedId) setSelectedId(data[0].id);
    } else {
      setAuthMessage(error.message);
    }
    setLoading(false);
  }

  async function handleAuth(e) {
    e.preventDefault();
    setAuthMessage("");
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email: authEmail, password: authPassword });
      setAuthMessage(error ? error.message : "Account created. Check email if confirmation is required, then sign in.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
      if (error) setAuthMessage(error.message);
    }
  }

  async function logout() {
    await supabase.auth.signOut();
  }

  async function addCustomer(e) {
    e.preventDefault();
    const payload = {
      ...form,
      contract_price: form.contract_price ? Number(form.contract_price) : null,
      deposit: form.deposit ? Number(form.deposit) : null,
      balance_due: form.balance_due ? Number(form.balance_due) : null,
      estimate_date: form.estimate_date || null,
    };
    const { error } = await supabase.from("customers").insert(payload);
    if (error) {
      alert(error.message);
      return;
    }
    setForm({
      name: "", phone: "", email: "", address: "", stage: "Lead", notes: "",
      service_scope: "", completion_scope: "", contract_price: "", deposit: "",
      balance_due: "", report_no: "", estimate_date: ""
    });
    loadCustomers();
  }

  async function updateSelected(field, value) {
    setCustomers((prev) => prev.map((c) => c.id === selectedId ? { ...c, [field]: value } : c));
    const updates = { [field]: ["contract_price","deposit","balance_due"].includes(field) ? (value ? Number(value) : null) : value };
    const { error } = await supabase.from("customers").update(updates).eq("id", selectedId);
    if (error) alert(error.message);
  }

  async function deleteSelected() {
    if (!selectedId) return;
    if (!window.confirm("Delete this customer?")) return;
    const { error } = await supabase.from("customers").delete().eq("id", selectedId);
    if (error) {
      alert(error.message);
      return;
    }
    setSelectedId(null);
    loadCustomers();
  }

  const selected = customers.find(c => c.id === selectedId) || null;

  const totals = useMemo(() => {
    const revenue = customers.reduce((sum, c) => sum + Number(c.contract_price || 0), 0);
    return {
      leads: customers.filter(c => c.stage === "Lead").length,
      estimates: customers.filter(c => c.stage === "Estimate").length,
      scheduled: customers.filter(c => c.stage === "Scheduled").length,
      inProgress: customers.filter(c => c.stage === "In Progress").length,
      completed: customers.filter(c => c.stage === "Completed").length,
      revenue
    };
  }, [customers]);

  const contractText = selected ? `AGREEMENT

Owner: ${selected.name || ""}
Property Address: ${selected.address || ""}
Phone: ${selected.phone || ""}
Email: ${selected.email || ""}
Contract / Job #: ${selected.report_no || ""}

CUSTOM SCOPE OF WORK
${selected.service_scope || ""}

Total Contract Price: $${selected.contract_price || ""}
Deposit: $${selected.deposit || ""}
Balance Due Upon Completion: $${selected.balance_due || ""}

${contractFinePrint}` : "";

  const completionText = selected ? `FINAL WORK COMPLETION & CUSTOMER ACCEPTANCE

Project Information
Contract / Job #: ${selected.report_no || ""}
Customer Name(s): ${selected.name || ""}
Property Address: ${selected.address || ""}

Work Performed
${selected.completion_scope || ""}

FINAL PAYMENT SUMMARY
Total Project Cost: $${selected.contract_price || ""}
Deposit Previously Paid: $${selected.deposit || ""}
Balance Paid Today: $${selected.balance_due || ""}

${completionFinePrint}` : "";

  function downloadText(filename, text) {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!session) {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
        <div style={{ maxWidth: 980, width: "100%", display: "grid", gap: 24, gridTemplateColumns: "1.1fr 1fr" }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <img src={logoUrl} alt="AtticSafe" style={{ width: 84, height: 84, borderRadius: 20, objectFit: "contain", background: "#fff", padding: 6, border: "1px solid var(--line)" }} />
              <div>
                <div style={{ fontSize: 36, fontWeight: 700 }}>AtticSafe CRM</div>
                <div style={{ color: "var(--muted)" }}>Secure login for leads, estimates, contracts, and completion reports.</div>
              </div>
            </div>
            <div style={cardStyle}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>What this version does</div>
              <div style={{ color: "var(--muted)", lineHeight: 1.7 }}>
                Private login, live customer saving, dashboard, estimate scheduling, custom scope of work, completion report wording, and contract storage tied to your account.
              </div>
            </div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>{mode === "login" ? "Sign in" : "Create owner account"}</div>
            <form onSubmit={handleAuth} style={{ display: "grid", gap: 14 }}>
              <input style={inputStyle} placeholder="Email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} />
              <input style={inputStyle} type="password" placeholder="Password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} />
              <button type="submit" style={primaryButton}>{mode === "login" ? "Sign in" : "Create account"}</button>
              <button type="button" style={buttonStyle} onClick={() => setMode(mode === "login" ? "signup" : "login")}>
                {mode === "login" ? "Need an account? Create one" : "Already have an account? Sign in"}
              </button>
              {authMessage ? <div style={{ color: "var(--danger)", fontSize: 14 }}>{authMessage}</div> : null}
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gap: 24 }}>
        <div style={{ ...cardStyle, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img src={logoUrl} alt="AtticSafe" style={{ width: 64, height: 64, borderRadius: 16, objectFit: "contain", background: "#fff", padding: 4, border: "1px solid var(--line)" }} />
            <div>
              <div style={{ fontSize: 30, fontWeight: 700 }}>AtticSafe CRM</div>
              <div style={{ color: "var(--muted)" }}>Dashboard, customers, estimates, contracts, and completion reports</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ padding: "8px 12px", borderRadius: 999, background: "#ecfdf5", color: "#047857", border: "1px solid #a7f3d0" }}>{session.user.email}</div>
            <button style={buttonStyle} onClick={logout}>Log out</button>
          </div>
        </div>

        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
          {[
            ["Leads", totals.leads],
            ["Estimates", totals.estimates],
            ["Scheduled", totals.scheduled],
            ["In Progress", totals.inProgress],
            ["Completed", totals.completed],
            ["Revenue", `$${totals.revenue.toLocaleString()}`],
          ].map(([label, value]) => (
            <div key={label} style={cardStyle}>
              <div style={{ color: "var(--muted)", fontSize: 14 }}>{label}</div>
              <div style={{ fontSize: 30, fontWeight: 700, marginTop: 6 }}>{value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gap: 24, gridTemplateColumns: "1fr 1.2fr 1fr" }}>
          <div style={cardStyle}>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Customers {loading ? "• Loading..." : ""}</div>
            <div style={{ display: "grid", gap: 10, maxHeight: 650, overflow: "auto" }}>
              {customers.map(c => (
                <button key={c.id} onClick={() => setSelectedId(c.id)} style={{
                  textAlign: "left", padding: 14, borderRadius: 16, border: c.id === selectedId ? "2px solid var(--blue)" : "1px solid var(--line)",
                  background: "#fff", cursor: "pointer"
                }}>
                  <div style={{ fontWeight: 700 }}>{c.name || "Unnamed customer"}</div>
                  <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 4 }}>{c.address}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 8 }}>{c.stage} • {c.phone}</div>
                </button>
              ))}
              {!customers.length ? <div style={{ color: "var(--muted)" }}>No customers yet.</div> : null}
            </div>
          </div>

          <div style={cardStyle}>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Customer Info</div>
            {selected ? (
              <div style={{ display: "grid", gap: 12 }}>
                <input style={inputStyle} value={selected.name || ""} onChange={e => updateSelected("name", e.target.value)} placeholder="Name" />
                <input style={inputStyle} value={selected.phone || ""} onChange={e => updateSelected("phone", e.target.value)} placeholder="Phone" />
                <input style={inputStyle} value={selected.email || ""} onChange={e => updateSelected("email", e.target.value)} placeholder="Email" />
                <input style={inputStyle} value={selected.address || ""} onChange={e => updateSelected("address", e.target.value)} placeholder="Address" />
                <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
                  <select style={inputStyle} value={selected.stage || "Lead"} onChange={e => updateSelected("stage", e.target.value)}>
                    <option>Lead</option>
                    <option>Estimate</option>
                    <option>Scheduled</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                  <input style={inputStyle} type="date" value={selected.estimate_date ? String(selected.estimate_date).slice(0,10) : ""} onChange={e => updateSelected("estimate_date", e.target.value)} />
                </div>
                <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr 1fr" }}>
                  <input style={inputStyle} value={selected.contract_price ?? ""} onChange={e => updateSelected("contract_price", e.target.value)} placeholder="Contract price" />
                  <input style={inputStyle} value={selected.deposit ?? ""} onChange={e => updateSelected("deposit", e.target.value)} placeholder="Deposit" />
                  <input style={inputStyle} value={selected.balance_due ?? ""} onChange={e => updateSelected("balance_due", e.target.value)} placeholder="Balance due" />
                </div>
                <input style={inputStyle} value={selected.report_no || ""} onChange={e => updateSelected("report_no", e.target.value)} placeholder="Report / Job #" />
                <textarea style={{...inputStyle, minHeight: 90}} value={selected.notes || ""} onChange={e => updateSelected("notes", e.target.value)} placeholder="Notes" />
                <textarea style={{...inputStyle, minHeight: 120}} value={selected.service_scope || ""} onChange={e => updateSelected("service_scope", e.target.value)} placeholder="Contract scope of work" />
                <textarea style={{...inputStyle, minHeight: 100}} value={selected.completion_scope || ""} onChange={e => updateSelected("completion_scope", e.target.value)} placeholder="Completion report work performed" />
                <div style={{ display: "flex", gap: 10 }}>
                  <button style={{...buttonStyle, color: "white", background: "var(--danger)", borderColor: "var(--danger)"}} onClick={deleteSelected}>Delete</button>
                </div>
              </div>
            ) : <div style={{ color: "var(--muted)" }}>Select a customer.</div>}
          </div>

          <div style={cardStyle}>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Add Customer</div>
            <form onSubmit={addCustomer} style={{ display: "grid", gap: 12 }}>
              <input style={inputStyle} value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Name" />
              <input style={inputStyle} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="Phone" />
              <input style={inputStyle} value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Email" />
              <input style={inputStyle} value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="Address" />
              <select style={inputStyle} value={form.stage} onChange={e => setForm({...form, stage: e.target.value})}>
                <option>Lead</option>
                <option>Estimate</option>
                <option>Scheduled</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
              <input style={inputStyle} type="date" value={form.estimate_date} onChange={e => setForm({...form, estimate_date: e.target.value})} />
              <textarea style={{...inputStyle, minHeight: 90}} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="Lead notes" />
              <button type="submit" style={primaryButton}>Save customer</button>
            </form>
          </div>
        </div>

        <div style={{ display: "grid", gap: 24, gridTemplateColumns: "1fr 1fr" }}>
          <div style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 22, fontWeight: 700 }}>Service Agreement</div>
              <button style={buttonStyle} onClick={() => selected && downloadText(`contract-${selected.name || "customer"}.txt`, contractText)}>Download</button>
            </div>
            <pre style={{ whiteSpace: "pre-wrap", fontFamily: "Arial, Helvetica, sans-serif", fontSize: 14, lineHeight: 1.65, margin: 0 }}>{contractText || "Select a customer to preview contract."}</pre>
          </div>
          <div style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 22, fontWeight: 700 }}>Completion Report</div>
              <button style={buttonStyle} onClick={() => selected && downloadText(`completion-${selected.name || "customer"}.txt`, completionText)}>Download</button>
            </div>
            <pre style={{ whiteSpace: "pre-wrap", fontFamily: "Arial, Helvetica, sans-serif", fontSize: 14, lineHeight: 1.65, margin: 0 }}>{completionText || "Select a customer to preview completion report."}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;