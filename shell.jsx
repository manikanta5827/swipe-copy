// Shared UI primitives: Sidebar, Topbar, Toast

const NAV = [
  { id: "dashboard", label: "Ask Billd", ico: "sun" },
  { id: "timeline", label: "Timeline", ico: "history" },
  { id: "invoices", label: "Invoices", ico: "invoice", badge: 3 },
  { id: "create", label: "Create invoice", ico: "plus" },
  { id: "sales", label: "Quotations", ico: "sales" },
  { id: "payments", label: "Payments", ico: "payment" },
];
const NAV_2 = [
  { id: "customers", label: "Customers", ico: "customers" },
  { id: "vendors", label: "Vendors", ico: "warehouse" },
  { id: "purchases", label: "Purchases", ico: "tag" },
  { id: "products", label: "Products", ico: "products" },
  { id: "inventory", label: "Inventory", ico: "warehouse" },
];
const NAV_3 = [
  { id: "templates", label: "Templates", ico: "templates" },
  { id: "reports", label: "Reports", ico: "reports" },
  { id: "settings", label: "Settings", ico: "settings" },
];

function Sidebar({ page, setPage, collapsed }) {
  return (
    <aside className="sidebar" data-collapsed={collapsed}>
      <div className="sidebar-brand">
        <div className="mark">B</div>
        <div>
          <span className="name">Billd</span>
          <span className="biz">Mehta Trading Co.</span>
        </div>
      </div>

      <div className="sidebar-section">
        <div className="label">Workspace</div>
        {NAV.map(n => (
          <button key={n.id} className={`nav-item ${page === n.id ? 'active' : ''}`} onClick={() => setPage(n.id)} title={n.label}>
            <span className="ico"><Ico name={n.ico} /></span>
            <span>{n.label}</span>
            {n.badge ? <span className="badge">{n.badge}</span> : null}
          </button>
        ))}
      </div>

      <div className="sidebar-section">
        <div className="label">Contacts & catalog</div>
        {NAV_2.map(n => (
          <button key={n.id} className={`nav-item ${page === n.id ? 'active' : ''}`} onClick={() => setPage(n.id)} title={n.label}>
            <span className="ico"><Ico name={n.ico} /></span>
            <span>{n.label}</span>
            {n.badge ? <span className="badge">{n.badge}</span> : null}
          </button>
        ))}
      </div>

      <div className="sidebar-section">
        <div className="label">Manage</div>
        {NAV_3.map(n => (
          <button key={n.id} className={`nav-item ${page === n.id ? 'active' : ''}`} onClick={() => setPage(n.id)} title={n.label}>
            <span className="ico"><Ico name={n.ico} /></span>
            <span>{n.label}</span>
          </button>
        ))}
      </div>

      <div className="sidebar-foot">
        <div className="user-pill">
          <div className="av" style={{background: 'linear-gradient(135deg,#2548f5,#7c5cff)'}}>VM</div>
          <div className="who">
            <b>Vikram M.</b>
            <small>Owner · GST verified</small>
          </div>
        </div>
      </div>
    </aside>
  );
}

function Topbar({ crumbs, onSearch, right }) {
  return (
    <div className="topbar">
      <div className="crumb">
        {crumbs.map((c, i) => (
          <React.Fragment key={i}>
            {i > 0 && <Ico name="chevron-right" size={12} />}
            {i === crumbs.length - 1 ? <b>{c}</b> : <span>{c}</span>}
          </React.Fragment>
        ))}
      </div>
      <div className="search">
        <Ico name="search" size={14} />
        <input placeholder="Search invoices, customers, products…" onChange={e => onSearch?.(e.target.value)} />
        <kbd>⌘K</kbd>
      </div>
      <button className="icon-btn" title="Notifications"><Ico name="bell" size={15} /></button>
      <button className="icon-btn" title="Help"><Ico name="help" size={15} /></button>
      {right}
    </div>
  );
}

// Toast system
const ToastContext = React.createContext(null);
function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);
  const push = React.useCallback((msg, opts = {}) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(t => [...t, { id, msg, ico: opts.ico || "check" }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), opts.duration || 2400);
  }, []);
  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="toast-wrap">
        {toasts.map(t => (
          <div key={t.id} className="toast">
            <Ico name={t.ico} size={14} />
            {t.msg}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
const useToast = () => React.useContext(ToastContext);

// Helpers
const fmtINR = (n) => "₹" + (n || 0).toLocaleString('en-IN');
const fmtINRshort = (n) => {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(1) + "Cr";
  if (n >= 100000) return "₹" + (n / 100000).toFixed(1) + "L";
  if (n >= 1000) return "₹" + (n / 1000).toFixed(1) + "k";
  return "₹" + n;
};
const fmtDate = (s) => {
  const d = new Date(s);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};
const fmtDateShort = (s) => {
  const d = new Date(s);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};
const Pill = ({ status }) => <span className={`pill ${status}`}>{status}</span>;

const Avatar = ({ name, color, size = 28 }) => {
  const initials = name.split(/\s+/).map(s => s[0]).slice(0, 2).join('').toUpperCase();
  return <div className="av" style={{ background: color || '#0e1116', width: size, height: size, fontSize: size * 0.4 }}>{initials}</div>;
};

Object.assign(window, { Sidebar, Topbar, ToastProvider, useToast, fmtINR, fmtINRshort, fmtDate, fmtDateShort, Pill, Avatar });
