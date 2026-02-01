
import { Order, Invoice, AccessLog, OrderStatus, AdminStats, DownloadLink, PayPalSettings, InvoiceAuditTrail } from '../types';
import { PRODUCTS } from '../constants';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Helper for Random IPs
const getRandomIP = () => {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
};

const DEVICE_SIGNATURES = [
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/17C54 Safari/605.1.15",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 16_7_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.7.2 Mobile/15G77 Safari/605.1.15",
  "Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36",
  "Mozilla/5.0 (Linux; Android 13; Pixel 7a Build/TQ3A.230705.001) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
  "Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.6668.101 Mobile Safari/537.36",
  "Mozilla/5.0 (Linux; Android 14; SM-F946B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.91 Mobile Safari/537.36",
  "Mozilla/5.0 (iPad; CPU OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/17B84 Safari/605.1.15",
  "Mozilla/5.0 (Linux; Android 13; OnePlus 11) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
  "Mozilla/5.0 (Linux; Android 14; Xiaomi 14 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36",
  "Mozilla/5.0 (Linux; HarmonyOS 3.1; HUAWEI P60 Pro) AppleWebKit/537.36 (KHTML, like Gecko) HuaweiBrowser/14.0.0 Mobile Safari/537.36"
];

// Helper for Random Device Sig
const getRandomDeviceSig = () => {
  return DEVICE_SIGNATURES[Math.floor(Math.random() * DEVICE_SIGNATURES.length)];
};

// --- PERSISTENCE HELPERS ---
const load = <T>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

const save = () => {
  try {
    localStorage.setItem('ts_orders', JSON.stringify(orders));
    localStorage.setItem('ts_invoices', JSON.stringify(invoices));
    localStorage.setItem('ts_links', JSON.stringify(downloadLinks));
    localStorage.setItem('ts_logs', JSON.stringify(logs));
    localStorage.setItem('ts_settings', JSON.stringify(payPalSettings));
  } catch (e) {
    console.error("Failed to save state", e);
  }
};

// --- DEFAULT SEED DATA ---
const DEFAULT_ORDERS: Order[] = [
  {
    id: 'ord_123',
    status: OrderStatus.COMPLETED,
    productId: 'prod_4',
    productName: 'Institutional Playbook',
    customerName: 'Marcus Aurelius',
    customerEmail: 'marcus@rome.com',
    amount: 1000,
    currency: 'EUR',
    tax: 200,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    notes: 'VIP Client',
    paymentMethod: 'PAYPAL',
    transactionId: 'PAY-882731',
    billingAddress: 'Palatine Hill 1\nRome, Empire',
    billingCountry: 'Italy'
  },
  {
    id: 'ord_124',
    status: OrderStatus.PENDING,
    productId: 'prod_2',
    productName: 'The Prop Challenge Manual',
    customerName: 'Lucius Verus',
    customerEmail: 'lucius@rome.com',
    amount: 250,
    currency: 'EUR',
    tax: 50,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    notes: '',
    paymentMethod: 'MANUAL'
  }
];

const DEFAULT_INVOICES: Invoice[] = [
  {
    id: 'inv_001',
    orderId: 'ord_123',
    invoiceNumber: 'TS-2024-0001',
    issueDate: new Date().toISOString(),
    subtotal: 1000,
    tax: 200,
    total: 1200,
    currency: 'EUR',
    status: 'PAID',
    billTo: {
      name: 'Marcus Aurelius',
      email: 'marcus@rome.com',
      address: 'Palatine Hill 1\nRome, Empire',
      country: 'Italy'
    },
    pdfUrl: '#'
  }
];

const DEFAULT_LINKS: DownloadLink[] = [
  {
    id: 'dl_1',
    orderId: 'ord_123',
    productName: 'Institutional Playbook',
    key: 'sec_829102',
    expiresAt: new Date(Date.now() + 86400000 * 30).toISOString(),
    maxDownloads: 5,
    downloadCount: 1,
    isActive: true,
    createdAt: new Date(Date.now() - 86400000 * 2 + 3600000).toISOString()
  }
];

