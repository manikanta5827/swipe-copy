// Dashboard + Reports

function Sparkline({ values, width = 80, height = 28, color = "var(--accent)" }) {
  const path = sparkPath(values, width, height);
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function StatCard({ label, value, currency, delta, deltaDir, series, sparkColor }) {
  return (
    <div className="stat">
      <div className="label">{label}</div>
      <div className="val">
        {currency && <span className="cur">{currency}</span>}
        {value}
      </div>
      <div className={`delta ${deltaDir}`}>
        <Ico name={deltaDir === 'up' ? 'arrow-up' : 'arrow-down'} size={11} />
        {delta}
      </div>
      {series && <div className="spark"><Sparkline values={series} color={sparkColor || 'var(--accent)'} /></div>}
    </div>
  );
}

function RevenueChart() {
  const months = ['Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May'];
  const max = Math.max(...REVENUE_SERIES) * 1.1;
  const W = 720, H = 240, pad = 32;
  const bw = (W - pad * 2) / REVENUE_SERIES.length;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
      {[0, 0.25, 0.5, 0.75, 1].map(t => {
        const y = pad + (H - pad * 2) * (1 - t);
        return <line key={t} x1={pad} x2={W - pad} y1={y} y2={y} stroke="var(--line)" strokeDasharray="2 4"/>;
      })}
      {REVENUE_SERIES.map((v, i) => {
        const h = (v / max) * (H - pad * 2);
        const x = pad + i * bw + 4;
        const y = H - pad - h;
        const isLast = i === REVENUE_SERIES.length - 1;
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw - 8} height={h} rx="3" fill={isLast ? 'var(--accent)' : 'var(--ink-2)'} opacity={isLast ? 1 : 0.85}/>
            <text x={x + (bw - 8) / 2} y={H - 10} textAnchor="middle" fontSize="10" fill="var(--muted)" fontFamily="var(--font-mono)">{months[i]}</text>
          </g>
        );
      })}
      <text x={pad} y={20} fontSize="11" fill="var(--muted)" fontFamily="var(--font-mono)">₹ in lakhs</text>
    </svg>
  );
}

