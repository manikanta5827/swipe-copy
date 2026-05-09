// Tiny inline icon set (stroke-based, 16px default)
const Ico = ({ name, size = 16, stroke = 1.6 }) => {
  const props = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: stroke,
    strokeLinecap: "round", strokeLinejoin: "round"
  };
  switch (name) {
    case "dashboard": return <svg {...props}><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>;
    case "invoice": return <svg {...props}><path d="M6 3h9l4 4v14a0 0 0 0 1 0 0H6a0 0 0 0 1 0 0V3z"/><path d="M14 3v5h5"/><path d="M9 13h7M9 17h5"/></svg>;
    case "sales": return <svg {...props}><path d="M3 3h4l3 14h11"/><path d="M7 8h13l-1.5 7H8.5"/><circle cx="11" cy="20" r="1.2"/><circle cx="18" cy="20" r="1.2"/></svg>;
    case "payment": return <svg {...props}><rect x="2" y="6" width="20" height="13" rx="2"/><path d="M2 10h20"/><path d="M6 15h3"/></svg>;
    case "customers": return <svg {...props}><circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6"/><circle cx="17" cy="6" r="2.5"/><path d="M16.5 13c2.6 0 5 1.7 5.5 4"/></svg>;
    case "products": return <svg {...props}><path d="M3 7l9-4 9 4v10l-9 4-9-4V7z"/><path d="M3 7l9 4 9-4M12 11v10"/></svg>;
    case "templates": return <svg {...props}><rect x="3" y="3" width="7" height="18"/><rect x="14" y="3" width="7" height="9"/><rect x="14" y="16" width="7" height="5"/></svg>;
    case "reports": return <svg {...props}><path d="M3 21h18"/><rect x="5" y="11" width="3" height="8"/><rect x="11" y="6" width="3" height="13"/><rect x="17" y="14" width="3" height="5"/></svg>;
    case "settings": return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>;
    case "search": return <svg {...props}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case "plus": return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>;
    case "chevron-right": return <svg {...props}><path d="m9 6 6 6-6 6"/></svg>;
    case "chevron-down": return <svg {...props}><path d="m6 9 6 6 6-6"/></svg>;
    case "trash": return <svg {...props}><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>;
    case "download": return <svg {...props}><path d="M12 3v12m0 0-4-4m4 4 4-4M3 21h18"/></svg>;
    case "send": return <svg {...props}><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>;
    case "print": return <svg {...props}><path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>;
    case "filter": return <svg {...props}><path d="M3 5h18l-7 9v6l-4-2v-4L3 5z"/></svg>;
    case "more": return <svg {...props}><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>;
    case "bell": return <svg {...props}><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>;
    case "help": return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>;
    case "arrow-up": return <svg {...props}><path d="M12 19V5M5 12l7-7 7 7"/></svg>;
    case "arrow-down": return <svg {...props}><path d="M12 5v14M19 12l-7 7-7-7"/></svg>;
    case "arrow-right": return <svg {...props}><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
    case "check": return <svg {...props}><path d="m5 12 5 5 9-11"/></svg>;
    case "x": return <svg {...props}><path d="M18 6 6 18M6 6l12 12"/></svg>;
    case "edit": return <svg {...props}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
    case "copy": return <svg {...props}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>;
    case "share": return <svg {...props}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>;
    case "calendar": return <svg {...props}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>;
    case "tag": return <svg {...props}><path d="M20 12 12 20l-9-9V3h8z"/><circle cx="7" cy="7" r="1.2"/></svg>;
    case "phone": return <svg {...props}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>;
    case "mail": return <svg {...props}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>;
    case "credit": return <svg {...props}><rect x="2" y="6" width="20" height="13" rx="2"/><path d="M2 10h20"/></svg>;
    case "upi": return <svg {...props}><path d="M7 3v18M17 3v18M3 8h18M3 16h18"/></svg>;
    case "sun": return <svg {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>;
    case "moon": return <svg {...props}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>;
    case "panel": return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/></svg>;
    case "logout": return <svg {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>;
    case "warehouse": return <svg {...props}><path d="M3 21V8l9-5 9 5v13"/><path d="M7 21v-9h10v9"/><path d="M9 14h6"/></svg>;
    case "history": return <svg {...props}><path d="M3 3v6h6"/><path d="M3.5 9A9 9 0 1 1 3 12"/><path d="M12 7v5l3 2"/></svg>;
    case "drag": return <svg {...props}><circle cx="9" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="18" r="1"/></svg>;
    default: return <svg {...props}><circle cx="12" cy="12" r="9"/></svg>;
  }
};

window.Ico = Ico;
