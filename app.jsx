// Main app

function App() {
  const [page, setPage] = React.useState('dashboard');
  const [template, setTemplate] = React.useState(SEED_TEMPLATES[1]);

  const tweaksDefaults = /*EDITMODE-BEGIN*/{
    "accent": "#2548f5",
    "density": "comfortable",
    "sidebar": "expanded",
    "theme": "light",
    "fontPair": "modern"
  }/*EDITMODE-END*/;
  const { values: tweaks, setTweak } = useTweaks(tweaksDefaults);

  // apply tweaks via data attributes & css vars
  React.useEffect(() => {
    document.body.setAttribute('data-density', tweaks.density);
    document.body.setAttribute('data-theme', tweaks.theme);
    document.documentElement.style.setProperty('--accent', tweaks.accent);
    // adjust accent-soft to be a tinted version of accent
    document.documentElement.style.setProperty('--accent-soft', tweaks.accent + '20');

    if (tweaks.fontPair === 'classic') {
      document.documentElement.style.setProperty('--font-sans', '"Helvetica Neue", Helvetica, Arial, sans-serif');
      document.documentElement.style.setProperty('--font-display', '"Times New Roman", serif');
    } else if (tweaks.fontPair === 'mono') {
      document.documentElement.style.setProperty('--font-sans', '"JetBrains Mono", ui-monospace, monospace');
      document.documentElement.style.setProperty('--font-display', '"JetBrains Mono", ui-monospace, monospace');
    } else {
      document.documentElement.style.setProperty('--font-sans', '"Inter Tight", "Helvetica Neue", system-ui, sans-serif');
      document.documentElement.style.setProperty('--font-display', '"Instrument Serif", serif');
    }
  }, [tweaks]);

  // ⌘K shortcut
  React.useEffect(() => {
    const h = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const el = document.querySelector('.topbar input');
        el?.focus();
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  const crumbsByPage = {
    dashboard: ['Mehta Trading', 'Ask Billd'],
    timeline: ['Mehta Trading', 'Timeline'],
    invoices: ['Mehta Trading', 'Invoices'],
    create: ['Mehta Trading', 'Invoices', 'New invoice'],
    sales: ['Mehta Trading', 'Quotations'],
    payments: ['Mehta Trading', 'Payments'],
    customers: ['Mehta Trading', 'Customers'],
    vendors: ['Mehta Trading', 'Vendors'],
    purchases: ['Mehta Trading', 'Purchases'],
    products: ['Mehta Trading', 'Products'],
    inventory: ['Mehta Trading', 'Inventory'],
    templates: ['Mehta Trading', 'Templates'],
    reports: ['Mehta Trading', 'Reports'],
    settings: ['Mehta Trading', 'Settings'],
  };

  return (
    <ToastProvider>
      <div className="app" data-sidebar={tweaks.sidebar === 'rail' ? 'rail' : ''} data-screen-label={pageLabel(page)}>
        <Sidebar page={page} setPage={setPage} collapsed={tweaks.sidebar === 'rail'}/>
        <div className="main">
          <Topbar crumbs={crumbsByPage[page]} right={
            <button className="btn accent sm" onClick={() => setPage('create')}>
              <Ico name="plus" size={13}/> New invoice
            </button>
          }/>
          {page === 'dashboard' && <ChatHome setPage={setPage}/>}
          {page === 'timeline' && <TimelinePage/>}
          {page === 'invoices' && <InvoicesList setPage={setPage}/>}
          {page === 'create' && <InvoiceCreate template={template} setPage={setPage}/>}
          {page === 'sales' && <QuotationsPage setPage={setPage}/>}
          {page === 'payments' && <PaymentsPage/>}
          {page === 'customers' && <CustomersPage/>}
          {page === 'vendors' && <VendorsPage/>}
          {page === 'purchases' && <PurchasesPage/>}
          {page === 'products' && <ProductsPage/>}
          {page === 'inventory' && <InventoryPage/>}
          {page === 'templates' && <TemplatesPage template={template} setTemplate={setTemplate}/>}
          {page === 'reports' && <ReportsPage/>}
          {page === 'settings' && <SettingsPage/>}
        </div>
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Theme">
          <TweakColor
            label="Accent color"
            value={tweaks.accent}
            onChange={v => setTweak('accent', v)}
            options={['#2548f5', '#1f8a5b', '#d4571f', '#7c5cff', '#0e1116', '#b8861b']}
          />
          <TweakRadio
            label="Mode"
            value={tweaks.theme}
            onChange={v => setTweak('theme', v)}
            options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]}
          />
          <TweakSelect
            label="Font pairing"
            value={tweaks.fontPair}
            onChange={v => setTweak('fontPair', v)}
            options={[
              { value: 'modern', label: 'Inter + Instrument Serif' },
              { value: 'classic', label: 'Helvetica + Times' },
              { value: 'mono', label: 'JetBrains Mono only' },
            ]}
          />
        </TweakSection>

        <TweakSection title="Layout">
          <TweakRadio
            label="Density"
            value={tweaks.density}
            onChange={v => setTweak('density', v)}
            options={[{ value: 'comfortable', label: 'Comfort' }, { value: 'compact', label: 'Compact' }]}
          />
          <TweakRadio
            label="Sidebar"
            value={tweaks.sidebar}
            onChange={v => setTweak('sidebar', v)}
            options={[{ value: 'expanded', label: 'Expanded' }, { value: 'rail', label: 'Rail' }]}
          />
        </TweakSection>

        <TweakSection title="Invoice template">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {SEED_TEMPLATES.map(t => (
              <button key={t.id} onClick={() => setTemplate(t)} style={{
                padding: 8, border: template.id === t.id ? '2px solid var(--accent)' : '1px solid var(--line)',
                borderRadius: 8, background: 'var(--surface)', cursor: 'pointer', textAlign: 'left'
              }}>
                <div style={{ aspectRatio: '8.5 / 11', background: 'white', borderRadius: 4, marginBottom: 6, overflow: 'hidden' }}>
                  <TemplateThumbnail template={t}/>
                </div>
                <div style={{ fontSize: 11.5, fontWeight: 500 }}>{t.name}</div>
              </button>
            ))}
          </div>
        </TweakSection>
      </TweaksPanel>
    </ToastProvider>
  );
}

function pageLabel(p) {
  const map = {
    dashboard: '01 Ask Billd', timeline: '02 Timeline', invoices: '03 Invoices', create: '04 Invoice create',
    sales: '05 Quotations', payments: '06 Payments', customers: '07 Customers', vendors: '08 Vendors',
    purchases: '09 Purchases', products: '10 Products', inventory: '11 Inventory',
    templates: '12 Templates', reports: '13 Reports', settings: '14 Settings'
  };
  return map[p] || p;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
