// Invoice creation page — left form, right live preview

function InvoiceCreate({ template, setPage }) {
  const [customer, setCustomer] = React.useState(SEED_CUSTOMERS[0]);
  const [showCustPicker, setShowCustPicker] = React.useState(false);
  const [items, setItems] = React.useState([
    { id: 1, productId: "p1", desc: "Cotton Bedsheet — Queen", hsn: "6302", qty: 12, rate: 1450, tax: 5 },
    { id: 2, productId: "p4", desc: "LED Panel Light 24W", hsn: "9405", qty: 8, rate: 680, tax: 18 },
  ]);
  const [discount, setDiscount] = React.useState(0);
  const [shipping, setShipping] = React.useState(0);
  const [notes, setNotes] = React.useState("Payment due within 15 days. Thank you for your business.");
  const [invDate, setInvDate] = React.useState("2026-05-05");
  const [dueDate, setDueDate] = React.useState("2026-05-20");
  const toast = useToast();

  const updateItem = (id, key, val) => {
    setItems(items.map(it => it.id === id ? { ...it, [key]: val } : it));
  };
  const removeItem = (id) => setItems(items.filter(it => it.id !== id));
  const addItem = () => setItems([...items, { id: Date.now(), desc: "", hsn: "", qty: 1, rate: 0, tax: 18 }]);
  const addProduct = (p) => {
    setItems([...items, { id: Date.now(), productId: p.id, desc: p.name, hsn: p.hsn, qty: 1, rate: p.price, tax: p.tax }]);
  };

  const subtotal = items.reduce((s, i) => s + (i.qty * i.rate), 0);
  const taxAmt = items.reduce((s, i) => s + (i.qty * i.rate * i.tax / 100), 0);
  const total = subtotal + taxAmt - discount + shipping;

  return (
    <div className="page" style={{ padding: 0, display: 'grid', gridTemplateColumns: '1.2fr 1fr', height: '100%', overflow: 'hidden' }}>

      <div style={{ overflow: 'auto', padding: '24px 28px 60px', borderRight: '1px solid var(--line)' }}>
        <div className="page-head">
          <div>
            <h1>New invoice</h1>
            <div className="sub mono">INV-2026-0149 · auto-numbered</div>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <button className="btn" onClick={() => toast('Saved as draft', { ico: 'check' })}>Save draft</button>
            <button className="btn primary" onClick={() => { toast('Invoice sent to ' + customer.name, { ico: 'send' }); setPage('invoices'); }}>
              <Ico name="send" size={13}/> Save & send
            </button>
          </div>
        </div>

        {/* Customer */}
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-head">
            <h3>Bill to</h3>
            <button className="btn ghost sm" onClick={() => setShowCustPicker(s => !s)}>Change</button>
          </div>
          <div className="card-body">
            {showCustPicker ? (
              <div>
                <input className="input" placeholder="Search customer…" autoFocus style={{ marginBottom: 10 }}/>
                <div style={{ maxHeight: 240, overflow: 'auto', border: '1px solid var(--line-2)', borderRadius: 'var(--radius)' }}>
                  {SEED_CUSTOMERS.map(c => (
                    <button key={c.id} className="row" onClick={() => { setCustomer(c); setShowCustPicker(false); }}
                      style={{ width: '100%', padding: 10, gap: 12, border: 0, background: 'transparent', borderBottom: '1px solid var(--line-2)', cursor: 'pointer', textAlign: 'left' }}>
                      <Avatar name={c.name} color={c.color} size={32}/>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</div>
                        <div className="muted" style={{ fontSize: 11.5 }}>{c.gstin} · {c.city}</div>
                      </div>
                      {c.outstanding > 0 && <span className="pill due">{fmtINRshort(c.outstanding)} due</span>}
                    </button>
                  ))}
                </div>
                <button className="btn ghost sm" style={{ marginTop: 8 }}><Ico name="plus" size={12}/> New customer</button>
              </div>
            ) : (
              <div className="row" style={{ gap: 16, alignItems: 'flex-start' }}>
                <Avatar name={customer.name} color={customer.color} size={44}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{customer.name}</div>
                  <div className="muted" style={{ fontSize: 12.5, marginTop: 2 }}>{customer.contact} · {customer.email}</div>
                  <div className="muted mono" style={{ fontSize: 11.5, marginTop: 6 }}>GSTIN: {customer.gstin} · {customer.city}</div>
                </div>
                {customer.outstanding > 0 && (
                  <div style={{ textAlign: 'right' }}>
                    <div className="muted" style={{ fontSize: 11.5 }}>Outstanding</div>
                    <div className="mono" style={{ color: 'var(--warn)', fontWeight: 600 }}>{fmtINR(customer.outstanding)}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Dates */}
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', marginBottom: 20 }}>
          <div className="field"><label>Invoice date</label><input type="date" className="input" value={invDate} onChange={e => setInvDate(e.target.value)}/></div>
          <div className="field"><label>Due date</label><input type="date" className="input" value={dueDate} onChange={e => setDueDate(e.target.value)}/></div>
          <div className="field"><label>Place of supply</label><select className="select" defaultValue="MH"><option value="MH">27 — Maharashtra</option><option value="GJ">24 — Gujarat</option><option value="KA">29 — Karnataka</option></select></div>
        </div>

        {/* Items */}
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-head">
            <h3>Line items</h3>
            <button className="btn ghost sm" onClick={addItem}><Ico name="plus" size={12}/> Add row</button>
          </div>
          <table className="tbl" style={{ fontSize: 12.5 }}>
            <thead>
              <tr>
                <th style={{ width: 24 }}></th>
                <th>Item / description</th>
                <th>HSN</th>
                <th style={{ width: 60 }}>Qty</th>
                <th style={{ width: 88, textAlign: 'right' }}>Rate</th>
                <th style={{ width: 64 }}>Tax %</th>
                <th style={{ width: 96, textAlign: 'right' }}>Amount</th>
                <th style={{ width: 28 }}></th>
              </tr>
            </thead>
            <tbody>
              {items.map(it => (
                <tr key={it.id}>
                  <td><Ico name="drag" size={14} stroke={1.4}/></td>
                  <td><input className="input" style={{ padding: '4px 8px', border: 0, background: 'transparent' }} value={it.desc} onChange={e => updateItem(it.id, 'desc', e.target.value)} placeholder="Item description"/></td>
                  <td><input className="input mono" style={{ padding: '4px 8px', border: 0, background: 'transparent', fontSize: 12 }} value={it.hsn} onChange={e => updateItem(it.id, 'hsn', e.target.value)}/></td>
                  <td><input className="input num" style={{ padding: '4px 8px', border: 0, background: 'transparent' }} type="number" value={it.qty} onChange={e => updateItem(it.id, 'qty', +e.target.value)}/></td>
                  <td><input className="input num" style={{ padding: '4px 8px', border: 0, background: 'transparent' }} type="number" value={it.rate} onChange={e => updateItem(it.id, 'rate', +e.target.value)}/></td>
                  <td><input className="input num" style={{ padding: '4px 8px', border: 0, background: 'transparent' }} type="number" value={it.tax} onChange={e => updateItem(it.id, 'tax', +e.target.value)}/></td>
                  <td className="num" style={{ fontWeight: 500 }}>{fmtINR(it.qty * it.rate)}</td>
                  <td><button className="btn ghost sm" style={{ padding: 3 }} onClick={() => removeItem(it.id)}><Ico name="x" size={12}/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: '10px 16px', borderTop: '1px solid var(--line-2)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span className="muted" style={{ fontSize: 12, alignSelf: 'center' }}>Quick add:</span>
            {SEED_PRODUCTS.slice(0, 4).map(p => (
              <button key={p.id} className="btn sm" onClick={() => addProduct(p)}><Ico name="plus" size={11}/> {p.name.split('—')[0].trim()}</button>
            ))}
          </div>
        </div>

        {/* Totals + extras */}
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div className="card">
            <div className="card-head"><h3>Notes & terms</h3></div>
            <div className="card-body">
              <textarea className="textarea" rows="4" value={notes} onChange={e => setNotes(e.target.value)}/>
              <div className="row" style={{ marginTop: 10, gap: 8 }}>
                <button className="btn sm">+ Bank details</button>
                <button className="btn sm">+ Signature</button>
                <button className="btn sm">+ Attachment</button>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-head"><h3>Summary</h3></div>
            <div className="card-body">
              <div className="row between" style={{ padding: '4px 0' }}>
                <span className="muted">Subtotal</span>
                <span className="mono">{fmtINR(subtotal)}</span>
              </div>
              <div className="row between" style={{ padding: '4px 0' }}>
                <span className="muted">CGST + SGST</span>
                <span className="mono">{fmtINR(taxAmt)}</span>
              </div>
              <div className="row between" style={{ padding: '4px 0' }}>
                <span className="muted">Discount</span>
                <input className="input num" style={{ width: 110, padding: '3px 8px' }} type="number" value={discount} onChange={e => setDiscount(+e.target.value)}/>
              </div>
              <div className="row between" style={{ padding: '4px 0' }}>
                <span className="muted">Shipping</span>
                <input className="input num" style={{ width: 110, padding: '3px 8px' }} type="number" value={shipping} onChange={e => setShipping(+e.target.value)}/>
              </div>
              <div className="row between" style={{ padding: '12px 0 4px', borderTop: '1px solid var(--line)', marginTop: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 15 }}>Total due</span>
                <span className="serif" style={{ fontSize: 26, letterSpacing: '-0.02em' }}>{fmtINR(total)}</span>
              </div>
              <div className="muted" style={{ fontSize: 11.5, marginTop: 6 }}>{indianWords(total)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Live preview */}
      <div style={{ overflow: 'auto', padding: '24px 28px', background: 'var(--surface-2)' }}>
        <div className="row between" style={{ marginBottom: 14 }}>
          <span className="muted" style={{ fontSize: 12 }}>Live preview · {template?.name || 'Modern Mono'}</span>
          <button className="btn sm" onClick={() => setPage('templates')}>Change template</button>
        </div>
        <InvoicePreview template={template} customer={customer} items={items} subtotal={subtotal} taxAmt={taxAmt} discount={discount} shipping={shipping} total={total} invDate={invDate} dueDate={dueDate} notes={notes}/>
      </div>
    </div>
  );
}

function indianWords(n) {
  if (!n) return "Rupees zero only";
  const rounded = Math.round(n);
  const lakh = Math.floor(rounded / 100000);
  const thousand = Math.floor((rounded % 100000) / 1000);
  const hundred = rounded % 1000;
  let parts = [];
  if (lakh) parts.push(`${lakh} lakh`);
  if (thousand) parts.push(`${thousand} thousand`);
  if (hundred) parts.push(`${hundred}`);
  return `Rupees ${parts.join(' ')} only`;
}

function InvoicePreview({ template, customer, items, subtotal, taxAmt, discount, shipping, total, invDate, dueDate, notes }) {
  const tmpl = template || { name: "Modern Mono", accent: "#2548f5", layout: "modern" };
  const accent = tmpl.accent;
  const isClassic = tmpl.layout === 'classic';
  const isBoutique = tmpl.layout === 'boutique';
  const isCompact = tmpl.layout === 'compact';

  return (
    <div className="inv-doc" style={{ maxWidth: 580 }}>
      {isBoutique && <div style={{ height: 8, background: accent, margin: '-32px -36px 24px', borderRadius: '6px 6px 0 0' }}/>}
      <div className="row between" style={{ alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontStyle: isClassic ? 'normal' : 'italic', fontSize: 22, fontWeight: 400 }}>Mehta Trading Co.</div>
          <div style={{ fontSize: 11, color: '#6a7180', marginTop: 4, lineHeight: 1.5 }}>
            14 Marine Drive, Mumbai 400020<br/>
            GSTIN: 27AAACM1234K1Z5 · vikram@mehta.in
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <h2 style={{ color: isBoutique ? accent : '#0e1116', fontFamily: isClassic ? 'serif' : 'var(--font-display)' }}>
            {isClassic ? 'TAX INVOICE' : 'Invoice'}
          </h2>
          <div className="mono" style={{ fontSize: 11.5, marginTop: 4 }}>INV-2026-0149</div>
        </div>
      </div>

      <div className="row between" style={{ borderTop: isClassic ? '2px double #0e1116' : '1px solid #efece4', borderBottom: isClassic ? '2px double #0e1116' : '1px solid #efece4', padding: '12px 0', marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '.08em', color: '#9aa0ac', marginBottom: 4 }}>Bill to</div>
          <div style={{ fontWeight: 600 }}>{customer.name}</div>
          <div style={{ fontSize: 11, color: '#6a7180', marginTop: 2 }}>{customer.city} · {customer.gstin}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '2px 14px', fontSize: 11 }}>
            <span style={{ color: '#9aa0ac' }}>Issued</span><span className="mono">{fmtDateShort(invDate)}, 2026</span>
            <span style={{ color: '#9aa0ac' }}>Due</span><span className="mono">{fmtDateShort(dueDate)}, 2026</span>
          </div>
        </div>
      </div>

      <table className="doc-tbl">
        <thead>
          <tr>
            <th style={{ width: '50%' }}>Item</th>
            <th>HSN</th>
            <th style={{ textAlign: 'right' }}>Qty</th>
            <th style={{ textAlign: 'right' }}>Rate</th>
            <th style={{ textAlign: 'right' }}>Tax</th>
            <th style={{ textAlign: 'right' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, i) => (
            <tr key={i}>
              <td>{it.desc || '—'}</td>
              <td className="mono" style={{ fontSize: 10 }}>{it.hsn}</td>
              <td className="num">{it.qty}</td>
              <td className="num">{fmtINR(it.rate)}</td>
              <td className="num">{it.tax}%</td>
              <td className="num" style={{ fontWeight: 500 }}>{fmtINR(it.qty * it.rate)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="row" style={{ justifyContent: 'flex-end', marginTop: 16 }}>
        <div style={{ minWidth: 240 }}>
          <div className="row between" style={{ padding: '3px 0', fontSize: 11.5 }}>
            <span style={{ color: '#6a7180' }}>Subtotal</span>
            <span className="mono">{fmtINR(subtotal)}</span>
          </div>
          <div className="row between" style={{ padding: '3px 0', fontSize: 11.5 }}>
            <span style={{ color: '#6a7180' }}>GST</span>
            <span className="mono">{fmtINR(taxAmt)}</span>
          </div>
          {discount > 0 && <div className="row between" style={{ padding: '3px 0', fontSize: 11.5 }}><span style={{ color: '#6a7180' }}>Discount</span><span className="mono">−{fmtINR(discount)}</span></div>}
          {shipping > 0 && <div className="row between" style={{ padding: '3px 0', fontSize: 11.5 }}><span style={{ color: '#6a7180' }}>Shipping</span><span className="mono">{fmtINR(shipping)}</span></div>}
          <div className="row between" style={{ borderTop: isClassic ? '2px double #0e1116' : '1px solid #0e1116', padding: '8px 0 2px', marginTop: 6 }}>
            <span style={{ fontWeight: 600, fontSize: 13 }}>Total due</span>
            <span className="mono" style={{ fontWeight: 600, fontSize: 14, color: accent }}>{fmtINR(total)}</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 22, paddingTop: 14, borderTop: '1px solid #efece4', fontSize: 10.5, color: '#6a7180', lineHeight: 1.6 }}>
        <div style={{ fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '.08em', color: '#9aa0ac', marginBottom: 4 }}>Notes</div>
        {notes}
      </div>
    </div>
  );
}

window.InvoiceCreate = InvoiceCreate;
window.InvoicePreview = InvoicePreview;
