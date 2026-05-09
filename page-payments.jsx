// Payments page — record payment + history

function PaymentsPage() {
  const [tab, setTab] = React.useState('record');
  const [mode, setMode] = React.useState('UPI');
  const [linkedInv, setLinkedInv] = React.useState(SEED_INVOICES.find(i => i.status === 'overdue' || i.status === 'sent'));
  const [amount, setAmount] = React.useState(linkedInv?.amount || 0);
  const [matched, setMatched] = React.useState(true);
  const toast = useToast();

  React.useEffect(() => {
    setAmount(linkedInv?.amount || 0);
    setMatched(true);
  }, [linkedInv]);

  const totals = SEED_PAYMENTS.reduce((s, p) => s + p.amount, 0);

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Payments</h1>
          <div className="sub">Record incoming payments and reconcile them with invoices</div>
        </div>
        <div className="row">
          <button className="btn"><Ico name="download" size={13}/> Bank statement</button>
        </div>
      </div>

      <div className="tabs" style={{ marginBottom: 22 }}>
        <button className={tab === 'record' ? 'on' : ''} onClick={() => setTab('record')}>Record payment</button>
        <button className={tab === 'history' ? 'on' : ''} onClick={() => setTab('history')}>Payment history</button>
        <button className={tab === 'unmatched' ? 'on' : ''} onClick={() => setTab('unmatched')}>Unmatched <span style={{ marginLeft: 6, padding: '0 6px', borderRadius: 99, background: 'var(--bad-soft)', color: 'var(--bad)', fontSize: 10.5, fontWeight: 600 }}>2</span></button>
      </div>

      {tab === 'record' && (
        <div className="grid" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
          <div className="card">
            <div className="card-head"><h3>New payment</h3><span className="sub">Step 1 of 1</span></div>
            <div className="card-body">
              <div className="field" style={{ marginBottom: 16 }}>
                <label>Customer</label>
                <select className="select" defaultValue={linkedInv?.customerId}>
                  {SEED_CUSTOMERS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div className="field" style={{ marginBottom: 16 }}>
                <label>Apply to invoice</label>
                <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                  {SEED_INVOICES.filter(i => ['sent', 'partial', 'overdue'].includes(i.status)).slice(0, 4).map(i => (
                    <button key={i.id} type="button" onClick={() => setLinkedInv(i)} style={{
                      display: 'flex', width: '100%', padding: '10px 12px', border: 0,
                      background: linkedInv?.id === i.id ? 'var(--accent-soft)' : 'transparent',
                      borderBottom: '1px solid var(--line-2)', gap: 12, alignItems: 'center', cursor: 'pointer', textAlign: 'left'
                    }}>
                      <div style={{ width: 14, height: 14, borderRadius: '50%', border: '1.5px solid', borderColor: linkedInv?.id === i.id ? 'var(--accent)' : 'var(--line)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                        {linkedInv?.id === i.id && <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)' }}/>}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="row" style={{ gap: 8 }}>
                          <span className="mono" style={{ fontSize: 12, fontWeight: 500 }}>{i.id}</span>
                          <Pill status={i.status}/>
                        </div>
                        <div className="muted" style={{ fontSize: 11.5, marginTop: 1 }}>{i.customer} · due {fmtDateShort(i.due)}</div>
                      </div>
                      <span className="mono" style={{ fontSize: 13, fontWeight: 500 }}>{fmtINR(i.amount)}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: 16 }}>
                <div className="field"><label>Amount received</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 11, top: 9, color: 'var(--muted)' }}>₹</span>
                    <input className="input num" style={{ paddingLeft: 22 }} type="number" value={amount} onChange={e => { setAmount(+e.target.value); setMatched(+e.target.value === linkedInv?.amount); }}/>
                  </div>
                </div>
                <div className="field"><label>Payment date</label><input className="input" type="date" defaultValue="2026-05-05"/></div>
              </div>

              <div className="field" style={{ marginBottom: 16 }}>
                <label>Payment mode</label>
                <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
                  {[
                    { id: 'UPI', ico: 'upi' },
                    { id: 'Bank transfer', ico: 'credit' },
                    { id: 'Cash', ico: 'payment' },
                    { id: 'Card', ico: 'credit' },
                    { id: 'Cheque', ico: 'invoice' },
                  ].map(m => (
                    <button key={m.id} type="button" onClick={() => setMode(m.id)} className={`btn ${mode === m.id ? 'primary' : ''}`} style={{ flex: 1 }}>
                      <Ico name={m.ico} size={13}/> {m.id}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field" style={{ marginBottom: 16 }}>
                <label>{mode === 'UPI' ? 'UPI transaction ID' : mode === 'Cheque' ? 'Cheque number' : 'Reference / UTR'}</label>
                <input className="input mono" placeholder={mode === 'UPI' ? '912345678901' : mode === 'Cheque' ? '000123' : 'NEFT/UTR/RRN'}/>
              </div>

              <div className="field" style={{ marginBottom: 16 }}>
                <label>Notes (optional)</label>
                <textarea className="textarea" rows="2" placeholder="e.g. partial payment, balance due in 30 days"/>
              </div>

              <div className="row" style={{ gap: 8 }}>
                <button className="btn primary lg" style={{ flex: 1 }} onClick={() => toast('Payment recorded · ' + fmtINR(amount), { ico: 'check' })}>
                  <Ico name="check" size={14}/> Record payment
                </button>
                <button className="btn lg">Send receipt</button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-head"><h3>Reconciliation</h3></div>
            <div className="card-body">
              <div style={{ padding: 14, background: matched ? 'var(--good-soft)' : 'var(--warn-soft)', borderRadius: 'var(--radius)', marginBottom: 14 }}>
                <div className="row" style={{ gap: 8, marginBottom: 4 }}>
                  <Ico name={matched ? 'check' : 'history'} size={14}/>
                  <span style={{ fontWeight: 600, fontSize: 13, color: matched ? 'var(--good)' : 'var(--warn)' }}>
                    {matched ? 'Amount matches invoice exactly' : 'Partial payment detected'}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.5 }}>
                  {matched
                    ? `Recording ${fmtINR(amount)} will mark ${linkedInv?.id} as fully paid.`
                    : `Recording ${fmtINR(amount)} leaves a balance of ${fmtINR((linkedInv?.amount || 0) - amount)} on ${linkedInv?.id}.`
                  }
                </div>
              </div>

              <h4 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--muted)', margin: '14px 0 10px' }}>Suggested matches</h4>
              {[
                { hint: 'UPI payment of ₹42,300 received in HDFC at 11:24', conf: 98 },
                { hint: 'NEFT from LAKSH****8821 for ₹1,84,500', conf: 91 },
              ].map((m, i) => (
                <div key={i} style={{ padding: 10, border: '1px solid var(--line-2)', borderRadius: 'var(--radius)', marginBottom: 8 }}>
                  <div className="row between">
                    <span style={{ fontSize: 12 }}>{m.hint}</span>
                    <span className="pill paid" style={{ fontSize: 10 }}>{m.conf}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'history' && (
        <div className="card">
          <div className="card-head" style={{ padding: '12px 16px' }}>
            <h3>{SEED_PAYMENTS.length} payments · {fmtINR(totals)} received</h3>
            <div className="row" style={{ gap: 8 }}>
              <button className="btn"><Ico name="filter" size={13}/> Filter</button>
              <button className="btn"><Ico name="download" size={13}/> Export</button>
            </div>
          </div>
          <table className="tbl">
            <thead>
              <tr>
                <th>Payment #</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Invoice</th>
                <th>Mode</th>
                <th>Reference</th>
                <th style={{ textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {SEED_PAYMENTS.map(p => (
                <tr key={p.id} className="clickable">
                  <td className="mono" style={{ fontSize: 12.5 }}>{p.id}</td>
                  <td className="muted" style={{ fontSize: 12.5 }}>{fmtDateShort(p.date)}</td>
                  <td>{p.customer}</td>
                  <td className="mono" style={{ fontSize: 12 }}>{p.invoice}</td>
                  <td><span className="pill sent" style={{ fontSize: 10.5 }}>{p.mode}</span></td>
                  <td className="mono muted" style={{ fontSize: 11.5 }}>{p.ref}</td>
                  <td className="num" style={{ color: 'var(--good)', fontWeight: 500 }}>+{fmtINR(p.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'unmatched' && (
        <div className="card">
          <div className="card-head"><h3>Unmatched bank entries</h3><span className="sub">Imported from HDFC · last sync 2h ago</span></div>
          <table className="tbl">
            <thead><tr><th>Date</th><th>Description</th><th>Reference</th><th style={{ textAlign: 'right' }}>Amount</th><th></th></tr></thead>
            <tbody>
              {[
                { date: '2026-05-04', desc: 'UPI/CR/PATEL HARDWARE/304488', ref: '304488112', amt: 42300 },
                { date: '2026-05-03', desc: 'NEFT/CR/SURYA ELECTRONICS', ref: 'N04488', amt: 107800 },
              ].map((u, i) => (
                <tr key={i}>
                  <td className="muted" style={{ fontSize: 12.5 }}>{fmtDateShort(u.date)}</td>
                  <td className="mono" style={{ fontSize: 12 }}>{u.desc}</td>
                  <td className="mono muted" style={{ fontSize: 11.5 }}>{u.ref}</td>
                  <td className="num" style={{ color: 'var(--good)' }}>+{fmtINR(u.amt)}</td>
                  <td><button className="btn sm accent">Match</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

window.PaymentsPage = PaymentsPage;
