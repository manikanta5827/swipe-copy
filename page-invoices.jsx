// Invoices list page

function InvoicesList({ setPage, openInvoice }) {
  const [filter, setFilter] = React.useState('all');
  const [search, setSearch] = React.useState('');
  const [selected, setSelected] = React.useState(new Set());

  const filtered = SEED_INVOICES.filter(inv => {
    if (filter !== 'all' && inv.status !== filter) return false;
    if (search && !inv.customer.toLowerCase().includes(search.toLowerCase()) && !inv.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totals = filtered.reduce((acc, i) => {
    acc.total += i.amount;
    if (i.status === 'paid') acc.paid += i.amount;
    if (i.status === 'overdue') acc.overdue += i.amount;
    return acc;
  }, { total: 0, paid: 0, overdue: 0 });

  const toggle = (id) => {
    setSelected(s => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const toast = useToast();

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Invoices</h1>
          <div className="sub">{filtered.length} invoices · {fmtINR(totals.total)} total · {fmtINR(totals.overdue)} overdue</div>
        </div>
        <div className="row">
          <button className="btn"><Ico name="download" size={14}/> Export</button>
          <button className="btn accent" onClick={() => setPage('create')}><Ico name="plus" size={14}/> New invoice</button>
        </div>
      </div>

      <div className="card">
        <div className="card-head" style={{ padding: '12px 16px', flexWrap: 'wrap', gap: 10 }}>
          <div className="seg">
            {[
              { id: 'all', label: 'All', count: SEED_INVOICES.length },
              { id: 'draft', label: 'Draft' },
              { id: 'sent', label: 'Sent' },
              { id: 'partial', label: 'Partial' },
              { id: 'paid', label: 'Paid' },
              { id: 'overdue', label: 'Overdue' },
            ].map(t => (
              <button key={t.id} className={filter === t.id ? 'on' : ''} onClick={() => setFilter(t.id)}>
                {t.label}{t.count ? <span style={{ marginLeft: 6, opacity: .5 }}>{t.count}</span> : null}
              </button>
            ))}
          </div>
          <div className="row" style={{ gap: 8, marginLeft: 'auto' }}>
            <div className="row" style={{ gap: 6, background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '5px 10px', width: 240 }}>
              <Ico name="search" size={13}/>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search invoice or customer" style={{ border: 0, background: 'transparent', outline: 0, fontSize: 13, width: '100%' }}/>
            </div>
            <button className="btn"><Ico name="filter" size={13}/> Filters</button>
            <button className="btn"><Ico name="calendar" size={13}/> Date</button>
          </div>
        </div>

        {selected.size > 0 && (
          <div style={{ padding: '10px 16px', background: 'var(--accent-soft)', borderBottom: '1px solid var(--line)', display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontWeight: 500, fontSize: 13 }}>{selected.size} selected</span>
            <button className="btn sm" onClick={() => toast(`Sent ${selected.size} invoice(s)`, { ico: 'send' })}><Ico name="send" size={12}/> Send</button>
            <button className="btn sm"><Ico name="download" size={12}/> Download</button>
            <button className="btn sm"><Ico name="print" size={12}/> Print</button>
            <button className="btn sm danger" onClick={() => setSelected(new Set())}><Ico name="x" size={12}/> Clear</button>
          </div>
        )}

        <table className="tbl">
          <thead>
            <tr>
              <th style={{ width: 32 }}><input type="checkbox" onChange={e => setSelected(e.target.checked ? new Set(filtered.map(i => i.id)) : new Set())}/></th>
              <th>Invoice #</th>
              <th>Customer</th>
              <th>Issued</th>
              <th>Due</th>
              <th>Items</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
              <th style={{ width: 32 }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(inv => {
              const cust = SEED_CUSTOMERS.find(c => c.id === inv.customerId);
              return (
                <tr key={inv.id} className="clickable" onClick={() => openInvoice?.(inv)}>
                  <td onClick={e => e.stopPropagation()}>
                    <input type="checkbox" checked={selected.has(inv.id)} onChange={() => toggle(inv.id)}/>
                  </td>
                  <td className="mono" style={{ fontSize: 12.5, fontWeight: 500 }}>{inv.id}</td>
                  <td>
                    <div className="row" style={{ gap: 10 }}>
                      <Avatar name={inv.customer} color={cust?.color} size={24}/>
                      <span>{inv.customer}</span>
                    </div>
                  </td>
                  <td className="muted" style={{ fontSize: 12.5 }}>{fmtDateShort(inv.date)}</td>
                  <td className="muted" style={{ fontSize: 12.5 }}>{fmtDateShort(inv.due)}</td>
                  <td className="muted" style={{ fontSize: 12.5 }}>{inv.items}</td>
                  <td><Pill status={inv.status}/></td>
                  <td className="num">{fmtINR(inv.amount)}</td>
                  <td onClick={e => e.stopPropagation()}><button className="btn ghost sm" style={{ padding: 4 }}><Ico name="more" size={14}/></button></td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="row between" style={{ padding: '12px 16px', borderTop: '1px solid var(--line)', fontSize: 12.5 }}>
          <span className="muted">Showing 1–{filtered.length} of {SEED_INVOICES.length}</span>
          <div className="row" style={{ gap: 6 }}>
            <button className="btn sm" disabled style={{ opacity: .5 }}>Prev</button>
            <button className="btn sm">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

window.InvoicesList = InvoicesList;