const DEFAULT_LOGS: AccessLog[] = [
  {
    id: 'log_1',
    linkId: 'dl_1',
    resource: 'Institutional Playbook PDF',
    timestamp: new Date().toISOString(),
    ip: getRandomIP(),
    deviceSig: getRandomDeviceSig()
  }
];

const DEFAULT_SETTINGS: PayPalSettings = {
  enabled: true,
  mode: 'LIVE',
  clientId: 'Ad72enTRhPYbFneo4seAs852HeZPDoQzq3Udytfzv9cUms6rLy7kXdXkJDxRrFZ0J9mVKw1EJU14vtnd',
  clientSecret: 'ED4VOqbnqFp5O6KDotBUkF9ZqDupUNc8XwXJ2vJLemvQkIUbOZPnWHvbXPQHJGBsHtHcYnrrTpcPKsqb'
};

// --- INITIALIZE STATE FROM STORAGE OR DEFAULTS ---
let orders: Order[] = load('ts_orders', DEFAULT_ORDERS);
let invoices: Invoice[] = load('ts_invoices', DEFAULT_INVOICES);
let downloadLinks: DownloadLink[] = load('ts_links', DEFAULT_LINKS);
let logs: AccessLog[] = load('ts_logs', DEFAULT_LOGS);
let payPalSettings: PayPalSettings = load('ts_settings_v2', DEFAULT_SETTINGS);


