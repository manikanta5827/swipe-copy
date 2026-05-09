// Quotations / Sales page

function QuotationsPage({ setPage }) {
  const [filter, setFilter] = React.useState('all');
  const filtered = SEED_QUOTATIONS.filter(q => filter === 'all' || q.status === filter);
  const totals = SEED_QUOTATIONS.reduce((acc, q) => {
    acc[q.status] = (acc[q.status] || 0) + 1;
    acc.total += q.amount;
    return acc;
  }, { total: 0 });
  const toast = useToast();

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Quotations</h1>
          <div className="sub">Send estimates and convert accepted ones to invoices</div>
        </div>
        <div className="row">
          <button className="btn">Templates</button>
          <button className="btn accent" onClick={() => toast('New quotation started', { ico: 'plus' })}>
            <Ico name="plus" size={14}/> New quotation
          </button>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}>
        <div className="stat">
          <div className="label">Pipeline value</div>
          <div className="val"><span className="cur">₹</span>5.67L</div>
          <div className="delta up"><Ico name="arrow-up" size={11}/> +24% this month</div>
        </div>
        <div className="stat">
          <div className="label">Sent</div>
          <div className="val">{totals.sent || 0}</div>
          <div className="muted" style={{ fontSize: 11.5 }}>Awaiting response</div>
        </div>
        <div className="stat">
          <div className="label">Accepted</div>
          <div className="val">{totals.accepted || 0}</div>
          <div className="delta up"><Ico name="check" size={11}/> 67% conversion</div>
        </div>
        <div className="stat">
          <div className="label">Avg response time</div>
          <div className="val">2.4d</div>
          <div className="muted" style={{ fontSize: 11.5 }}>−0.8d vs last month</div>
        </div>
      </div>

      <div className="card">
        <div className="card-head" style={{ padding: '12px 16px' }}>
          <div className="seg">
            {[
              { id: 'all', label: 'All' },
              { id: 'draft', label: 'Draft' },
              { id: 'sent', label: 'Sent' },
              { id: 'accepted', label: 'Accepted' },
              { id: 'rejected', label: 'Rejected' },
            ].map(t => (
              <button key={t.id} className={filter === t.id ? 'on' : ''} onClick={() => setFilter(t.id)}>{t.label}</button>
            ))}
          </div>
          <div className="row" style={{ gap: 8 }}>
            <button className="btn"><Ico name="filter" size={13}/> Filters</button>
            <button className="btn"><Ico name="download" size={13}/> Export</button>
          </div>
        </div>
        <table className="tbl">
          <thead>
            <tr>
              <th>Quotation #</th>
              <th>Customer</th>
              <th>Issued</th>
              <th>Expires</th>
              <th>Items</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(q => (
              <tr key={q.id} className="clickable">
                <td className="mono" style={{ fontSize: 12.5 }}>{q.id}</td>
                <td>{q.customer}</td>
                <td className="muted" style={{ fontSize: 12.5 }}>{fmtDateShort(q.date)}</td>
                <td className="muted" style={{ fontSize: 12.5 }}>{fmtDateShort(q.expires)}</td>
                <td className="muted" style={{ fontSize: 12.5 }}>{q.items}</td>
                <td>
                  <span className={`pill ${q.status === 'accepted' ? 'paid' : q.status === 'rejected' ? 'overdue' : q.status === 'sent' ? 'sent' : 'draft'}`}>{q.status}</span>
                </td>
                <td className="num">{fmtINR(q.amount)}</td>
                <td>
                  {q.status === 'accepted' ? (
                    <button className="btn sm accent" onClick={() => { toast('Converted to invoice', { ico: 'check' }); setPage('invoices'); }}>
                      Convert <Ico name="arrow-right" size={11}/>
                    </button>
                  ) : <button className="btn ghost sm" style={{ padding: 4 }}><Ico name="more" size={14}/></button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card" style={{ marginTop: 20 }}>
        <div className="card-head"><h3>Pipeline by stage</h3><span className="sub">Drag to update</span></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--line-2)' }}>
          {['Draft', 'Sent', 'Accepted', 'Rejected'].map((stage, idx) => (
            <div key={stage} style={{ background: 'var(--surface)', padding: 14, minHeight: 200 }}>
              <div className="row between" style={{ marginBottom: 10 }}>
                <span style={{ fontSize: 12.5, fontWeight: 600 }}>{stage}</span>
                <span className="mono muted" style={{ fontSize: 11 }}>{SEED_QUOTATIONS.filter(q => q.status === stage.toLowerCase()).length}</span>
              </div>
              {SEED_QUOTATIONS.filter(q => q.status === stage.toLowerCase()).map(q => (
                <div key={q.id} style={{ background: 'var(--surface-2)', border: '1px solid var(--line-2)', borderRadius: 'var(--radius-sm)', padding: 10, marginBottom: 8, cursor: 'grab' }}>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{q.id}</div>
                  <div style={{ fontSize: 12.5, fontWeight: 500, margin: '2px 0 4px' }}>{q.customer}</div>
                  <div className="row between">
                    <span className="mono" style={{ fontSize: 12 }}>{fmtINR(q.amount)}</span>
                    <span className="muted" style={{ fontSize: 11 }}>exp {fmtDateShort(q.expires)}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.QuotationsPage = QuotationsPage;
