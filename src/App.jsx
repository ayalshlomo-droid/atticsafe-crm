const [customers, setCustomers] = useState([]);
const [selectedId, setSelectedId] = useState(null);
const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [customerSearch, setCustomerSearch] = useState("");
const [activeTab, setActiveTab] = useState("customers");
const [settings, setSettings] = useState({
id: null,
@@ -311,6 +312,11 @@
pdf.save(`completion-${(selected.name || "customer").replace(/\s+/g, "-").toLowerCase()}.pdf`);
}

  const filteredCustomers = customers.filter((c) => {
  const q = customerSearch.trim().toLowerCase();
  if (!q) return true;
  return [c.name, c.phone, c.email].join(" ").toLowerCase().includes(q);
});
const selected = customers.find(c => c.id === selectedId) || null;

const totals = useMemo(() => {
@@ -446,8 +452,14 @@
<div className="three-col" style={{ display: "grid", gap: 24, gridTemplateColumns: "1fr 1.2fr 1fr" }}>
<div style={cardStyle}>
<div style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Customers {loadingCustomers ? "• Loading..." : ""}</div>
              <input
  style={{ ...inputStyle, marginBottom: 12 }}
  value={customerSearch}
  onChange={(e) => setCustomerSearch(e.target.value)}
  placeholder="Search by name, phone, or email"
/>
<div style={{ display: "grid", gap: 10, maxHeight: 700, overflow: "auto" }}>
                {customers.map(c => (
                {filteredCustomers.map(c => (
<button key={c.id} onClick={() => setSelectedId(c.id)} style={{
textAlign: "left", padding: 14, borderRadius: 16, border: c.id === selectedId ? "2px solid var(--blue)" : "1px solid var(--line)",
background: "#fff", cursor: "pointer"
@@ -457,124 +469,124 @@
<div style={{ fontSize: 13, color: "var(--muted)", marginTop: 8 }}>{c.stage} • {c.phone}</div>
</button>
))}
                {!customers.length ? <div style={{ color: "var(--muted)" }}>No customers yet.</div> : null}
               {!filteredCustomers.length ? <div style={{ color: "var(--muted)" }}>No matching customers.</div> : null}
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

<div className="two-col" style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
<select style={inputStyle} value={selected.stage || "Lead"} onChange={e => updateSelected("stage", e.target.value)}>
<option>Lead</option>
<option>Estimate</option>
<option>Scheduled</option>
<option>In Progress</option>
<option>Completed</option>
</select>
<input style={inputStyle} type="date" value={selected.estimate_date ? String(selected.estimate_date).slice(0,10) : ""} onChange={e => updateSelected("estimate_date", e.target.value)} />
</div>

<div className="two-col" style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
<input style={inputStyle} type="date" value={selected.expected_start_date ? String(selected.expected_start_date).slice(0,10) : ""} onChange={e => updateSelected("expected_start_date", e.target.value)} />
<input style={inputStyle} type="date" value={selected.expected_finish_date ? String(selected.expected_finish_date).slice(0,10) : ""} onChange={e => updateSelected("expected_finish_date", e.target.value)} />
</div>

<div className="three-col" style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr 1fr" }}>
<input style={inputStyle} value={selected.contract_price ?? ""} onChange={e => updateSelected("contract_price", e.target.value)} placeholder="Contract price" />
<input style={inputStyle} value={selected.deposit ?? ""} onChange={e => updateSelected("deposit", e.target.value)} placeholder="Deposit" />
<input style={inputStyle} value={selected.balance_due ?? ""} onChange={e => updateSelected("balance_due", e.target.value)} placeholder="Balance due" />
</div>

<input style={inputStyle} value={selected.report_no || ""} onChange={e => updateSelected("report_no", e.target.value)} placeholder="Report / Job #" />
<textarea style={{...inputStyle, minHeight: 90}} value={selected.notes || ""} onChange={e => updateSelected("notes", e.target.value)} placeholder="Notes" />
<textarea style={{...inputStyle, minHeight: 120}} value={selected.service_scope || ""} onChange={e => updateSelected("service_scope", e.target.value)} placeholder="Contract scope of work" />
<textarea style={{...inputStyle, minHeight: 100}} value={selected.completion_scope || ""} onChange={e => updateSelected("completion_scope", e.target.value)} placeholder="Completion report work performed" />

<div className="two-col" style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
<input style={inputStyle} value={selected.customer_signature || ""} onChange={e => updateSelected("customer_signature", e.target.value)} placeholder="Customer signature name" />
<input style={inputStyle} type="date" value={selected.customer_sign_date ? String(selected.customer_sign_date).slice(0,10) : ""} onChange={e => updateSelected("customer_sign_date", e.target.value)} />
<input style={inputStyle} value={selected.contractor_signature || ""} onChange={e => updateSelected("contractor_signature", e.target.value)} placeholder="Contractor signature name" />
<input style={inputStyle} type="date" value={selected.contractor_sign_date ? String(selected.contractor_sign_date).slice(0,10) : ""} onChange={e => updateSelected("contractor_sign_date", e.target.value)} />
</div>

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
<input style={inputStyle} type="date" value={form.expected_start_date} onChange={e => setForm({...form, expected_start_date: e.target.value})} />
<input style={inputStyle} type="date" value={form.expected_finish_date} onChange={e => setForm({...form, expected_finish_date: e.target.value})} />
<textarea style={{...inputStyle, minHeight: 90}} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="Lead notes" />
<button type="submit" style={primaryButton}>Save customer</button>
</form>
</div>
</div>
) : null}

{activeTab === "documents" ? (
<div className="two-col" style={{ display: "grid", gap: 24, gridTemplateColumns: "1fr 1fr" }}>
<div style={cardStyle}>
<div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", marginBottom: 12 }}>
<div style={{ fontSize: 22, fontWeight: 700 }}>Service Agreement</div>
<button style={buttonStyle} onClick={downloadAgreementPdf}>Download PDF</button>
</div>
<pre style={{ whiteSpace: "pre-wrap", fontFamily: "Arial, Helvetica, sans-serif", fontSize: 14, lineHeight: 1.65 }}>{contractText || "Select a customer to preview agreement."}</pre>
</div>
<div style={cardStyle}>
<div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", marginBottom: 12 }}>
<div style={{ fontSize: 22, fontWeight: 700 }}>Completion Report</div>
<button style={buttonStyle} onClick={downloadCompletionPdf}>Download PDF</button>
</div>
<pre style={{ whiteSpace: "pre-wrap", fontFamily: "Arial, Helvetica, sans-serif", fontSize: 14, lineHeight: 1.65 }}>{completionText || "Select a customer to preview completion report."}</pre>
</div>
</div>
) : null}

{activeTab === "settings" ? (
<div style={cardStyle}>
<div style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Global Fine Print Settings</div>
<div style={{ display: "grid", gap: 16 }}>
<div>
<div style={{ fontWeight: 700, marginBottom: 8 }}>Service Agreement Fine Print</div>
<textarea style={{ ...inputStyle, minHeight: 320 }} value={settings.service_agreement_fine_print} onChange={(e) => setSettings({ ...settings, service_agreement_fine_print: e.target.value })} />
</div>
<div>
<div style={{ fontWeight: 700, marginBottom: 8 }}>Completion Report Fine Print</div>
<textarea style={{ ...inputStyle, minHeight: 220 }} value={settings.completion_report_fine_print} onChange={(e) => setSettings({ ...settings, completion_report_fine_print: e.target.value })} />
</div>
<div>
<button style={primaryButton} onClick={saveSettings}>{savingSettings ? "Saving..." : "Save Settings"}</button>
</div>
</div>
</div>
) : null}
</div>
</div>
);
}

export default App;
