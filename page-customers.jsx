// Customers page — list + detail drawer

function CustomersPage() {
  const [selected, setSelected] = React.useState(null);
  const [showAdd, setShowAdd] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const toast = useToast();

  const filtered = SEED_CUSTOMERS.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Customers</h1>
          <div className="sub">{SEED_CUSTOMERS.length} customers · {fmtINR(SEED_CUSTOMERS.reduce((s, c) => s + c.outstanding, 0))} outstanding</div>
        </div>
        <div className="row">
          <button className="btn"><Ico name="download" size={13}/> Import CSV</button>
          <button className="btn accent" onClick={() => setShowAdd(true)}><Ico name="plus" size={14}/> Add customer</button>
        </div>
      </div>

      <div className="card">
        <div className="card-head" style={{ padding: '12px 16px' }}>
          <div className="row" style={{ gap: 6, background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '5px 10px', width: 280 }}>
            <Ico name="search" size={13}/>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, GSTIN, city" style={{ border: 0, background: 'transparent', outline: 0, fontSize: 13, width: '100%' }}/>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <button className="btn"><Ico name="filter" size={13}/> Has dues</button>
            <button className="btn"><Ico name="tag" size={13}/> Tags</button>
          </div>
        </div>
        <table className="tbl">
          <thead>
            <tr>
              <th>Customer</th>
              <th>GSTIN</th>
              <th>City</th>
              <th>Phone</th>
              <th style={{ textAlign: 'right' }}>Outstanding</th>
              <th style={{ textAlign: 'right' }}>Total billed</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="clickable" onClick={() => setSelected(c)}>
                <td>
                  <div className="row" style={{ gap: 10 }}>
                    <Avatar name={c.name} color={c.color} size={28}/>
                    <div>
                      <div style={{ fontWeight: 500 }}>{c.name}</div>
                      <div className="muted" style={{ fontSize: 11.5 }}>{c.contact}</div>
                    </div>
                  </div>
                </td>
                <td className="mono" style={{ fontSize: 11.5 }}>{c.gstin}</td>
                <td className="muted" style={{ fontSize: 12.5 }}>{c.city}</td>
                <td className="mono muted" style={{ fontSize: 12 }}>{c.phone}</td>
                <td className="num" style={{ color: c.outstanding > 0 ? 'var(--warn)' : 'var(--muted)' }}>{c.outstanding > 0 ? fmtINR(c.outstanding) : '—'}</td>
                <td className="num">{fmtINR(c.total)}</td>
                <td><button className="btn ghost sm" style={{ padding: 4 }} onClick={e => e.stopPropagation()}><Ico name="more" size={14}/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && <CustomerDrawer customer={selected} onClose={() => setSelected(null)}/>}
      {showAdd && <AddCustomerDrawer onClose={() => setShowAdd(false)} onSave={() => { setShowAdd(false); toast('Customer added', { ico: 'check' }); }}/>}
    </div>
  );
}

