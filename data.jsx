// Demo data for the prototype

const SEED_INVOICES = [
  { id: "INV-2026-0148", customer: "Lakshmi Textiles", customerId: "c1", date: "2026-05-04", due: "2026-05-19", amount: 184500, status: "sent", items: 8 },
  { id: "INV-2026-0147", customer: "Patel Hardware Co.", customerId: "c2", date: "2026-05-03", due: "2026-05-18", amount: 42300, status: "paid", items: 3 },
  { id: "INV-2026-0146", customer: "Greenleaf Organics", customerId: "c3", date: "2026-05-02", due: "2026-05-17", amount: 12860, status: "paid", items: 2 },
  { id: "INV-2026-0145", customer: "Mehta & Sons", customerId: "c4", date: "2026-04-28", due: "2026-05-13", amount: 96400, status: "overdue", items: 5 },
  { id: "INV-2026-0144", customer: "Surya Electronics", customerId: "c5", date: "2026-04-26", due: "2026-05-11", amount: 215600, status: "partial", items: 12 },
  { id: "INV-2026-0143", customer: "Bombay Press Works", customerId: "c6", date: "2026-04-24", due: "2026-05-09", amount: 7800, status: "draft", items: 1 },
  { id: "INV-2026-0142", customer: "Anand Pharma", customerId: "c7", date: "2026-04-22", due: "2026-05-07", amount: 53200, status: "paid", items: 6 },
  { id: "INV-2026-0141", customer: "Kavita Designs Studio", customerId: "c8", date: "2026-04-20", due: "2026-05-05", amount: 28000, status: "overdue", items: 2 },
  { id: "INV-2026-0140", customer: "TechBridge Solutions", customerId: "c9", date: "2026-04-18", due: "2026-05-03", amount: 134000, status: "paid", items: 4 },
  { id: "INV-2026-0139", customer: "Ravi Auto Spares", customerId: "c10", date: "2026-04-15", due: "2026-04-30", amount: 8650, status: "paid", items: 2 },
];

const SEED_CUSTOMERS = [
  { id: "c1", name: "Lakshmi Textiles", contact: "Priya Iyer", phone: "+91 98203 41122", email: "priya@lakshmi.in", city: "Surat", gstin: "24AABCL3389K1Z8", outstanding: 184500, total: 1240000, color: "#2548f5" },
  { id: "c2", name: "Patel Hardware Co.", contact: "Rohan Patel", phone: "+91 98765 43210", email: "rohan@patelhw.com", city: "Ahmedabad", gstin: "24AAACP4567K1Z2", outstanding: 0, total: 380400, color: "#1f8a5b" },
  { id: "c3", name: "Greenleaf Organics", contact: "Aisha Khan", phone: "+91 99876 11122", email: "hello@greenleaf.in", city: "Bengaluru", gstin: "29AAACG2233K1Z9", outstanding: 0, total: 86200, color: "#d4571f" },
  { id: "c4", name: "Mehta & Sons", contact: "Vikram Mehta", phone: "+91 98101 22334", email: "vikram@mehtasons.in", city: "Mumbai", gstin: "27AABCM6677K1Z4", outstanding: 96400, total: 540900, color: "#7c5cff" },
  { id: "c5", name: "Surya Electronics", contact: "Nikhil Surya", phone: "+91 90080 90080", email: "nikhil@suryael.com", city: "Chennai", gstin: "33AAACS9911K1Z3", outstanding: 107800, total: 1875000, color: "#b8861b" },
  { id: "c6", name: "Bombay Press Works", contact: "Ishaan Sheth", phone: "+91 91234 56789", email: "ishaan@bpw.in", city: "Mumbai", gstin: "27AAACB1100K1Z6", outstanding: 7800, total: 124600, color: "#1a1a1a" },
  { id: "c7", name: "Anand Pharma", contact: "Dr. Anand R.", phone: "+91 99887 76655", email: "ar@anandpharma.in", city: "Hyderabad", gstin: "36AAACA3344K1Z1", outstanding: 0, total: 412000, color: "#1f8a5b" },
  { id: "c8", name: "Kavita Designs Studio", contact: "Kavita Reddy", phone: "+91 98452 11000", email: "k@kavitastudio.in", city: "Bengaluru", gstin: "29AAACK5566K1Z7", outstanding: 28000, total: 78000, color: "#d4571f" },
  { id: "c9", name: "TechBridge Solutions", contact: "Arjun Nair", phone: "+91 99000 88110", email: "arjun@techbridge.io", city: "Pune", gstin: "27AAACT7788K1Z2", outstanding: 0, total: 1340000, color: "#2548f5" },
  { id: "c10", name: "Ravi Auto Spares", contact: "Ravi Kumar", phone: "+91 90909 80808", email: "ravi@autospares.in", city: "Coimbatore", gstin: "33AAACR8899K1Z8", outstanding: 0, total: 56400, color: "#7c5cff" },
];