export const MockBackend = {
  getOrders: async (): Promise<Order[]> => {
    return new Promise(resolve => setTimeout(() => resolve([...orders]), 500));
  },

  createOrder: async (
    productId: string,
    name: string,
    email: string,
    paymentMethod: 'PAYPAL' | 'MANUAL' | 'INVOICE' = 'MANUAL',
    status: OrderStatus = OrderStatus.PENDING,
    address?: string,
    country?: string,
    createdAt?: string,
    accessTime?: string
  ): Promise<Order> => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) throw new Error("Product not found");

    const orderDate = createdAt || new Date().toISOString();

    const newOrder: Order = {
      id: `ord_${Math.random().toString(36).substr(2, 9)}`,
      status: status,
      productId,
      productName: product.name,
      customerName: name,
      customerEmail: email,
      amount: product.price,
      currency: 'EUR',
      tax: product.price * 0.20, // 20% VAT simulation
      createdAt: orderDate,
      paymentMethod,
      transactionId: paymentMethod === 'PAYPAL' ? `PAY-${Math.random().toString(36).substr(2, 6).toUpperCase()}` : undefined,
      billingAddress: address,
      billingCountry: country
    };
    orders = [newOrder, ...orders];

    // Auto-create download link if completed or downloaded
    if (status === OrderStatus.COMPLETED || status === OrderStatus.DOWNLOADED) {
      // Use custom access time or order creation time to ensure invoice date matches download date
      const linkTime = accessTime || orderDate;

      const newLink: DownloadLink = {
        id: `dl_${Math.random().toString(36).substr(2, 6)}`,
        orderId: newOrder.id,
        productName: newOrder.productName,
        key: Math.random().toString(36).substr(2, 12),
        expiresAt: new Date(new Date(linkTime).getTime() + 86400000 * 30).toISOString(),
        maxDownloads: 5,
        downloadCount: 0,
        isActive: true,
        createdAt: linkTime
      };
      downloadLinks.push(newLink);

      // Always generate a log for COMPLETED status to ensure Audit Trail is visible immediately
      // Uses random device signature from the curated list
      logs.push({
        id: `log_${Math.random().toString(36).substr(2, 6)}`,
        linkId: newLink.id,
        resource: `${product.name} PDF`,
        timestamp: linkTime, // Match the requested access time
        ip: getRandomIP(), // Unique IP
        deviceSig: getRandomDeviceSig() // Random Mixed Device Signature
      });
      newLink.downloadCount = 1;
    }

    save(); // Persist
    return new Promise(resolve => setTimeout(() => resolve(newOrder), 800));
  },

  updateOrder: async (orderId: string, updates: Partial<Order>): Promise<Order> => {
    orders = orders.map(o => o.id === orderId ? { ...o, ...updates } : o);
    save(); // Persist
    return new Promise(resolve => setTimeout(() => resolve(orders.find(o => o.id === orderId)!), 400));
  },

  getStats: async (): Promise<AdminStats> => {
    const totalRevenue = orders.reduce((acc, curr) => curr.status === OrderStatus.COMPLETED ? acc + curr.amount : acc, 0);
    return {
      totalRevenue,
      totalOrders: orders.length,
      activeUsers: 142, // Mock
      conversionRate: 3.4 // Mock
    };
  },

  getInvoices: async (): Promise<Invoice[]> => {
    return new Promise(resolve => setTimeout(() => resolve([...invoices]), 400));
  },

  // NEW: Fetch or Create Draft Invoice for Edit Modal
  getInvoiceByOrderId: async (orderId: string): Promise<Invoice> => {
    return new Promise(resolve => setTimeout(() => {
      const existing = invoices.find(i => i.orderId === orderId);
      if (existing) {
        resolve({ ...existing });
        return;
      }

      const order = orders.find(o => o.id === orderId);
      if (!order) throw new Error("Order not found");

      const draft: Invoice = {
        id: `inv_draft_${Date.now()}`,
        orderId: order.id,
        invoiceNumber: `TS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        issueDate: order.createdAt, // Match Order Date
        subtotal: order.amount,
        tax: order.tax,
        total: order.amount + order.tax,
        currency: order.currency,
        status: 'PAID',
        billTo: {
          name: order.customerName,
          email: order.customerEmail,
          address: order.billingAddress, // Pre-fill from Order
          country: order.billingCountry  // Pre-fill from Order
        },
        pdfUrl: '#'
      };
      resolve(draft);
    }, 300));
  },

  // NEW: Update Invoice with Validation
  updateInvoice: async (invoice: Invoice): Promise<Invoice> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Uniqueness Check
        const duplicate = invoices.find(i => i.invoiceNumber === invoice.invoiceNumber && i.id !== invoice.id);
        if (duplicate) {
          reject(new Error("Invoice number already exists."));
          return;
        }

        // Update or Create
        const index = invoices.findIndex(i => i.id === invoice.id);
        if (index >= 0) {
          invoices[index] = invoice;
        } else {
          invoices.push(invoice);
        }
        save(); // Persist
        resolve(invoice);
      }, 600);
    });
  },

  // NEW: Prepare PDF Data (Audit Trail)
  generateInvoicePdfData: async (invoiceId: string): Promise<Invoice> => {
    const invoice = invoices.find(i => i.id === invoiceId);
    if (!invoice) throw new Error("Invoice not found");

    // Find audit trail
    const link = downloadLinks.find(d => d.orderId === invoice.orderId);
    const accessLog = link ? logs.find(l => l.linkId === link.id) : undefined;

    const auditTrail: InvoiceAuditTrail = {
      deliveryStatus: accessLog ? 'DOWNLOADED' : 'PENDING',
      linkId: link?.id || '—',
      sentTimestamp: link?.createdAt || '—',
      accessIp: accessLog?.ip || '—',
      accessTime: accessLog?.timestamp || '—',
      deviceSig: accessLog?.deviceSig || '—',
      isSandbox: payPalSettings.mode === 'SANDBOX'
    };

    return { ...invoice, auditTrail };
  },

  // Generates real PDF Blob using jsPDF
  generateInvoicePDFBlob: async (invoiceId: string): Promise<Blob> => {
    // 1. Fetch Data
    const invoiceData = await MockBackend.generateInvoicePdfData(invoiceId);
    const invoice = invoiceData; // has auditTrail populated
    const audit = invoice.auditTrail!;

    // 2. Setup PDF
    const doc = new jsPDF();
    const brandNavy: [number, number, number] = [15, 23, 42];
    const brandTeal: [number, number, number] = [20, 184, 166];
    const slateGray: [number, number, number] = [100, 116, 139];

    // 3. Header
    // Brand
    doc.setFont('times', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(...brandNavy);
    doc.text("Trade Playbooks™", 20, 20);

    // Address (Left)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...slateGray);
    doc.text("Comprehensive Market Systems", 20, 28);
    doc.text("Stocks & Crypto Division", 20, 33);
    doc.text("VAT: IE 1234567T", 20, 38);
    doc.text("web: tradeplaybooks.com", 20, 43);

    // Invoice Meta (Right)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(...brandNavy);
    doc.text("INVOICE", 190, 20, { align: 'right' });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);

    const metaX = 190;
    let metaY = 30;
    const lineHeight = 5;

    doc.text(`Invoice #: ${invoice.invoiceNumber}`, metaX, metaY, { align: 'right' });
    metaY += lineHeight;
    doc.text(`Date: ${new Date(invoice.issueDate).toLocaleDateString()}`, metaX, metaY, { align: 'right' });
    metaY += lineHeight;
    doc.text(`Status: ${invoice.status}`, metaX, metaY, { align: 'right' });

    // Divider
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.line(20, 50, 190, 50);

    // 4. Bill To
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...brandTeal);
    doc.text("Bill To:", 20, 65);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text(invoice.billTo.name, 20, 72);
    doc.text(invoice.billTo.email, 20, 77);

    const addressLines = doc.splitTextToSize(invoice.billTo.address || '', 80);
    doc.text(addressLines, 20, 82);

    const countryY = 82 + (addressLines.length * 5);
    if (invoice.billTo.country) {
      doc.text(invoice.billTo.country, 20, countryY);
    }

    // 5. Table
    const tableStartY = Math.max(countryY + 10, 100);

    // Determine Product Name (find order to get product name)
    const order = orders.find(o => o.id === invoice.orderId);
    const description = order ? order.productName : "Trade Playbooks System";

    autoTable(doc, {
      startY: tableStartY,
      head: [['Item Description', 'Type', 'Qty', 'Price']],
      body: [
        [description, 'Digital License', '1', `€${invoice.subtotal.toFixed(2)}`]
      ],
      theme: 'grid',
      styles: {
        font: 'helvetica',
        fontSize: 9,
        cellPadding: 6,
        textColor: [51, 65, 85], // slate-700
        lineColor: [226, 232, 240], // slate-200
        lineWidth: 0.1
      },
      headStyles: {
        fillColor: [15, 23, 42], // brand-navy
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 10
      },
      columnStyles: {
        0: { cellWidth: 90 },
        3: { halign: 'right', fontStyle: 'bold' }
      }
    });

    // 6. Totals
    // @ts-ignore
    let finalY = doc.lastAutoTable.finalY + 12;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...slateGray);
    doc.text(`Subtotal:`, 140, finalY, { align: 'right' });
    doc.setTextColor(15, 23, 42);
    doc.text(`€${invoice.subtotal.toFixed(2)}`, 190, finalY, { align: 'right' });

    finalY += 7;
    doc.setTextColor(...slateGray);
    doc.text(`VAT (20%):`, 140, finalY, { align: 'right' });
    doc.setTextColor(15, 23, 42);
    doc.text(`€${invoice.tax.toFixed(2)}`, 190, finalY, { align: 'right' });

    finalY += 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text(`Total Amount:`, 140, finalY, { align: 'right' });
    doc.setTextColor(...brandTeal);
    doc.text(`€${invoice.total.toFixed(2)}`, 190, finalY, { align: 'right' });

    finalY += 12;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(...slateGray);
    doc.text("Systematic Trading Education. Non-tangible digital goods.", 105, finalY, { align: 'center' });

    // 7. Audit Trail Box
    finalY += 15;

    // Calculate Box Height based on wrapped device signature
    const maxWidth = 100; // Text width allowed for values
    const sigText = audit.deviceSig !== '—' ? audit.deviceSig : '—';
    const sigLines = doc.splitTextToSize(sigText, maxWidth);

    // Content layout metrics
    const contentStartOffset = 8;
    const contentLineHeight = 5;
    const standardLinesCount = 5; // Status, Link, SentTime, IP, AccessTime
    const boxHeight = 10 + contentStartOffset + (standardLinesCount * contentLineHeight) + (sigLines.length * contentLineHeight) + 5;

    // Box Background
    doc.setFillColor(248, 250, 252); // slate-50
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.roundedRect(20, finalY, 170, boxHeight, 3, 3, 'FD');

    // Box Title
    const auditTitleY = finalY + 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...brandNavy);
    let title = "DIGITAL DELIVERY AUDIT TRAIL";
    doc.text(title, 25, auditTitleY);

    // Box Content
    doc.setFont('courier', 'normal');
    doc.setFontSize(7);

    const labels = [
      "Status:",
      "License Key:",
      "Issue Date:",
      "Gateway IP:",
      "Access Time:",
      "Client Signature:"
    ];

    // Format timestamps: Sent = Date only, Access = Full
    const sentTimeStr = audit.sentTimestamp !== '—' ? audit.sentTimestamp.split('T')[0] : '—';
    const accessTimeStr = audit.accessTime !== '—' ? audit.accessTime.replace('T', ' ').split('.')[0] + ' UTC' : '—';

    const values = [
      audit.deliveryStatus,
      audit.linkId,
      sentTimeStr,
      audit.accessIp,
      accessTimeStr,
      // Signature handled separately for wrapping
    ];

    let contentY = auditTitleY + 8;

    // Print first 5 items
    for (let i = 0; i < 5; i++) {
      doc.setTextColor(148, 163, 184); // slate-400
      doc.text(labels[i], 25, contentY);

      if (i === 0 && audit.deliveryStatus === 'DOWNLOADED') {
        doc.setTextColor(20, 184, 166); // brand-teal (success)
      } else {
        doc.setTextColor(51, 65, 85); // slate-700
      }
      doc.text(values[i], 60, contentY);
      contentY += 4;
    }

    // Print Device Signature (Wrapped)
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text(labels[5], 25, contentY);
    doc.setTextColor(51, 65, 85); // slate-700
    doc.text(sigLines, 60, contentY);

    // 8. Footer
    const pageHeight = doc.internal.pageSize.height;
    doc.setDrawColor(241, 245, 249); // slate-100
    doc.line(20, pageHeight - 20, 190, pageHeight - 20);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text("Digital product access is limited to the purchaser only. Licensing is non-transferable.", 105, pageHeight - 15, { align: 'center' });
    doc.text("© 2026 Trade Playbooks™ — tradeplaybooks.com", 105, pageHeight - 10, { align: 'center' });

    return doc.output('blob');
  },

  generateInvoice: async (orderId: string): Promise<Invoice> => {
    const order = orders.find(o => o.id === orderId);
    if (!order) throw new Error("Order not found");

    const newInvoice: Invoice = {
      id: `inv_${Math.random().toString(36).substr(2, 9)}`,
      orderId,
      invoiceNumber: `TS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      issueDate: new Date().toISOString(),
      subtotal: order.amount,
      tax: order.tax,
      total: order.amount + order.tax,
      currency: order.currency,
      status: 'PAID',
      billTo: { name: order.customerName, email: order.customerEmail },
      pdfUrl: '#'
    };
    invoices = [newInvoice, ...invoices];
    save(); // Persist
    return new Promise(resolve => setTimeout(() => resolve(newInvoice), 1000));
  },

  getLogs: async (): Promise<AccessLog[]> => {
    return new Promise(resolve => setTimeout(() => resolve([...logs]), 300));
  },

  getDownloadLinks: async (): Promise<DownloadLink[]> => {
    return new Promise(resolve => setTimeout(() => resolve([...downloadLinks]), 300));
  },

  createDownloadLink: async (orderId: string): Promise<DownloadLink> => {
    const order = orders.find(o => o.id === orderId);
    if (!order) throw new Error("Order not found");

    const newLink: DownloadLink = {
      id: `dl_${Math.random().toString(36).substr(2, 6)}`,
      orderId: order.id,
      productName: order.productName,
      key: Math.random().toString(36).substr(2, 12),
      expiresAt: new Date(Date.now() + 86400000 * 30).toISOString(), // 30 days
      maxDownloads: 5,
      downloadCount: 0,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    downloadLinks = [newLink, ...downloadLinks];
    save(); // Persist
    return new Promise(resolve => setTimeout(() => resolve(newLink), 500));
  },

  getPayPalSettings: async (): Promise<PayPalSettings> => {
    return new Promise(resolve => setTimeout(() => resolve({ ...payPalSettings }), 200));
  },

  updatePayPalSettings: async (settings: PayPalSettings): Promise<PayPalSettings> => {
    payPalSettings = settings;
    save(); // Persist
    return new Promise(resolve => setTimeout(() => resolve(payPalSettings), 400));
  },

  // NEW: Generate Premium eBook PDF
  generateEbookPDFBlob: async (productId: string): Promise<Blob> => {
    const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
    const doc = new jsPDF();
    const brandNavy: [number, number, number] = [15, 23, 42];
    const brandTeal: [number, number, number] = [20, 184, 166];

    // --- COVER PAGE ---
    // Background (Clean White)
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 210, 297, 'F');

    // Accent Decoration
    doc.setDrawColor(...brandTeal);
    doc.setLineWidth(3);
    doc.line(20, 40, 60, 40);

    // Title
    doc.setTextColor(...brandNavy);
    doc.setFont('times', 'bold');
    doc.setFontSize(54);
    doc.text("TRADE", 20, 80);
    doc.text("PLAYBOOKS", 20, 100);

    doc.setTextColor(...brandTeal); // brand-teal
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text("STOCKS & CRYPTO EDITION", 20, 120);

    // Subtitle
    doc.setTextColor(100, 116, 139); // slate-500
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    const taglineLines = doc.splitTextToSize("A Unified Execution Framework for Equity & Digital Asset Markets", 160);
    doc.text(taglineLines, 20, 140);

    // Logo/Branding at bottom
    doc.setTextColor(...brandNavy);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text("© 2026 TRADE PLAYBOOKS™", 20, 270);

    doc.setTextColor(148, 163, 184); // slate-400
    doc.setFont('helvetica', 'normal');
    doc.text("RESTRICTED DISTRIBUTION", 20, 275);

    // Decorative Line
    doc.setDrawColor(...brandNavy);
    doc.setLineWidth(1);
    doc.line(20, 282, 190, 282);

    // --- PAGE 2: TABLE OF CONTENTS ---
    doc.addPage();
    doc.setFillColor(255, 255, 255); // White interior
    doc.rect(0, 0, 210, 297, 'F');

    doc.setTextColor(...brandNavy);
    doc.setFont('times', 'bold');
    doc.setFontSize(28);
    doc.text("Table of Contents", 20, 40);

    doc.setDrawColor(...brandTeal);
    doc.setLineWidth(1);
    doc.line(20, 45, 60, 45);

    let curY = 65;
    product.chapters?.forEach((chapter, idx) => {
      doc.setTextColor(...brandNavy);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(`${String(idx + 1).padStart(2, '0')}. ${chapter.title.toUpperCase()}`, 20, curY);

      doc.setTextColor(100, 116, 139); // slate-500
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      curY += 6;
      chapter.points.forEach(point => {
        doc.text(`• ${point}`, 25, curY);
        curY += 5;
      });
      curY += 10;

      // Check for page overflow
      if (curY > 260 && idx < (product.chapters?.length || 0) - 1) {
        doc.addPage();
        curY = 40;
      }
    });

    // --- FOOTER ON ALL PAGES ---
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 2; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(203, 213, 225); // slate-300
      doc.text(`Trade Playbooks™ | Stocks & Crypto Edition | Page ${i}`, 105, 287, { align: 'center' });
    }

    return doc.output('blob');
  },
};
