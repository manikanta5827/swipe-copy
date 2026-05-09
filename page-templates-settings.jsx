// Templates page + Settings page

function TemplatesPage({ template, setTemplate }) {
  const toast = useToast();
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Invoice templates</h1>
          <div className="sub">Choose how your invoices, quotations, and receipts look. Active template applies to all new documents.</div>
        </div>
        <button className="btn"><Ico name="plus" size={13}/> Custom template</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {SEED_TEMPLATES.map(t => (
          <div key={t.id} className={`tmpl-card ${template?.id === t.id ? 'selected' : ''}`} onClick={() => { setTemplate(t); toast(`Template "${t.name}" selected`, { ico: 'check' }); }}>
            <div className="preview">
              <TemplateThumbnail template={t}/>
            </div>
            <div className="row between" style={{ marginTop: 12 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13.5 }}>{t.name}</div>
                <div className="muted" style={{ fontSize: 11.5, marginTop: 1 }}>{t.style}</div>
              </div>
              {template?.id === t.id ? (
                <span className="pill paid"><Ico name="check" size={10}/> active</span>
              ) : (
                <button className="btn ghost sm">Preview</button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <div className="card-head"><h3>Branding</h3><span className="sub">Applied to all templates</span></div>
        <div className="card-body">
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div className="field">
              <label>Logo</label>
              <div style={{ height: 80, border: '1px dashed var(--line)', borderRadius: 'var(--radius)', display: 'grid', placeItems: 'center', color: 'var(--muted)', fontSize: 12 }}>
                <div style={{ textAlign: 'center' }}>
                  <Ico name="plus" size={16}/>
                  <div style={{ marginTop: 4 }}>Upload logo</div>
                </div>
              </div>
            </div>
            <div className="field">
              <label>Brand color</label>
              <div className="row" style={{ gap: 6, flexWrap: 'wrap' }}>
                {['#0e1116', '#2548f5', '#1f8a5b', '#d4571f', '#7c5cff', '#b8861b'].map(c => (
                  <button key={c} style={{ width: 32, height: 32, borderRadius: 6, background: c, border: c === '#0e1116' ? '2px solid #fff' : '1px solid var(--line)', boxShadow: c === '#0e1116' ? '0 0 0 2px var(--accent)' : 'none', cursor: 'pointer' }}/>
                ))}
              </div>
            </div>
            <div className="field">
              <label>Signature</label>
              <div style={{ height: 80, border: '1px dashed var(--line)', borderRadius: 'var(--radius)', display: 'grid', placeItems: 'center', color: 'var(--muted)', fontSize: 12, fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>
                Vikram M.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplateThumbnail({ template }) {
  const accent = template.accent;
  const isClassic = template.layout === 'classic';
  const isBoutique = template.layout === 'boutique';
  const isCompact = template.layout === 'compact';
  const isMinimal = template.layout === 'minimal';
  const isGst = template.layout === 'gst';

  return (
    <div style={{ width: '100%', height: '100%', padding: '14px 14px 0', fontSize: 6, color: '#0e1116', position: 'relative', overflow: 'hidden' }}>
      {isBoutique && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 14, background: accent }}/>}
      {isMinimal && <div style={{ height: 16, borderBottom: '1px dashed #ccc', marginBottom: 8, fontFamily: 'var(--font-mono)', fontSize: 5, paddingTop: 4, color: '#999' }}>RECEIPT — MEHTA TRADING CO.</div>}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, marginTop: isBoutique ? 14 : 0 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontStyle: isClassic || isMinimal ? 'normal' : 'italic', fontSize: 9, fontWeight: 500 }}>Mehta Trading</div>
          <div style={{ fontSize: 4.5, color: '#888', marginTop: 1 }}>14 Marine Drive, Mumbai</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: isClassic ? 'serif' : 'var(--font-display)', fontSize: 11, color: isBoutique ? accent : '#0e1116', fontWeight: isClassic ? 600 : 400 }}>
            {isClassic ? 'TAX INVOICE' : isMinimal ? 'RECEIPT' : 'Invoice'}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 4.5, marginTop: 1 }}>INV-2026-0149</div>
        </div>
      </div>

      <div style={{ borderTop: isClassic ? '1px double #0e1116' : '0.5px solid #ddd', borderBottom: isClassic ? '1px double #0e1116' : '0.5px solid #ddd', padding: '4px 0', display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <div>
          <div style={{ fontSize: 4, color: '#999' }}>BILL TO</div>
          <div style={{ fontWeight: 600, fontSize: 6.5 }}>Lakshmi Textiles</div>
        </div>
        <div style={{ fontSize: 4.5, color: '#666', textAlign: 'right' }}>Due 20 May 2026</div>
      </div>

      {Array.from({ length: isCompact ? 8 : isMinimal ? 3 : 4 }).map((_, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 30px 50px', gap: 4, padding: '2px 0', borderBottom: '0.5px solid #f0f0f0', fontSize: isCompact ? 4.5 : 5 }}>
          <span style={{ color: '#444' }}>Cotton Bedsheet — Queen size</span>
          <span style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{i + 2}</span>
          <span style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>₹{(1450 * (i + 2)).toLocaleString('en-IN')}</span>
        </div>
      ))}

      {isGst && (
        <div style={{ marginTop: 6, fontSize: 4, fontFamily: 'var(--font-mono)', color: '#999', borderTop: '0.5px solid #ddd', paddingTop: 4 }}>
          IRN: a1b2c3d4… · Ack: 11240488 · QR
        </div>
      )}

      <div style={{ position: 'absolute', bottom: 14, right: 14, textAlign: 'right' }}>
        <div style={{ fontSize: 4.5, color: '#888' }}>Total due</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 9, color: accent }}>₹1,84,500</div>
      </div>
    </div>
  );
}