function Dashboard({ setPage }) {
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Good morning, Vikram</h1>
          <div className="sub">Here's what's happening at Mehta Trading Co. today — Tuesday, 5 May 2026</div>
        </div>
        <div className="row">
          <div className="seg">
            <button className="on">Today</button>
            <button>7d</button>
            <button>30d</button>
            <button>FY</button>
          </div>
          <button className="btn accent" onClick={() => setPage('create')}>
            <Ico name="plus" size={14} /> New invoice
          </button>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}>
        <StatCard label="Revenue this month" currency="₹" value="13.8L" delta="+18.4% vs Apr" deltaDir="up" series={REVENUE_SERIES} />
        <StatCard label="Outstanding" currency="₹" value="4.24L" delta="−6.1% w/w" deltaDir="down" series={[60,72,68,55,48,42]} sparkColor="var(--warn)"/>
        <StatCard label="Invoices sent" value="38" delta="+9 vs Apr" deltaDir="up" series={INVOICE_SERIES} sparkColor="var(--good)"/>
        <StatCard label="Avg. days to pay" value="11.2" delta="−1.4 days" deltaDir="down" series={[18,17,15,14,13,12,11]} sparkColor="var(--good)"/>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', marginBottom: 20 }}>
        <div className="card">
          <div className="card-head">
            <div>
              <h3>Revenue · last 12 months</h3>
              <div className="sub">Tax-inclusive · all branches</div>
            </div>
            <div className="seg">
              <button className="on">Bar</button>
              <button>Line</button>
            </div>
          </div>
          <div className="card-body" style={{ padding: '12px 8px 4px' }}>
            <RevenueChart />
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <h3>Receivables aging</h3>
            <button className="btn ghost sm">View all</button>
          </div>
          <div className="card-body">
            {[
              { label: 'Not due yet', amt: 184500, color: 'var(--good)', pct: 43 },
              { label: '1–15 days', amt: 96400, color: 'var(--warn)', pct: 23 },
              { label: '16–30 days', amt: 107800, color: 'var(--accent)', pct: 25 },
              { label: '30+ days overdue', amt: 35400, color: 'var(--bad)', pct: 9 },
            ].map(r => (
              <div key={r.label} style={{ marginBottom: 14 }}>
                <div className="row between" style={{ marginBottom: 5 }}>
                  <span style={{ fontSize: 12.5 }}>{r.label}</span>
                  <span className="mono" style={{ fontSize: 12.5 }}>{fmtINR(r.amt)}</span>
                </div>
                <div style={{ height: 6, background: 'var(--line-2)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: r.pct + '%', height: '100%', background: r.color }}/>
                </div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--line-2)', paddingTop: 12, marginTop: 4 }} className="row between">
              <span style={{ fontWeight: 600 }}>Total receivable</span>
              <span className="mono" style={{ fontWeight: 600 }}>{fmtINR(424100)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', marginBottom: 20 }}>
        <div className="card">
          <div className="card-head">
            <h3>Recent invoices</h3>
            <button className="btn ghost sm" onClick={() => setPage('invoices')}>See all <Ico name="arrow-right" size={12}/></button>
          </div>
          <table className="tbl">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {SEED_INVOICES.slice(0, 6).map(inv => (
                <tr key={inv.id} className="clickable">
                  <td className="mono" style={{ fontSize: 12.5 }}>{inv.id}</td>
                  <td>{inv.customer}</td>
                  <td className="muted" style={{ fontSize: 12.5 }}>{fmtDateShort(inv.date)}</td>
                  <td><Pill status={inv.status}/></td>
                  <td className="num">{fmtINR(inv.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-head">
            <h3>Quick actions</h3>
          </div>
          <div className="card-body" style={{ padding: 16 }}>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                { ico: 'invoice', label: 'New invoice', tag: 'I', go: 'create' },
                { ico: 'sales', label: 'New quotation', tag: 'Q', go: 'sales' },
                { ico: 'payment', label: 'Record payment', tag: 'P', go: 'payments' },
                { ico: 'customers', label: 'Add customer', tag: 'C', go: 'customers' },
                { ico: 'products', label: 'Add product', tag: 'X', go: 'products' },
                { ico: 'reports', label: 'GSTR-1 export', tag: 'G', go: 'reports' },
              ].map(a => (
                <button key={a.label} className="btn" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8, padding: 12, height: 76 }} onClick={() => setPage(a.go)}>
                  <Ico name={a.ico} size={16}/>
                  <span style={{ fontSize: 12.5 }}>{a.label}</span>
                </button>
              ))}
            </div>
            <div style={{ marginTop: 14, padding: 12, background: 'var(--accent-soft)', borderRadius: 'var(--radius)', fontSize: 12.5 }}>
              <div style={{ fontWeight: 600, color: 'var(--accent-ink)', marginBottom: 2 }}>GSTR-1 due in 6 days</div>
              <div style={{ color: 'var(--muted)' }}>Filing for April 2026 is ready. Review and submit.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        <div className="card">
          <div className="card-head"><h3>Top customers</h3><span className="sub">FY26 to date</span></div>
          <div className="card-body" style={{ padding: '8px 12px' }}>
            {SEED_CUSTOMERS.sort((a,b) => b.total - a.total).slice(0, 5).map(c => (
              <div key={c.id} className="row" style={{ padding: '10px 6px', borderBottom: '1px solid var(--line-2)', gap: 12 }}>
                <Avatar name={c.name} color={c.color}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div>
                  <div className="muted" style={{ fontSize: 11.5 }}>{c.city}</div>
                </div>
                <div className="mono" style={{ fontSize: 12.5, fontWeight: 500 }}>{fmtINRshort(c.total)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-head"><h3>Payment methods</h3><span className="sub">Last 30 days</span></div>
          <div className="card-body">
            {[
              { name: 'UPI', pct: 52, ico: 'upi', color: 'var(--accent)' },
              { name: 'Bank transfer', pct: 28, ico: 'credit', color: 'var(--ink-2)' },
              { name: 'Cash', pct: 12, ico: 'payment', color: 'var(--good)' },
              { name: 'Card', pct: 8, ico: 'credit', color: 'var(--warn)' },
            ].map(m => (
              <div key={m.name} style={{ marginBottom: 14 }}>
                <div className="row between" style={{ marginBottom: 5 }}>
                  <span className="row" style={{ gap: 8, fontSize: 13 }}><Ico name={m.ico} size={14}/> {m.name}</span>
                  <span className="mono" style={{ fontSize: 12.5 }}>{m.pct}%</span>
                </div>
                <div style={{ height: 5, background: 'var(--line-2)', borderRadius: 3 }}>
                  <div style={{ width: m.pct + '%', height: '100%', background: m.color, borderRadius: 3 }}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-head"><h3>Activity</h3></div>
          <div className="card-body" style={{ padding: '4px 16px' }}>
            {[
              { who: 'Patel Hardware Co.', what: 'paid INV-2026-0147', amt: '₹42,300', when: '12 min ago', ico: 'check', tone: 'good' },
              { who: 'Lakshmi Textiles', what: 'opened INV-2026-0148', when: '1 hr ago', ico: 'mail', tone: 'accent' },
              { who: 'You', what: 'sent INV-2026-0148', when: '2 hr ago', ico: 'send', tone: 'ink' },
              { who: 'Mehta & Sons', what: 'invoice overdue', when: 'Yesterday', ico: 'history', tone: 'bad' },
              { who: 'GSTN', what: 'IRN generated for INV-0146', when: '2d ago', ico: 'check', tone: 'good' },
            ].map((a, i) => (
              <div key={i} className="row" style={{ padding: '10px 0', borderBottom: i < 4 ? '1px solid var(--line-2)' : 0, gap: 10, alignItems: 'flex-start' }}>
                <div style={{
                  width: 26, height: 26, borderRadius: 6, display: 'grid', placeItems: 'center', flexShrink: 0,
                  background: a.tone === 'good' ? 'var(--good-soft)' : a.tone === 'bad' ? 'var(--bad-soft)' : a.tone === 'accent' ? 'var(--accent-soft)' : 'var(--surface-2)',
                  color: a.tone === 'good' ? 'var(--good)' : a.tone === 'bad' ? 'var(--bad)' : a.tone === 'accent' ? 'var(--accent)' : 'var(--ink)'
                }}>
                  <Ico name={a.ico} size={13}/>
                </div>
                <div style={{ flex: 1, fontSize: 13, lineHeight: 1.4 }}>
                  <b style={{ fontWeight: 550 }}>{a.who}</b> {a.what} {a.amt && <span className="mono" style={{ color: 'var(--good)' }}>{a.amt}</span>}
                  <div className="muted" style={{ fontSize: 11.5, marginTop: 1 }}>{a.when}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

window.Dashboard = Dashboard;
window.Sparkline = Sparkline;
