// AI Chat — main composer interface that drives invoice creation

const SUGGESTIONS = [
  "Invoice Lakshmi Textiles for 12 cotton bedsheets",
  "Show overdue invoices",
  "Record ₹42,300 UPI payment from Patel Hardware",
  "What's outstanding from Mehta & Sons?",
  "Create a quotation for Surya Electronics",
];

function ChatHome({ setPage }) {
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [thinking, setThinking] = React.useState(false);
  const scrollRef = React.useRef(null);
  const toast = useToast();

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, thinking]);

  const handle = async (text) => {
    if (!text.trim()) return;
    const userMsg = { role: 'user', text, id: Date.now() };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setThinking(true);

    // Heuristic responses without LLM, but also call claude.complete in background for natural ones
    setTimeout(() => {
      const reply = generateReply(text, setPage, toast);
      setMessages(m => [...m, { role: 'assistant', ...reply, id: Date.now() + 1 }]);
      setThinking(false);
    }, 700 + Math.random() * 500);
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="chat-home">
      {isEmpty ? (
        <div className="chat-hero">
          <div className="chat-hero-inner">
            <div className="hero-mark">
              <div style={{width:48, height:48, borderRadius:14, background:'var(--ink)', color:'var(--bg)', display:'grid', placeItems:'center', fontFamily:'var(--font-display)', fontSize:26, fontStyle:'italic'}}>B</div>
            </div>
            <h1 className="hero-title">Good morning, Vikram.</h1>
            <p className="hero-sub">What would you like to bill, send, or look up today?</p>

            <ChatInput value={input} setValue={setInput} onSend={handle}/>

            <div className="hero-suggestions">
              {SUGGESTIONS.map(s => (
                <button key={s} className="sugg-chip" onClick={() => handle(s)}>
                  <Ico name="arrow-right" size={12}/> {s}
                </button>
              ))}
            </div>

            <div className="hero-glance">
              <GlanceCard label="Outstanding" value={fmtINR(424100)} delta="−6.1%" tone="warn" onClick={() => setPage('invoices')}/>
              <GlanceCard label="Revenue · MTD" value={fmtINR(1380000)} delta="+18%" tone="good" onClick={() => setPage('reports')}/>
              <GlanceCard label="Due today" value="2 invoices" delta="₹1.04L" tone="accent" onClick={() => setPage('invoices')}/>
              <GlanceCard label="Low stock" value="2 items" delta="reorder" tone="bad" onClick={() => setPage('inventory')}/>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="chat-scroll" ref={scrollRef}>
            <div className="chat-thread">
              {messages.map(m => <ChatMessage key={m.id} msg={m} setPage={setPage}/>)}
              {thinking && (
                <div className="msg assistant">
                  <div className="msg-av"><Ico name="sun" size={14}/></div>
                  <div className="msg-body"><div className="thinking"><span/><span/><span/></div></div>
                </div>
              )}
            </div>
          </div>
          <div className="chat-bottom">
            <ChatInput value={input} setValue={setInput} onSend={handle}/>
          </div>
        </>
      )}
    </div>
  );
}

function ChatInput({ value, setValue, onSend }) {
  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend(value);
    }
  };
  return (
    <div className="chat-input">
      <textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={onKey}
        rows="1"
        placeholder="Ask Billd to create an invoice, record a payment, or summarize…"
      />
      <div className="chat-input-foot">
        <div className="row" style={{ gap: 4 }}>
          <button className="btn ghost sm" title="Attach"><Ico name="plus" size={13}/></button>
          <button className="btn ghost sm" title="Mention customer"><span style={{fontFamily:'var(--font-mono)', fontSize:13}}>@</span></button>
          <button className="btn ghost sm" title="Templates"><Ico name="templates" size={13}/></button>
          <span style={{fontSize:11, color:'var(--muted)', marginLeft:6}}>Try: <span className="mono">/invoice</span> · <span className="mono">/payment</span> · <span className="mono">/quote</span></span>
        </div>
        <button className="btn primary sm" onClick={() => onSend(value)} disabled={!value.trim()}>
          <Ico name="arrow-up" size={13}/> Send
        </button>
      </div>
    </div>
  );
}

