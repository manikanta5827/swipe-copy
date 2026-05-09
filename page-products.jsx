// Products / Inventory page

function ProductsPage() {
  const [view, setView] = React.useState('grid');
  const [cat, setCat] = React.useState('All');
  const cats = ['All', ...new Set(SEED_PRODUCTS.map(p => p.category))];
  const filtered = cat === 'All' ? SEED_PRODUCTS : SEED_PRODUCTS.filter(p => p.category === cat);
  const toast = useToast();

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Products & services</h1>
          <div className="sub">{SEED_PRODUCTS.length} items · {SEED_PRODUCTS.filter(p => p.stock !== null && p.stock < 20).length} low stock</div>
        </div>
        <div className="row">
          <button className="btn"><Ico name="warehouse" size={13}/> Stock report</button>
          <button className="btn accent" onClick={() => toast('New product form opened', { ico: 'plus' })}><Ico name="plus" size={14}/> Add product</button>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}>
        <div className="stat"><div className="label">Total stock value</div><div className="val"><span className="cur">₹</span>14.2L</div><div className="muted" style={{fontSize:11.5}}>Across 8 SKUs</div></div>
        <div className="stat"><div className="label">Low stock</div><div className="val">2</div><div className="delta down"><Ico name="arrow-down" size={11}/> Reorder needed</div></div>
        <div className="stat"><div className="label">Out of stock</div><div className="val">1</div><div className="muted" style={{fontSize:11.5}}>Cotton Pillow Cover</div></div>
        <div className="stat"><div className="label">Top mover (30d)</div><div className="val" style={{fontSize:18, marginTop:10}}>Cotton Bedsheet</div><div className="muted" style={{fontSize:11.5}}>148 units sold</div></div>
      </div>

      <div className="card">
        <div className="card-head" style={{ padding: '12px 16px' }}>
          <div className="row" style={{ gap: 6, flexWrap: 'wrap' }}>
            {cats.map(c => (
              <button key={c} className={`btn sm ${cat === c ? 'primary' : ''}`} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
          <div className="row" style={{ gap: 8 }}>
            <div className="seg">
              <button className={view === 'grid' ? 'on' : ''} onClick={() => setView('grid')}>Grid</button>
              <button className={view === 'table' ? 'on' : ''} onClick={() => setView('table')}>Table</button>
            </div>
            <button className="btn"><Ico name="download" size={13}/></button>
          </div>
        </div>

        {view === 'table' ? (
          <table className="tbl">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>HSN</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Tax</th>
                <th style={{ textAlign: 'right' }}>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="clickable">
                  <td style={{ fontWeight: 500 }}>{p.name}</td>
                  <td className="mono" style={{ fontSize: 12 }}>{p.sku}</td>
                  <td className="mono" style={{ fontSize: 12 }}>{p.hsn}</td>
                  <td className="muted" style={{ fontSize: 12.5 }}>{p.category}</td>
                  <td>
                    {p.stock === null ? <span className="muted">—</span> :
                     p.stock === 0 ? <span className="pill overdue">out</span> :
                     p.stock < 20 ? <span className="pill due">{p.stock} {p.unit}</span> :
                     <span className="mono">{p.stock} {p.unit}</span>}
                  </td>
                  <td className="mono" style={{ fontSize: 12 }}>{p.tax}%</td>
                  <td className="num" style={{ fontWeight: 500 }}>{fmtINR(p.price)}</td>
                  <td><button className="btn ghost sm" style={{ padding: 4 }}><Ico name="more" size={14}/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {filtered.map(p => (
              <div key={p.id} className="card" style={{ padding: 14, cursor: 'pointer' }}>
                <div style={{
                  height: 100, borderRadius: 8, marginBottom: 10,
                  background: `repeating-linear-gradient(45deg, var(--surface-2), var(--surface-2) 8px, var(--line-2) 8px, var(--line-2) 16px)`,
                  display: 'grid', placeItems: 'center', color: 'var(--muted)', fontSize: 11, fontFamily: 'var(--font-mono)'
                }}>
                  product photo
                </div>
                <div style={{ fontWeight: 500, fontSize: 13.5, marginBottom: 2, lineHeight: 1.3 }}>{p.name}</div>
                <div className="muted mono" style={{ fontSize: 11, marginBottom: 8 }}>{p.sku} · HSN {p.hsn}</div>
                <div className="row between">
                  <span className="serif" style={{ fontSize: 18 }}>{fmtINR(p.price)}</span>
                  {p.stock === null ? <span className="muted" style={{fontSize:11.5}}>service</span> :
                   p.stock === 0 ? <span className="pill overdue">out</span> :
                   p.stock < 20 ? <span className="pill due">{p.stock} left</span> :
                   <span className="muted mono" style={{fontSize:11.5}}>{p.stock} {p.unit}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

window.ProductsPage = ProductsPage;
