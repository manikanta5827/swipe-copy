// Vendors + Purchases + Inventory + Timeline pages

const SEED_VENDORS = [
  { id: "v1", name: "Krishna Yarn Mills", contact: "Suresh K.", phone: "+91 98221 33445", gstin: "27AAACK1100K1Z2", city: "Surat", payable: 124000, total: 890000, color: "#2548f5", terms: "Net 30" },
  { id: "v2", name: "Steel Source India", contact: "Naveen R.", phone: "+91 99880 12345", gstin: "29AAACS2200K1Z3", city: "Bengaluru", payable: 0, total: 412000, color: "#1f8a5b", terms: "Net 15" },
  { id: "v3", name: "Brightlite LED Co.", contact: "Anita M.", phone: "+91 90000 11122", gstin: "33AAACB3300K1Z4", city: "Chennai", payable: 67800, total: 540000, color: "#d4571f", terms: "Advance" },
  { id: "v4", name: "Spice Valley Traders", contact: "Manish J.", phone: "+91 98765 88990", gstin: "24AAACS4400K1Z5", city: "Ahmedabad", payable: 18400, total: 96200, color: "#7c5cff", terms: "Net 30" },
  { id: "v5", name: "Pacific Packaging", contact: "Reena P.", phone: "+91 99001 23456", gstin: "27AAACP5500K1Z6", city: "Mumbai", payable: 0, total: 248000, color: "#b8861b", terms: "Net 7" },
];

const SEED_PURCHASES = [
  { id: "PO-2026-0061", vendor: "Krishna Yarn Mills", date: "2026-05-04", due: "2026-06-03", amount: 124000, status: "received", items: 4 },
  { id: "PO-2026-0060", vendor: "Brightlite LED Co.", date: "2026-05-02", due: "2026-05-02", amount: 67800, status: "partial", items: 2 },
  { id: "PO-2026-0059", vendor: "Steel Source India", date: "2026-04-28", due: "2026-05-13", amount: 88400, status: "paid", items: 6 },
  { id: "PO-2026-0058", vendor: "Spice Valley Traders", date: "2026-04-26", due: "2026-05-26", amount: 18400, status: "ordered", items: 3 },
  { id: "PO-2026-0057", vendor: "Pacific Packaging", date: "2026-04-22", due: "2026-04-29", amount: 24800, status: "paid", items: 1 },
  { id: "PO-2026-0056", vendor: "Krishna Yarn Mills", date: "2026-04-18", due: "2026-05-18", amount: 95000, status: "paid", items: 3 },
];