const SEED_PRODUCTS = [
  { id: "p1", name: "Cotton Bedsheet — Queen", sku: "CBS-Q-WHT", hsn: "6302", price: 1450, stock: 124, unit: "pcs", tax: 5, category: "Textiles" },
  { id: "p2", name: "Steel Door Hinge 4\"", sku: "SDH-4-SS", hsn: "8302", price: 89, stock: 2400, unit: "pcs", tax: 18, category: "Hardware" },
  { id: "p3", name: "Organic Turmeric Powder 500g", sku: "OTP-500", hsn: "0910", price: 320, stock: 86, unit: "pkt", tax: 5, category: "Food" },
  { id: "p4", name: "LED Panel Light 24W", sku: "LED-24W-CW", hsn: "9405", price: 680, stock: 410, unit: "pcs", tax: 18, category: "Electronics" },
  { id: "p5", name: "Web Design — Hourly", sku: "SVC-WEB-HR", hsn: "9983", price: 1500, stock: null, unit: "hr", tax: 18, category: "Services" },
  { id: "p6", name: "Brass Handle 6\"", sku: "BH-6-AB", hsn: "8302", price: 245, stock: 38, unit: "pcs", tax: 18, category: "Hardware" },
  { id: "p7", name: "Cardamom Whole 100g", sku: "CW-100", hsn: "0908", price: 480, stock: 12, unit: "pkt", tax: 5, category: "Food" },
  { id: "p8", name: "Cotton Pillow Cover (set of 2)", sku: "CPC-2-NT", hsn: "6304", price: 540, stock: 0, unit: "set", tax: 5, category: "Textiles" },
];

const SEED_PAYMENTS = [
  { id: "PAY-3081", customer: "Patel Hardware Co.", customerId: "c2", invoice: "INV-2026-0147", amount: 42300, mode: "UPI", date: "2026-05-04", ref: "ICI/304488112", status: "settled" },
  { id: "PAY-3080", customer: "Greenleaf Organics", customerId: "c3", invoice: "INV-2026-0146", amount: 12860, mode: "UPI", date: "2026-05-02", ref: "AXI/919288120", status: "settled" },
  { id: "PAY-3079", customer: "Surya Electronics", customerId: "c5", invoice: "INV-2026-0144", amount: 107800, mode: "Bank transfer", date: "2026-04-30", ref: "NEFT/N04488", status: "settled" },
  { id: "PAY-3078", customer: "Anand Pharma", customerId: "c7", invoice: "INV-2026-0142", amount: 53200, mode: "Card", date: "2026-04-23", ref: "RZP/pay_PqXxKxx", status: "settled" },
  { id: "PAY-3077", customer: "TechBridge Solutions", customerId: "c9", invoice: "INV-2026-0140", amount: 134000, mode: "Bank transfer", date: "2026-04-19", ref: "RTGS/R09921", status: "settled" },
  { id: "PAY-3076", customer: "Ravi Auto Spares", customerId: "c10", invoice: "INV-2026-0139", amount: 8650, mode: "Cash", date: "2026-04-15", ref: "—", status: "settled" },
];

const SEED_QUOTATIONS = [
  { id: "QT-2026-0042", customer: "Lakshmi Textiles", date: "2026-05-04", expires: "2026-05-19", amount: 245000, status: "sent", items: 6 },
  { id: "QT-2026-0041", customer: "Mehta & Sons", date: "2026-05-02", expires: "2026-05-17", amount: 89400, status: "accepted", items: 4 },
  { id: "QT-2026-0040", customer: "Bombay Press Works", date: "2026-04-30", expires: "2026-05-15", amount: 12300, status: "draft", items: 2 },
  { id: "QT-2026-0039", customer: "Kavita Designs Studio", date: "2026-04-28", expires: "2026-05-13", amount: 64000, status: "rejected", items: 3 },
  { id: "QT-2026-0038", customer: "Anand Pharma", date: "2026-04-25", expires: "2026-05-10", amount: 156800, status: "accepted", items: 8 },
];

const SEED_TEMPLATES = [
  { id: "t1", name: "Classic Ledger", style: "Serif heading, double-rule, traditional Indian invoice feel", accent: "#0e1116", layout: "classic" },
  { id: "t2", name: "Modern Mono", style: "Spacious, sans-serif, generous whitespace", accent: "#2548f5", layout: "modern" },
  { id: "t3", name: "Compact Pro", style: "Dense, fits 30+ items on one page", accent: "#1f8a5b", layout: "compact" },
  { id: "t4", name: "Boutique", style: "Display serif logo lockup, color block header", accent: "#d4571f", layout: "boutique" },
  { id: "t5", name: "GST Tax Invoice", style: "All required GST fields, HSN/SAC, IRN-ready", accent: "#7c5cff", layout: "gst" },
  { id: "t6", name: "Minimal Receipt", style: "For quick cash sales, thermal-printer friendly", accent: "#1a1a1a", layout: "minimal" },
];

// Sparkline path generator
function sparkPath(values, w, h) {
  const max = Math.max(...values), min = Math.min(...values);
  const range = max - min || 1;
  return values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
}

const REVENUE_SERIES = [62, 71, 58, 84, 92, 76, 105, 98, 112, 124, 118, 138];
const INVOICE_SERIES = [12, 18, 14, 22, 20, 19, 28, 24, 31, 35, 30, 38];
const COLLECTIONS_SERIES = [55, 68, 51, 79, 88, 70, 99, 91, 108, 116, 110, 132];

Object.assign(window, {
  SEED_INVOICES, SEED_CUSTOMERS, SEED_PRODUCTS, SEED_PAYMENTS, SEED_QUOTATIONS, SEED_TEMPLATES,
  REVENUE_SERIES, INVOICE_SERIES, COLLECTIONS_SERIES, sparkPath
});
