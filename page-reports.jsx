// Reports page

function ReportsPage() {
  const reports = [
    { cat: 'GST', items: [
      { name: 'GSTR-1 · Outward supplies', desc: 'Tax invoices issued, B2B + B2C', due: 'Due 11 May', ico: 'invoice' },
      { name: 'GSTR-3B · Summary return', desc: 'Monthly summary of liabilities', due: 'Due 20 May', ico: 'reports' },
      { name: 'HSN summary', desc: 'Auto-grouped by HSN code', ico: 'tag' },
    ]},
    { cat: 'Sales', items: [
      { name: 'Sales by customer', desc: 'Top customers, billed amounts', ico: 'customers' },
      { name: 'Sales by product', desc: 'Quantities and revenue per SKU', ico: 'products' },
      { name: 'Sales by salesperson', desc: 'Performance by team member', ico: 'sales' },
      { name: 'Day book', desc: 'Chronological list of all transactions', ico: 'history' },
    ]},
    { cat: 'Receivables', items: [
      { name: 'Aging analysis', desc: 'Outstanding by 0–30, 31–60, 60+ days', ico: 'history' },
      { name: 'Customer statement', desc: 'PDF account statement per customer', ico: 'mail' },
      { name: 'Reminder log', desc: 'Sent reminders and responses', ico: 'bell' },
    ]},
  ];
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Reports</h1>
          <div className="sub">Pre-built reports for filing, accounting, and business review</div>
        </div>
        <div className="row">
          <div className="seg">
            <button>This month</button>
            <button className="on">FY 2026</button>
            <button>Custom</button>
          </div>
        </div>
      </div>

      {reports.map(group => (
        <div key={group.cat} style={{ marginBottom: 28 }}>
          <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted)', marginBottom: 10, fontWeight: 600 }}>{group.cat}</h3>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {group.items.map(r => (
              <div key={r.name} className="card clickable" style={{ cursor: 'pointer', padding: 16, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 36, height: 36, borderRadius: 'var(--radius)', background: 'var(--surface-2)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <Ico name={r.ico} size={16}/>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="row between" style={{ marginBottom: 2 }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</span>
                    {r.due && <span className="pill due">{r.due}</span>}
                  </div>
                  <div className="muted" style={{ fontSize: 12.5 }}>{r.desc}</div>
                </div>
                <Ico name="arrow-right" size={14} stroke={1.4}/>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

window.ReportsPage = ReportsPage;