function SettingsPage() {
  const [tab, setTab] = React.useState('business');
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Settings</h1>
          <div className="sub">Configure your business, taxes, and preferences</div>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '200px 1fr', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[
            { id: 'business', label: 'Business profile', ico: 'settings' },
            { id: 'tax', label: 'Tax & GST', ico: 'invoice' },
            { id: 'numbering', label: 'Document numbering', ico: 'tag' },
            { id: 'payments', label: 'Payment methods', ico: 'payment' },
            { id: 'team', label: 'Team & roles', ico: 'customers' },
            { id: 'integrations', label: 'Integrations', ico: 'share' },
            { id: 'notifications', label: 'Notifications', ico: 'bell' },
            { id: 'billing', label: 'Plan & billing', ico: 'credit' },
          ].map(t => (
            <button key={t.id} className={`nav-item ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)} style={{ background: tab === t.id ? 'var(--surface)' : 'transparent', color: tab === t.id ? 'var(--ink)' : 'var(--ink-2)', border: tab === t.id ? '1px solid var(--line)' : '1px solid transparent' }}>
              <span className="ico"><Ico name={t.ico} size={14}/></span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        <div>
          {tab === 'business' && <BusinessProfile/>}
          {tab === 'tax' && <TaxSettings/>}
          {tab === 'numbering' && <NumberingSettings/>}
          {tab === 'payments' && <PaymentMethodsSettings/>}
          {tab === 'team' && <TeamSettings/>}
          {tab === 'integrations' && <IntegrationsSettings/>}
          {tab === 'notifications' && <NotificationSettings/>}
          {tab === 'billing' && <PlanSettings/>}
        </div>
      </div>
    </div>
  );
}

function SectionCard({ title, sub, children }) {
  return (
    <div className="card" style={{ marginBottom: 18 }}>
      <div className="card-head"><div><h3>{title}</h3>{sub && <div className="sub">{sub}</div>}</div></div>
      <div className="card-body">{children}</div>
    </div>
  );
}

function BusinessProfile() {
  return (
    <>
      <SectionCard title="Business details" sub="This appears on your invoices and quotations">
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div className="field"><label>Legal business name</label><input className="input" defaultValue="Mehta Trading Co."/></div>
          <div className="field"><label>Display name</label><input className="input" defaultValue="Mehta Trading"/></div>
          <div className="field"><label>GSTIN</label><input className="input mono" defaultValue="27AAACM1234K1Z5"/></div>
          <div className="field"><label>PAN</label><input className="input mono" defaultValue="AAACM1234K"/></div>
          <div className="field" style={{ gridColumn: '1 / -1' }}><label>Registered address</label><textarea className="textarea" rows="2" defaultValue="14 Marine Drive, Mumbai 400020, Maharashtra"/></div>
          <div className="field"><label>Phone</label><input className="input mono" defaultValue="+91 98765 43210"/></div>
          <div className="field"><label>Email</label><input className="input" defaultValue="vikram@mehta.in"/></div>
        </div>
      </SectionCard>
      <SectionCard title="Currency & locale">
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
          <div className="field"><label>Base currency</label><select className="select"><option>INR · ₹ Indian Rupee</option><option>USD · $</option></select></div>
          <div className="field"><label>Date format</label><select className="select"><option>DD MMM YYYY · 5 May 2026</option><option>MM/DD/YYYY</option><option>YYYY-MM-DD</option></select></div>
          <div className="field"><label>Number format</label><select className="select"><option>1,00,000.00 (Indian)</option><option>100,000.00</option></select></div>
        </div>
      </SectionCard>
    </>
  );
}

function TaxSettings() {
  return (
    <>
      <SectionCard title="GST configuration">
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div className="field"><label>Registration type</label><select className="select"><option>Regular</option><option>Composition</option><option>Unregistered</option></select></div>
          <div className="field"><label>Place of business</label><select className="select"><option>27 — Maharashtra</option></select></div>
        </div>
        <div style={{ marginTop: 16, padding: 14, background: 'var(--accent-soft)', borderRadius: 'var(--radius)', fontSize: 13 }}>
          <div className="row" style={{ gap: 8, marginBottom: 4 }}>
            <Ico name="check" size={14}/>
            <span style={{ fontWeight: 600 }}>e-Invoice generation enabled</span>
          </div>
          <div style={{ color: 'var(--ink-2)', fontSize: 12 }}>IRN and QR code will be added automatically when invoice value exceeds ₹5 Cr threshold (current FY).</div>
        </div>
      </SectionCard>
      <SectionCard title="Tax rates">
        <table className="tbl">
          <thead><tr><th>Name</th><th>Rate</th><th>Type</th><th>Default</th><th></th></tr></thead>
          <tbody>
            {[
              { name: 'GST 5%', rate: 5, type: 'CGST + SGST', def: false },
              { name: 'GST 12%', rate: 12, type: 'CGST + SGST', def: false },
              { name: 'GST 18%', rate: 18, type: 'CGST + SGST', def: true },
              { name: 'GST 28%', rate: 28, type: 'CGST + SGST', def: false },
              { name: 'IGST 18% (Inter-state)', rate: 18, type: 'IGST', def: false },
              { name: 'Exempt', rate: 0, type: '—', def: false },
            ].map(r => (
              <tr key={r.name}>
                <td style={{ fontWeight: 500 }}>{r.name}</td>
                <td className="mono">{r.rate}%</td>
                <td className="muted" style={{ fontSize: 12.5 }}>{r.type}</td>
                <td>{r.def && <span className="pill paid">default</span>}</td>
                <td><button className="btn ghost sm" style={{ padding: 4 }}><Ico name="more" size={13}/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </>
  );
}

function NumberingSettings() {
  return (
    <SectionCard title="Document numbering" sub="How invoice and quotation numbers are generated">
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {[
          { type: 'Invoice', prefix: 'INV-', sep: '-', year: '2026', start: '0001', preview: 'INV-2026-0149' },
          { type: 'Quotation', prefix: 'QT-', sep: '-', year: '2026', start: '0001', preview: 'QT-2026-0042' },
          { type: 'Payment', prefix: 'PAY-', sep: '', year: '', start: '0001', preview: 'PAY-3082' },
          { type: 'Credit note', prefix: 'CN-', sep: '-', year: '2026', start: '0001', preview: 'CN-2026-0008' },
        ].map(d => (
          <div key={d.type} style={{ padding: 14, border: '1px solid var(--line)', borderRadius: 'var(--radius)' }}>
            <div className="row between" style={{ marginBottom: 10 }}>
              <span style={{ fontWeight: 600, fontSize: 13 }}>{d.type}</span>
              <span className="mono pill sent" style={{ fontSize: 11 }}>{d.preview}</span>
            </div>
            <div className="grid" style={{ gridTemplateColumns: 'auto 1fr auto 1fr', gap: 6, alignItems: 'center', fontSize: 12 }}>
              <span className="muted">Prefix</span><input className="input" defaultValue={d.prefix} style={{ padding: '4px 8px' }}/>
              <span className="muted">Year</span><input className="input mono" defaultValue={d.year} style={{ padding: '4px 8px' }}/>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function PaymentMethodsSettings() {
  return (
    <SectionCard title="Payment methods" sub="Show these on invoices for faster collection">
      {[
        { name: 'HDFC Bank · Current', sub: 'A/C ****8821 · IFSC HDFC0001234', def: true, ico: 'credit' },
        { name: 'UPI · vikram@mehta', sub: 'Auto-generated QR on invoices', def: true, ico: 'upi' },
        { name: 'Razorpay · Live', sub: 'Card, NetBanking, UPI links', def: false, ico: 'credit' },
        { name: 'Cash', sub: 'For walk-in customers', def: true, ico: 'payment' },
      ].map(m => (
        <div key={m.name} className="row between" style={{ padding: '14px 0', borderBottom: '1px solid var(--line-2)' }}>
          <div className="row" style={{ gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 'var(--radius)', background: 'var(--surface-2)', display: 'grid', placeItems: 'center' }}>
              <Ico name={m.ico} size={16}/>
            </div>
            <div>
              <div style={{ fontWeight: 500 }}>{m.name}</div>
              <div className="muted" style={{ fontSize: 12 }}>{m.sub}</div>
            </div>
          </div>
          <div className="row" style={{ gap: 8 }}>
            {m.def && <span className="pill paid">enabled</span>}
            <button className="btn sm">Configure</button>
          </div>
        </div>
      ))}
      <button className="btn" style={{ marginTop: 14 }}><Ico name="plus" size={13}/> Add payment method</button>
    </SectionCard>
  );
}

function TeamSettings() {
  return (
    <SectionCard title="Team & roles" sub="Invite teammates to manage billing together">
      <table className="tbl">
        <thead><tr><th>Member</th><th>Role</th><th>Status</th><th>Last active</th><th></th></tr></thead>
        <tbody>
          {[
            { name: 'Vikram Mehta', email: 'vikram@mehta.in', role: 'Owner', status: 'active', last: 'now', color: '#2548f5' },
            { name: 'Priya Iyer', email: 'priya@mehta.in', role: 'Accountant', status: 'active', last: '2 hr ago', color: '#1f8a5b' },
            { name: 'Rohan Patel', email: 'rohan@mehta.in', role: 'Sales', status: 'active', last: 'Yesterday', color: '#d4571f' },
            { name: 'CA Anand & Co.', email: 'ca@anand.in', role: 'Read-only · CA', status: 'invited', last: '—', color: '#7c5cff' },
          ].map(m => (
            <tr key={m.email}>
              <td>
                <div className="row" style={{ gap: 10 }}>
                  <Avatar name={m.name} color={m.color} size={28}/>
                  <div>
                    <div style={{ fontWeight: 500 }}>{m.name}</div>
                    <div className="muted" style={{ fontSize: 11.5 }}>{m.email}</div>
                  </div>
                </div>
              </td>
              <td>{m.role}</td>
              <td><span className={`pill ${m.status === 'active' ? 'paid' : 'sent'}`}>{m.status}</span></td>
              <td className="muted" style={{ fontSize: 12.5 }}>{m.last}</td>
              <td><button className="btn ghost sm" style={{ padding: 4 }}><Ico name="more" size={13}/></button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn primary" style={{ marginTop: 14 }}><Ico name="plus" size={13}/> Invite teammate</button>
    </SectionCard>
  );
}

function IntegrationsSettings() {
  const items = [
    { name: 'Tally Prime', desc: 'Two-way sync of vouchers and ledgers', connected: true },
    { name: 'Zoho Books', desc: 'Push invoices, pull payments', connected: false },
    { name: 'Razorpay', desc: 'Accept online payments', connected: true },
    { name: 'WhatsApp Business', desc: 'Send invoices & reminders', connected: true },
    { name: 'Shopify', desc: 'Auto-create invoices from orders', connected: false },
    { name: 'Google Drive', desc: 'Backup PDFs automatically', connected: false },
  ];
  return (
    <SectionCard title="Integrations">
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {items.map(i => (
          <div key={i.name} style={{ padding: 14, border: '1px solid var(--line)', borderRadius: 'var(--radius)' }}>
            <div className="row between" style={{ marginBottom: 6 }}>
              <span style={{ fontWeight: 600 }}>{i.name}</span>
              {i.connected && <span className="pill paid">connected</span>}
            </div>
            <div className="muted" style={{ fontSize: 12.5, marginBottom: 12 }}>{i.desc}</div>
            <button className="btn sm">{i.connected ? 'Configure' : 'Connect'}</button>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function NotificationSettings() {
  return (
    <SectionCard title="Notifications">
      {[
        { label: 'Send overdue reminders to customers', sub: 'Auto-send at 1, 7, and 14 days past due', on: true },
        { label: 'Notify me when invoice is opened', sub: 'Email + in-app notification', on: true },
        { label: 'Notify me when payment is received', sub: 'Email + WhatsApp', on: true },
        { label: 'Daily summary email', sub: 'At 9:00 AM IST', on: false },
        { label: 'GST filing reminders', sub: '3 days before GSTR-1, GSTR-3B due dates', on: true },
      ].map((n, i) => (
        <div key={i} className="row between" style={{ padding: '14px 0', borderBottom: '1px solid var(--line-2)' }}>
          <div>
            <div style={{ fontWeight: 500 }}>{n.label}</div>
            <div className="muted" style={{ fontSize: 12 }}>{n.sub}</div>
          </div>
          <div style={{ width: 38, height: 22, background: n.on ? 'var(--accent)' : 'var(--line)', borderRadius: 99, padding: 2, cursor: 'pointer', transition: 'background .15s' }}>
            <div style={{ width: 18, height: 18, background: '#fff', borderRadius: '50%', transform: n.on ? 'translateX(16px)' : 'translateX(0)', transition: 'transform .15s' }}/>
          </div>
        </div>
      ))}
    </SectionCard>
  );
}

function PlanSettings() {
  return (
    <>
      <div className="card" style={{ marginBottom: 18, background: 'linear-gradient(180deg, var(--accent-soft), var(--surface))' }}>
        <div className="card-body">
          <div className="row between" style={{ alignItems: 'flex-start' }}>
            <div>
              <div className="muted" style={{ fontSize: 12 }}>Current plan</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 32, margin: '4px 0', fontWeight: 400 }}>Growth · Annual</h2>
              <div className="muted" style={{ fontSize: 13 }}>Unlimited invoices · 5 team members · GST e-invoice · Priority support</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="serif" style={{ fontSize: 28 }}>₹14,999<span style={{ fontSize: 14, color: 'var(--muted)' }}>/year</span></div>
              <div className="muted" style={{ fontSize: 12 }}>Renews 12 Mar 2027</div>
            </div>
          </div>
          <div className="row" style={{ gap: 8, marginTop: 18 }}>
            <button className="btn primary">Upgrade to Scale</button>
            <button className="btn">Manage billing</button>
          </div>
        </div>
      </div>

      <SectionCard title="Usage this month">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {[
            { l: 'Invoices created', v: '38', max: 'Unlimited' },
            { l: 'e-Invoices generated', v: '12 / 100', pct: 12 },
            { l: 'Storage used', v: '2.4 GB / 10 GB', pct: 24 },
          ].map(u => (
            <div key={u.l}>
              <div className="muted" style={{ fontSize: 12 }}>{u.l}</div>
              <div className="serif" style={{ fontSize: 22 }}>{u.v}</div>
              {u.pct && <div style={{ height: 4, background: 'var(--line-2)', borderRadius: 2, marginTop: 8 }}><div style={{ width: u.pct + '%', height: '100%', background: 'var(--accent)', borderRadius: 2 }}/></div>}
              {u.max && <div className="muted" style={{ fontSize: 11.5, marginTop: 6 }}>{u.max}</div>}
            </div>
          ))}
        </div>
      </SectionCard>
    </>
  );
}

window.TemplatesPage = TemplatesPage;
window.SettingsPage = SettingsPage;
window.TemplateThumbnail = TemplateThumbnail;