function CustomerDrawer({ customer, onClose }) {
  const invs = SEED_INVOICES.filter(i => i.customerId === customer.id);
  return (
    <>
      <div className="drawer-bg" onClick={onClose}/>
      <div className="drawer" style={{ width: 540 }}>
        <div className="row between" style={{ padding: 16, borderBottom: '1px solid var(--line)' }}>
          <div className="row" style={{ gap: 12 }}>
            <Avatar name={customer.name} color={customer.color} size={40}/>
            <div>
              <div style={{ fontWeight: 600, fontSize: 16 }}>{customer.name}</div>
              <div className="muted" style={{ fontSize: 12 }}>{customer.contact}</div>
            </div>
          </div>
          <button className="btn ghost" onClick={onClose}><Ico name="x" size={14}/></button>
        </div>

        <div style={{ padding: 16, flex: 1, overflow: 'auto' }}>
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
            <div style={{ padding: 12, background: 'var(--surface-2)', borderRadius: 'var(--radius)' }}>
              <div className="muted" style={{ fontSize: 11 }}>Outstanding</div>
              <div className="serif" style={{ fontSize: 22 }}>{fmtINR(customer.outstanding)}</div>
            </div>
            <div style={{ padding: 12, background: 'var(--surface-2)', borderRadius: 'var(--radius)' }}>
              <div className="muted" style={{ fontSize: 11 }}>Total billed</div>
              <div className="serif" style={{ fontSize: 22 }}>{fmtINR(customer.total)}</div>
            </div>
          </div>

          <h4 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted)', margin: '14px 0 8px' }}>Contact</h4>
          <dl className="kv">
            <dt>Email</dt><dd>{customer.email}</dd>
            <dt>Phone</dt><dd className="mono">{customer.phone}</dd>
            <dt>GSTIN</dt><dd className="mono">{customer.gstin}</dd>
            <dt>City</dt><dd>{customer.city}</dd>
            <dt>Tags</dt><dd><span className="pill sent">priority</span></dd>
          </dl>

          <h4 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted)', margin: '20px 0 8px' }}>Recent invoices</h4>
          <div style={{ border: '1px solid var(--line-2)', borderRadius: 'var(--radius)' }}>
            {invs.length === 0 ? (
              <div className="muted" style={{ padding: 16, textAlign: 'center', fontSize: 12.5 }}>No invoices yet</div>
            ) : invs.map((i, idx) => (
              <div key={i.id} className="row between" style={{ padding: '10px 12px', borderBottom: idx < invs.length - 1 ? '1px solid var(--line-2)' : 0 }}>
                <div>
                  <div className="mono" style={{ fontSize: 12, fontWeight: 500 }}>{i.id}</div>
                  <div className="muted" style={{ fontSize: 11.5 }}>{fmtDate(i.date)}</div>
                </div>
                <div className="row" style={{ gap: 10 }}>
                  <Pill status={i.status}/>
                  <span className="mono" style={{ fontWeight: 500, fontSize: 12.5 }}>{fmtINR(i.amount)}</span>
                </div>
              </div>
            ))}
          </div>

          <h4 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted)', margin: '20px 0 8px' }}>Activity</h4>
          {[
            { what: 'Invoice INV-0148 sent', when: '2 hr ago', ico: 'send' },
            { what: 'Reminder for INV-0145 sent', when: '3 days ago', ico: 'mail' },
            { what: 'Customer details updated', when: '1 week ago', ico: 'edit' },
          ].map((a, i) => (
            <div key={i} className="row" style={{ padding: '8px 0', gap: 10, fontSize: 12.5, borderBottom: '1px solid var(--line-2)' }}>
              <Ico name={a.ico} size={13}/>
              <span style={{ flex: 1 }}>{a.what}</span>
              <span className="muted" style={{ fontSize: 11.5 }}>{a.when}</span>
            </div>
          ))}
        </div>

        <div className="row" style={{ padding: 14, borderTop: '1px solid var(--line)', gap: 8 }}>
          <button className="btn" style={{ flex: 1 }}><Ico name="mail" size={13}/> Email</button>
          <button className="btn" style={{ flex: 1 }}><Ico name="phone" size={13}/> Call</button>
          <button className="btn primary" style={{ flex: 1 }}><Ico name="invoice" size={13}/> New invoice</button>
        </div>
      </div>
    </>
  );
}

function AddCustomerDrawer({ onClose, onSave }) {
  const [gstin, setGstin] = React.useState('');
  const [autoFilled, setAutoFilled] = React.useState(false);
  return (
    <>
      <div className="drawer-bg" onClick={onClose}/>
      <div className="drawer" style={{ width: 480 }}>
        <div className="row between" style={{ padding: 16, borderBottom: '1px solid var(--line)' }}>
          <h3 style={{ margin: 0 }}>New customer</h3>
          <button className="btn ghost" onClick={onClose}><Ico name="x" size={14}/></button>
        </div>
        <div style={{ padding: 16, flex: 1, overflow: 'auto' }}>
          <div className="field" style={{ marginBottom: 14 }}>
            <label>GSTIN <span className="muted">(optional · auto-fills details)</span></label>
            <div className="row" style={{ gap: 6 }}>
              <input className="input mono" value={gstin} onChange={e => setGstin(e.target.value)} placeholder="22AAAAA0000A1Z5"/>
              <button className="btn" onClick={() => { setGstin('27AAACL3389K1Z8'); setAutoFilled(true); }}>Verify</button>
            </div>
            {autoFilled && <div style={{ marginTop: 6, padding: '6px 10px', background: 'var(--good-soft)', color: 'var(--good)', borderRadius: 6, fontSize: 12 }}>✓ Verified · details auto-filled below</div>}
          </div>

          <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 12 }}>
            <div className="field"><label>Business name *</label><input className="input" defaultValue={autoFilled ? 'Lakshmi Enterprises Ltd.' : ''} placeholder="Acme Corp."/></div>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="field"><label>Contact person</label><input className="input" placeholder="Full name"/></div>
              <div className="field"><label>Phone</label><input className="input mono" placeholder="+91 …"/></div>
            </div>
            <div className="field"><label>Email</label><input className="input" placeholder="billing@example.com" type="email"/></div>
            <div className="field"><label>Billing address</label><textarea className="textarea" rows="3" defaultValue={autoFilled ? '14 Market Road, Surat 395002, Gujarat' : ''}/></div>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="field"><label>Currency</label><select className="select"><option>INR · ₹</option><option>USD · $</option><option>EUR · €</option></select></div>
              <div className="field"><label>Payment terms</label><select className="select"><option>Net 15</option><option>Net 30</option><option>Due on receipt</option></select></div>
            </div>
            <div className="field"><label>Notes (internal)</label><textarea className="textarea" rows="2" placeholder="Anything to remember about this customer"/></div>
          </div>
        </div>
        <div className="row" style={{ padding: 14, borderTop: '1px solid var(--line)', gap: 8, justifyContent: 'flex-end' }}>
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn primary" onClick={onSave}>Save customer</button>
        </div>
      </div>
    </>
  );
}

window.CustomersPage = CustomersPage;