function GlanceCard({ label, value, delta, tone, onClick }) {
  return (
    <button className="glance" onClick={onClick}>
      <div className="muted" style={{fontSize:11.5}}>{label}</div>
      <div className="serif" style={{fontSize:22, marginTop:2, lineHeight:1.1}}>{value}</div>
      <div style={{
        fontSize:11, fontFamily:'var(--font-mono)', marginTop:6,
        color: tone==='good'?'var(--good)':tone==='warn'?'var(--warn)':tone==='bad'?'var(--bad)':'var(--accent)'
      }}>{delta}</div>
    </button>
  );
}

function ChatMessage({ msg, setPage }) {
  if (msg.role === 'user') {
    return (
      <div className="msg user">
        <div className="msg-body"><div className="msg-text">{msg.text}</div></div>
      </div>
    );
  }
  return (
    <div className="msg assistant">
      <div className="msg-av"><Ico name="sun" size={14}/></div>
      <div className="msg-body">
        {msg.text && <div className="msg-text">{msg.text}</div>}
        {msg.card && <div style={{marginTop:10}}>{msg.card}</div>}
        {msg.actions && (
          <div className="row" style={{gap:8, marginTop:10, flexWrap:'wrap'}}>
            {msg.actions.map((a,i)=>(
              <button key={i} className={`btn sm ${a.primary?'primary':''}`} onClick={()=>{
                if (a.go) setPage(a.go);
                if (a.fn) a.fn();
              }}>
                {a.ico && <Ico name={a.ico} size={12}/>}
                {a.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ----- Reply generator -----
function generateReply(text, setPage, toast) {
  const t = text.toLowerCase();

  // INVOICE intent
  if (t.match(/invoice|bill/) && !t.match(/show|list|find/)) {
    const cust = SEED_CUSTOMERS.find(c => t.includes(c.name.toLowerCase().split(/[\s&]/)[0]));
    const customer = cust || SEED_CUSTOMERS[0];
    const qtyMatch = t.match(/(\d+)\s*(unit|pc|piece|item|sheet|hr|hour)/);
    const qty = qtyMatch ? +qtyMatch[1] : 12;
    const product = SEED_PRODUCTS.find(p => t.includes(p.name.toLowerCase().split('—')[0].trim().toLowerCase().split(' ')[0])) || SEED_PRODUCTS[0];
    const subtotal = qty * product.price;
    const tax = subtotal * product.tax / 100;
    const total = subtotal + tax;

    return {
      text: `I drafted an invoice for **${customer.name}** with ${qty} × ${product.name}. Tax inclusive total comes to ${fmtINR(total)}.`,
      card: <DraftInvoiceCard customer={customer} product={product} qty={qty} subtotal={subtotal} tax={tax} total={total}/>,
      actions: [
        { label: 'Open in editor', primary: true, ico: 'edit', go: 'create' },
        { label: 'Send now', ico: 'send', fn: () => toast('Invoice sent to ' + customer.name, { ico: 'send' }) },
        { label: 'Edit details', ico: 'edit' },
      ]
    };
  }

  // PAYMENT intent
  if (t.match(/payment|paid|received|recorded/)) {
    const amtMatch = text.match(/(?:₹|rs\.?|inr)?\s*([\d,]+)/i);
    const amt = amtMatch ? parseInt(amtMatch[1].replace(/,/g,'')) : 42300;
    const cust = SEED_CUSTOMERS.find(c => t.includes(c.name.toLowerCase().split(/[\s&]/)[0])) || SEED_CUSTOMERS[1];
    const inv = SEED_INVOICES.find(i => i.customerId === cust.id && i.amount === amt) || SEED_INVOICES.find(i => i.customerId === cust.id) || SEED_INVOICES[1];
    const mode = t.match(/upi/) ? 'UPI' : t.match(/cash/) ? 'Cash' : t.match(/cheque/) ? 'Cheque' : t.match(/card/) ? 'Card' : 'UPI';

    return {
      text: `Recording **${fmtINR(amt)}** received from **${cust.name}** via ${mode}. I'll match it to ${inv.id}.`,
      card: (
        <div className="ai-card">
          <div className="ai-card-head"><Ico name="payment" size={14}/> Payment</div>
          <div className="ai-card-body">
            <div className="ai-row"><span className="muted">From</span><span style={{fontWeight:500}}>{cust.name}</span></div>
            <div className="ai-row"><span className="muted">Invoice</span><span className="mono">{inv.id}</span></div>
            <div className="ai-row"><span className="muted">Mode</span><span>{mode}</span></div>
            <div className="ai-row" style={{borderTop:'1px solid var(--line)', paddingTop:8, marginTop:6}}><span className="muted">Amount</span><span className="serif" style={{fontSize:20, color:'var(--good)'}}>+{fmtINR(amt)}</span></div>
          </div>
        </div>
      ),
      actions: [
        { label: 'Record payment', primary: true, ico: 'check', fn: () => { toast('Payment recorded · ' + fmtINR(amt), {ico:'check'}); } },
        { label: 'Edit', ico: 'edit', go: 'payments' },
      ]
    };
  }

  // OUTSTANDING / OVERDUE
  if (t.match(/outstanding|overdue|due|owe|owing/)) {
    const overdue = SEED_INVOICES.filter(i => i.status === 'overdue');
    const totalDue = SEED_INVOICES.filter(i => ['overdue','sent','partial'].includes(i.status)).reduce((s,i)=>s+i.amount,0);
    return {
      text: `Currently **${fmtINR(totalDue)}** is outstanding across ${SEED_INVOICES.filter(i=>['overdue','sent','partial'].includes(i.status)).length} invoices. ${overdue.length} are overdue:`,
      card: (
        <div className="ai-card">
          <div className="ai-card-head"><Ico name="history" size={14}/> Overdue invoices</div>
          <table className="tbl" style={{margin:0}}>
            <tbody>
              {overdue.map(i => (
                <tr key={i.id}>
                  <td className="mono" style={{fontSize:12}}>{i.id}</td>
                  <td>{i.customer}</td>
                  <td className="muted" style={{fontSize:12}}>due {fmtDateShort(i.due)}</td>
                  <td className="num">{fmtINR(i.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
      actions: [
        { label: 'Send reminders', primary: true, ico: 'mail', fn: () => toast(`Reminders queued for ${overdue.length} customers`, {ico:'mail'}) },
        { label: 'View all', ico: 'arrow-right', go: 'invoices' },
      ]
    };
  }

  // QUOTATION
  if (t.match(/quot|estimate|proposal/)) {
    const cust = SEED_CUSTOMERS.find(c => t.includes(c.name.toLowerCase().split(/\s/)[0])) || SEED_CUSTOMERS[4];
    return {
      text: `Started a quotation draft for **${cust.name}**. Open the editor to add line items, or describe what to include.`,
      actions: [
        { label: 'Open editor', primary: true, ico: 'edit', go: 'sales' },
        { label: 'Use last template', ico: 'templates' },
      ]
    };
  }

  // CUSTOMER lookup
  if (t.match(/show|find|customer|account/)) {
    const cust = SEED_CUSTOMERS.find(c => t.includes(c.name.toLowerCase().split(/\s/)[0])) || SEED_CUSTOMERS[0];
    return {
      text: `Here's **${cust.name}** at a glance:`,
      card: (
        <div className="ai-card">
          <div className="row" style={{gap:12, padding:14, alignItems:'center'}}>
            <Avatar name={cust.name} color={cust.color} size={40}/>
            <div style={{flex:1}}>
              <div style={{fontWeight:600}}>{cust.name}</div>
              <div className="muted" style={{fontSize:12}}>{cust.contact} · {cust.city}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div className="muted" style={{fontSize:11}}>Outstanding</div>
              <div className="serif" style={{fontSize:18, color: cust.outstanding>0?'var(--warn)':'var(--ink)'}}>{fmtINR(cust.outstanding)}</div>
            </div>
          </div>
          <div className="ai-card-body" style={{borderTop:'1px solid var(--line-2)'}}>
            <div className="ai-row"><span className="muted">GSTIN</span><span className="mono">{cust.gstin}</span></div>
            <div className="ai-row"><span className="muted">Total billed (FY)</span><span className="mono">{fmtINR(cust.total)}</span></div>
            <div className="ai-row"><span className="muted">Last invoice</span><span>4 days ago</span></div>
          </div>
        </div>
      ),
      actions: [
        { label: 'New invoice', primary: true, ico: 'plus', go: 'create' },
        { label: 'View profile', ico: 'arrow-right', go: 'customers' },
      ]
    };
  }

  // GST
  if (t.match(/gst|tax|gstr/)) {
    return {
      text: `Your **GSTR-1** for April 2026 is ready to file. ₹2,12,440 in outward supplies, 38 invoices, 0 errors. Due 11 May.`,
      actions: [
        { label: 'Review filing', primary: true, ico: 'reports', go: 'reports' },
        { label: 'Download JSON', ico: 'download' },
      ]
    };
  }

  // Fallback
  return {
    text: "I can help with invoices, payments, quotations, customers, vendors, GST filings, and stock. Try one of the suggestions below or describe what you need.",
    actions: [
      { label: 'New invoice', ico: 'invoice', go: 'create' },
      { label: 'Record payment', ico: 'payment', go: 'payments' },
      { label: 'Outstanding report', ico: 'reports', go: 'reports' },
    ]
  };
}

function DraftInvoiceCard({ customer, product, qty, subtotal, tax, total }) {
  return (
    <div className="ai-card">
      <div className="ai-card-head row between">
        <span className="row" style={{gap:6}}><Ico name="invoice" size={14}/> Draft invoice <span className="mono muted" style={{fontSize:11}}>INV-2026-0149</span></span>
        <span className="pill draft">draft</span>
      </div>
      <div style={{padding:'12px 14px', borderBottom:'1px solid var(--line-2)'}}>
        <div className="row" style={{gap:10}}>
          <Avatar name={customer.name} color={customer.color} size={32}/>
          <div>
            <div style={{fontWeight:500}}>{customer.name}</div>
            <div className="muted mono" style={{fontSize:11}}>{customer.gstin}</div>
          </div>
        </div>
      </div>
      <table className="tbl" style={{margin:0, fontSize:12}}>
        <tbody>
          <tr>
            <td>{product.name}</td>
            <td className="num">{qty} × {fmtINR(product.price)}</td>
            <td className="num" style={{fontWeight:500}}>{fmtINR(subtotal)}</td>
          </tr>
        </tbody>
      </table>
      <div style={{padding:'10px 14px', borderTop:'1px solid var(--line-2)'}}>
        <div className="ai-row"><span className="muted">Subtotal</span><span className="mono">{fmtINR(subtotal)}</span></div>
        <div className="ai-row"><span className="muted">GST {product.tax}%</span><span className="mono">{fmtINR(tax)}</span></div>
        <div className="ai-row" style={{paddingTop:6, marginTop:6, borderTop:'1px solid var(--line-2)'}}>
          <span style={{fontWeight:600}}>Total</span>
          <span className="serif" style={{fontSize:20, color:'var(--accent)'}}>{fmtINR(total)}</span>
        </div>
      </div>
    </div>
  );
}

window.ChatHome = ChatHome;