function VendorsPage() {
  const [sel, setSel] = React.useState(null);
  const toast = useToast();
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Vendors</h1>
          <div className="sub">{SEED_VENDORS.length} vendors · {fmtINR(SEED_VENDORS.reduce((s,v)=>s+v.payable,0))} payable</div>
        </div>
        <button className="btn accent" onClick={() => toast('New vendor form opened',{ico:'plus'})}><Ico name="plus" size={14}/> Add vendor</button>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}>
        <div className="stat"><div className="label">Total payable</div><div className="val"><span className="cur">₹</span>2.10L</div><div className="muted" style={{fontSize:11.5}}>Across 3 vendors</div></div>
        <div className="stat"><div className="label">Due this week</div><div className="val"><span className="cur">₹</span>67,800</div><div className="delta down"><Ico name="arrow-down" size={11}/> Brightlite LED</div></div>
        <div className="stat"><div className="label">YTD purchases</div><div className="val"><span className="cur">₹</span>21.8L</div><div className="delta up"><Ico name="arrow-up" size={11}/> +12%</div></div>
        <div className="stat"><div className="label">Active vendors</div><div className="val">{SEED_VENDORS.length}</div><div className="muted" style={{fontSize:11.5}}>2 new this quarter</div></div>
      </div>

      <div className="card">
        <table className="tbl">
          <thead><tr><th>Vendor</th><th>GSTIN</th><th>City</th><th>Terms</th><th style={{textAlign:'right'}}>Payable</th><th style={{textAlign:'right'}}>YTD spend</th><th></th></tr></thead>
          <tbody>
            {SEED_VENDORS.map(v => (
              <tr key={v.id} className="clickable" onClick={()=>setSel(v)}>
                <td><div className="row" style={{gap:10}}><Avatar name={v.name} color={v.color} size={28}/><div><div style={{fontWeight:500}}>{v.name}</div><div className="muted" style={{fontSize:11.5}}>{v.contact}</div></div></div></td>
                <td className="mono" style={{fontSize:11.5}}>{v.gstin}</td>
                <td className="muted" style={{fontSize:12.5}}>{v.city}</td>
                <td><span className="pill sent">{v.terms}</span></td>
                <td className="num" style={{color: v.payable>0?'var(--warn)':'var(--muted)'}}>{v.payable>0?fmtINR(v.payable):'—'}</td>
                <td className="num">{fmtINR(v.total)}</td>
                <td><button className="btn ghost sm" style={{padding:4}} onClick={e=>e.stopPropagation()}><Ico name="more" size={14}/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sel && (
        <>
          <div className="drawer-bg" onClick={()=>setSel(null)}/>
          <div className="drawer" style={{width:520}}>
            <div className="row between" style={{padding:16, borderBottom:'1px solid var(--line)'}}>
              <div className="row" style={{gap:12}}>
                <Avatar name={sel.name} color={sel.color} size={40}/>
                <div><div style={{fontWeight:600,fontSize:16}}>{sel.name}</div><div className="muted" style={{fontSize:12}}>{sel.contact} · {sel.terms}</div></div>
              </div>
              <button className="btn ghost" onClick={()=>setSel(null)}><Ico name="x" size={14}/></button>
            </div>
            <div style={{padding:16, flex:1, overflow:'auto'}}>
              <div className="grid" style={{gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:18}}>
                <div style={{padding:12, background:'var(--surface-2)', borderRadius:'var(--radius)'}}><div className="muted" style={{fontSize:11}}>Payable</div><div className="serif" style={{fontSize:22}}>{fmtINR(sel.payable)}</div></div>
                <div style={{padding:12, background:'var(--surface-2)', borderRadius:'var(--radius)'}}><div className="muted" style={{fontSize:11}}>YTD spend</div><div className="serif" style={{fontSize:22}}>{fmtINR(sel.total)}</div></div>
              </div>
              <h4 style={{fontSize:11, textTransform:'uppercase', letterSpacing:'.08em', color:'var(--muted)', margin:'8px 0'}}>Recent purchases</h4>
              {SEED_PURCHASES.filter(p=>p.vendor===sel.name).map(p=>(
                <div key={p.id} className="row between" style={{padding:'10px 12px', border:'1px solid var(--line-2)', borderRadius:8, marginBottom:6}}>
                  <div><div className="mono" style={{fontSize:12}}>{p.id}</div><div className="muted" style={{fontSize:11.5}}>{fmtDate(p.date)}</div></div>
                  <div className="row" style={{gap:10}}><span className={`pill ${p.status==='paid'?'paid':p.status==='partial'?'partial':'sent'}`}>{p.status}</span><span className="mono">{fmtINR(p.amount)}</span></div>
                </div>
              ))}
            </div>
            <div className="row" style={{padding:14, borderTop:'1px solid var(--line)', gap:8}}>
              <button className="btn" style={{flex:1}}><Ico name="phone" size={13}/> Call</button>
              <button className="btn primary" style={{flex:1}}><Ico name="invoice" size={13}/> New PO</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function PurchasesPage() {
  const [filter, setFilter] = React.useState('all');
  const filtered = SEED_PURCHASES.filter(p=> filter==='all' || p.status===filter);
  return (
    <div className="page">
      <div className="page-head">
        <div><h1>Purchases</h1><div className="sub">Track POs, bills, and vendor payments</div></div>
        <div className="row"><button className="btn"><Ico name="download" size={13}/> Bulk import</button><button className="btn accent"><Ico name="plus" size={14}/> New purchase order</button></div>
      </div>

      <div className="grid" style={{gridTemplateColumns:'repeat(4,1fr)', marginBottom:20}}>
        <div className="stat"><div className="label">This month</div><div className="val"><span className="cur">₹</span>3.18L</div><div className="delta up"><Ico name="arrow-up" size={11}/> +8%</div></div>
        <div className="stat"><div className="label">Awaiting receipt</div><div className="val">2</div><div className="muted" style={{fontSize:11.5}}>POs ordered</div></div>
        <div className="stat"><div className="label">Bills due (7d)</div><div className="val"><span className="cur">₹</span>67,800</div><div className="delta down"><Ico name="arrow-down" size={11}/> 1 vendor</div></div>
        <div className="stat"><div className="label">GST on purchases</div><div className="val"><span className="cur">₹</span>52,440</div><div className="muted" style={{fontSize:11.5}}>ITC available</div></div>
      </div>

      <div className="card">
        <div className="card-head" style={{padding:'12px 16px'}}>
          <div className="seg">
            {['all','ordered','received','partial','paid'].map(t=> <button key={t} className={filter===t?'on':''} onClick={()=>setFilter(t)}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>)}
          </div>
          <button className="btn"><Ico name="filter" size={13}/> Filter</button>
        </div>
        <table className="tbl">
          <thead><tr><th>PO #</th><th>Vendor</th><th>Date</th><th>Due</th><th>Items</th><th>Status</th><th style={{textAlign:'right'}}>Amount</th><th></th></tr></thead>
          <tbody>
            {filtered.map(p=>{
              const v = SEED_VENDORS.find(x=>x.name===p.vendor);
              return (
                <tr key={p.id} className="clickable">
                  <td className="mono" style={{fontSize:12.5, fontWeight:500}}>{p.id}</td>
                  <td><div className="row" style={{gap:10}}><Avatar name={p.vendor} color={v?.color} size={24}/><span>{p.vendor}</span></div></td>
                  <td className="muted" style={{fontSize:12.5}}>{fmtDateShort(p.date)}</td>
                  <td className="muted" style={{fontSize:12.5}}>{fmtDateShort(p.due)}</td>
                  <td className="muted" style={{fontSize:12.5}}>{p.items}</td>
                  <td><span className={`pill ${p.status==='paid'?'paid':p.status==='partial'?'partial':p.status==='received'?'sent':'draft'}`}>{p.status}</span></td>
                  <td className="num">{fmtINR(p.amount)}</td>
                  <td><button className="btn ghost sm" style={{padding:4}}><Ico name="more" size={14}/></button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InventoryPage() {
  const movements = [
    { date: '2026-05-05', type: 'in', sku: 'CBS-Q-WHT', name: 'Cotton Bedsheet — Queen', qty: 60, ref: 'PO-2026-0061', balance: 124 },
    { date: '2026-05-04', type: 'out', sku: 'CBS-Q-WHT', name: 'Cotton Bedsheet — Queen', qty: 12, ref: 'INV-2026-0148', balance: 64 },
    { date: '2026-05-04', type: 'out', sku: 'LED-24W-CW', name: 'LED Panel Light 24W', qty: 8, ref: 'INV-2026-0148', balance: 410 },
    { date: '2026-05-03', type: 'out', sku: 'SDH-4-SS', name: 'Steel Door Hinge 4"', qty: 200, ref: 'INV-2026-0147', balance: 2400 },
    { date: '2026-05-02', type: 'adj', sku: 'CW-100', name: 'Cardamom Whole 100g', qty: -3, ref: 'Stock count', balance: 12 },
    { date: '2026-05-01', type: 'in', sku: 'BH-6-AB', name: 'Brass Handle 6"', qty: 50, ref: 'PO-2026-0060', balance: 38 },
  ];
  const lowStock = SEED_PRODUCTS.filter(p=> p.stock!==null && p.stock < 50);

  return (
    <div className="page">
      <div className="page-head">
        <div><h1>Inventory</h1><div className="sub">Real-time stock levels, movements, and reorder alerts</div></div>
        <div className="row"><button className="btn"><Ico name="download" size={13}/> Stock report</button><button className="btn"><Ico name="plus" size={13}/> Stock adjustment</button></div>
      </div>

      <div className="grid" style={{gridTemplateColumns:'repeat(4,1fr)', marginBottom:20}}>
        <div className="stat"><div className="label">Stock value</div><div className="val"><span className="cur">₹</span>14.2L</div><div className="muted" style={{fontSize:11.5}}>At cost</div></div>
        <div className="stat"><div className="label">Low stock items</div><div className="val">{lowStock.length}</div><div className="delta down"><Ico name="arrow-down" size={11}/> Reorder soon</div></div>
        <div className="stat"><div className="label">Out of stock</div><div className="val">1</div><div className="muted" style={{fontSize:11.5}}>Cotton Pillow Cover</div></div>
        <div className="stat"><div className="label">Stock turnover (90d)</div><div className="val">4.2×</div><div className="delta up"><Ico name="arrow-up" size={11}/> +0.6×</div></div>
      </div>

      <div className="grid" style={{gridTemplateColumns:'2fr 1fr', gap:16, marginBottom:16}}>
        <div className="card">
          <div className="card-head"><h3>Stock movements</h3><span className="sub">Last 7 days · {movements.length} entries</span></div>
          <table className="tbl">
            <thead><tr><th>Date</th><th>Item</th><th>Type</th><th>Reference</th><th style={{textAlign:'right'}}>Qty</th><th style={{textAlign:'right'}}>Balance</th></tr></thead>
            <tbody>
              {movements.map((m,i)=>(
                <tr key={i}>
                  <td className="muted" style={{fontSize:12.5}}>{fmtDateShort(m.date)}</td>
                  <td><div style={{fontSize:13}}>{m.name}</div><div className="mono muted" style={{fontSize:11}}>{m.sku}</div></td>
                  <td><span className={`pill ${m.type==='in'?'paid':m.type==='out'?'sent':'due'}`}>{m.type==='in'?'stock in':m.type==='out'?'stock out':'adjust'}</span></td>
                  <td className="mono" style={{fontSize:11.5}}>{m.ref}</td>
                  <td className="num" style={{color: m.type==='in'?'var(--good)':m.type==='out'?'var(--bad)':'var(--warn)', fontWeight:500}}>{m.type==='in'?'+':m.type==='out'?'−':''}{Math.abs(m.qty)}</td>
                  <td className="num">{m.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-head"><h3>Reorder alerts</h3><span className="sub">Below threshold</span></div>
          <div style={{padding:'4px 12px'}}>
            {lowStock.map(p=>(
              <div key={p.id} style={{padding:'12px 4px', borderBottom:'1px solid var(--line-2)'}}>
                <div className="row between" style={{marginBottom:6}}>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontWeight:500, fontSize:13, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{p.name}</div>
                    <div className="mono muted" style={{fontSize:11}}>{p.sku}</div>
                  </div>
                  <span className={`pill ${p.stock===0?'overdue':'due'}`}>{p.stock===0?'out':p.stock+' left'}</span>
                </div>
                <button className="btn sm" style={{width:'100%'}}><Ico name="plus" size={11}/> Create PO</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-head"><h3>Stock by warehouse</h3></div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'var(--line-2)'}}>
          {[
            {name:'Mumbai · HQ', addr:'14 Marine Drive', items:6, value:'₹9.4L'},
            {name:'Surat · Branch', addr:'Ring Road, Surat', items:2, value:'₹3.1L'},
            {name:'Bengaluru · Storefront', addr:'Indiranagar', items:3, value:'₹1.7L'},
          ].map(w=>(
            <div key={w.name} style={{background:'var(--surface)', padding:18}}>
              <div className="row" style={{gap:10, marginBottom:10}}>
                <div style={{width:32, height:32, borderRadius:8, background:'var(--surface-2)', display:'grid', placeItems:'center'}}><Ico name="warehouse" size={16}/></div>
                <div><div style={{fontWeight:600, fontSize:13.5}}>{w.name}</div><div className="muted" style={{fontSize:11.5}}>{w.addr}</div></div>
              </div>
              <div className="row between" style={{paddingTop:10, borderTop:'1px solid var(--line-2)'}}>
                <div><div className="muted" style={{fontSize:11}}>SKUs</div><div className="mono">{w.items}</div></div>
                <div style={{textAlign:'right'}}><div className="muted" style={{fontSize:11}}>Value</div><div className="serif" style={{fontSize:18}}>{w.value}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelinePage() {
  const events = [
    { time: '2:14 PM · Today', who: 'Vikram', what: 'sent invoice', target: 'INV-2026-0148 to Lakshmi Textiles', amt: '₹1,84,500', ico: 'send', tone: 'ink' },
    { time: '2:08 PM · Today', who: 'AI assistant', what: 'drafted invoice from chat for', target: 'Lakshmi Textiles', ico: 'invoice', tone: 'accent' },
    { time: '12:42 PM · Today', who: 'Patel Hardware', what: 'paid', target: 'INV-2026-0147 via UPI', amt: '+₹42,300', ico: 'check', tone: 'good' },
    { time: '11:24 AM · Today', who: 'GSTN', what: 'generated IRN for', target: 'INV-2026-0146', ico: 'check', tone: 'good' },
    { time: '10:02 AM · Today', who: 'Priya', what: 'recorded payment from', target: 'Greenleaf Organics', amt: '+₹12,860', ico: 'payment', tone: 'good' },
    { time: '9:45 AM · Today', who: 'Lakshmi Textiles', what: 'opened', target: 'INV-2026-0148 (3 times)', ico: 'mail', tone: 'accent' },
    { time: 'Yesterday · 6:18 PM', who: 'System', what: 'flagged', target: 'INV-2026-0145 as overdue (Mehta & Sons)', ico: 'history', tone: 'bad' },
    { time: 'Yesterday · 4:30 PM', who: 'Rohan', what: 'created quotation', target: 'QT-2026-0042 for Lakshmi Textiles', amt: '₹2,45,000', ico: 'sales', tone: 'ink' },
    { time: 'Yesterday · 2:15 PM', who: 'Krishna Yarn Mills', what: 'delivered PO', target: 'PO-2026-0061 (60 units bedsheet stock)', ico: 'warehouse', tone: 'accent' },
    { time: '2 days ago', who: 'Surya Electronics', what: 'paid via NEFT', target: 'INV-2026-0144', amt: '+₹1,07,800', ico: 'payment', tone: 'good' },
    { time: '2 days ago', who: 'Vikram', what: 'updated', target: 'tax rate for HSN 6304 from 12% to 5%', ico: 'edit', tone: 'ink' },
    { time: '3 days ago', who: 'CA Anand & Co.', what: 'was invited as', target: 'Read-only · CA accountant', ico: 'customers', tone: 'accent' },
  ];

  return (
    <div className="page">
      <div className="page-head">
        <div><h1>Timeline</h1><div className="sub">Every event across your business — invoices, payments, stock, team, system</div></div>
        <div className="row">
          <div className="seg"><button className="on">All</button><button>Invoices</button><button>Payments</button><button>Stock</button><button>Team</button></div>
          <button className="btn"><Ico name="filter" size={13}/></button>
        </div>
      </div>

      <div className="card">
        <div style={{padding:'4px 24px'}}>
          {events.map((e,i)=>(
            <div key={i} className="row" style={{padding:'14px 0', gap:14, alignItems:'flex-start', borderBottom: i<events.length-1?'1px solid var(--line-2)':0, position:'relative'}}>
              <div style={{
                width:32, height:32, borderRadius:8, display:'grid', placeItems:'center', flexShrink:0,
                background: e.tone==='good'?'var(--good-soft)':e.tone==='bad'?'var(--bad-soft)':e.tone==='accent'?'var(--accent-soft)':'var(--surface-2)',
                color: e.tone==='good'?'var(--good)':e.tone==='bad'?'var(--bad)':e.tone==='accent'?'var(--accent)':'var(--ink)'
              }}><Ico name={e.ico} size={14}/></div>
              <div style={{flex:1}}>
                <div style={{fontSize:13.5, lineHeight:1.45}}>
                  <b style={{fontWeight:600}}>{e.who}</b> <span style={{color:'var(--muted)'}}>{e.what}</span> <b style={{fontWeight:500}}>{e.target}</b>
                  {e.amt && <span className="mono" style={{marginLeft:8, color: e.amt.startsWith('+')?'var(--good)':'var(--ink)', fontWeight:500}}>{e.amt}</span>}
                </div>
                <div className="muted" style={{fontSize:11.5, marginTop:2, fontFamily:'var(--font-mono)'}}>{e.time}</div>
              </div>
              <button className="btn ghost sm" style={{padding:4, opacity:.6}}><Ico name="arrow-right" size={12}/></button>
            </div>
          ))}
        </div>
        <div className="row between" style={{padding:'14px 24px', borderTop:'1px solid var(--line)', fontSize:12.5}}>
          <span className="muted">Showing today + 3 days</span>
          <button className="btn sm">Load more</button>
        </div>
      </div>
    </div>
  );
}

window.VendorsPage = VendorsPage;
window.PurchasesPage = PurchasesPage;
window.InventoryPage = InventoryPage;
window.TimelinePage = TimelinePage;
