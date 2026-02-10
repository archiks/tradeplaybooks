
import { Order, Invoice, AccessLog, OrderStatus, AdminStats, DownloadLink, PayPalSettings, InvoiceAuditTrail, CompanySettings } from '../types';
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
    localStorage.setItem('ts_orders_v4', JSON.stringify(orders));
    localStorage.setItem('ts_invoices_v4', JSON.stringify(invoices));
    localStorage.setItem('ts_links_v4', JSON.stringify(downloadLinks));
    localStorage.setItem('ts_logs_v4', JSON.stringify(logs));
    localStorage.setItem('ts_settings_v4', JSON.stringify(payPalSettings));
    localStorage.setItem('ts_company_settings_v4', JSON.stringify(companySettings));
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
    productName: 'Premium Shopify Store',
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
    productName: 'Starter Shopify Store',
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
    invoiceNumber: 'GS-2024-0001',
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

const DEFAULT_COMPANY_SETTINGS: CompanySettings = {
  name: 'Garsabers',
  vatNumber: 'IE 1234567T',
  address: 'Garsabers Inc.\nEcommerce Division',
  invoicePrefix: 'GS',
  website: 'garsabers.com',
  footerText: 'Done-For-You Shopify Stores. Professional Development Services.'
};

// --- INITIALIZE STATE FROM STORAGE OR DEFAULTS ---
let orders: Order[] = load('ts_orders_v4', DEFAULT_ORDERS);
let invoices: Invoice[] = load('ts_invoices_v4', DEFAULT_INVOICES);
let downloadLinks: DownloadLink[] = load('ts_links_v4', DEFAULT_LINKS);
let logs: AccessLog[] = load('ts_logs_v4', DEFAULT_LOGS);
let payPalSettings: PayPalSettings = load('ts_settings_v4', DEFAULT_SETTINGS);
let companySettings: CompanySettings = load('ts_company_settings_v4', DEFAULT_COMPANY_SETTINGS);


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
        invoiceNumber: `GS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
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
    const brandLight: [number, number, number] = [241, 245, 249]; // slate-100
    const slateGray: [number, number, number] = [100, 116, 139];

    // --- HEADER BACKGROUND ---
    doc.setFillColor(...brandLight);
    doc.rect(0, 0, 210, 40, 'F');

    // --- LOGO / BRAND ---
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(...brandNavy);
    doc.text(companySettings.name, 20, 26);

    // Website tagline
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...brandTeal);
    doc.text("ECOMMERCE DEVELOPMENT", 20, 31);

    // --- INVOICE LABEL ---
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(200, 200, 200); // Light gray watermark feel
    doc.text("INVOICE", 190, 28, { align: 'right' });


    // --- GRID LAYOUT FOR DETAILS ---
    let yPos = 60;

    // LEFT COLUMN: BILL TO
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...brandNavy);
    doc.text("BILL TO", 20, yPos);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    yPos += 6;
    doc.text(invoice.billTo.name, 20, yPos);
    yPos += 5;
    doc.setTextColor(...slateGray);
    doc.text(invoice.billTo.email, 20, yPos);
    yPos += 5;

    const addressLines = doc.splitTextToSize(invoice.billTo.address || '', 70);
    doc.text(addressLines, 20, yPos);
    yPos += (addressLines.length * 5);
    if (invoice.billTo.country) {
      doc.text(invoice.billTo.country, 20, yPos);
    }

    // RIGHT COLUMN: INVOICE DETAILS
    yPos = 60;
    const rightColX = 140;

    // Invoice Number
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...brandNavy);
    doc.text("INVOICE #", rightColX, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(invoice.invoiceNumber, 190, yPos, { align: 'right' });

    yPos += 10;
    // Issue Date
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...brandNavy);
    doc.text("ISSUE DATE", rightColX, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(new Date(invoice.issueDate).toLocaleDateString(), 190, yPos, { align: 'right' });

    yPos += 10;
    // Status
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...brandNavy);
    doc.text("STATUS", rightColX, yPos);

    doc.setFontSize(10);
    if (invoice.status === 'PAID') {
      doc.setTextColor(20, 184, 166); // Teal
    } else {
      doc.setTextColor(15, 23, 42);
    }
    doc.text(invoice.status, 190, yPos, { align: 'right' });

    // --- WEBSITE DELIVERED FIELD (NEW) ---
    if (invoice.websiteUrl) {
      yPos += 15;
      const boxWidth = 110; // Significantly wider box to fit long URLs
      doc.setFillColor(240, 253, 250); // teal-50
      doc.setDrawColor(204, 251, 241); // teal-100
      doc.roundedRect(210 - 20 - boxWidth, yPos - 6, boxWidth, 14, 2, 2, 'FD'); // Align right

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...brandTeal);
      doc.text("DELIVERED STORE", 210 - 20 - boxWidth + 4, yPos);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);

      const url = invoice.websiteUrl;
      // Truncate only if extremely long (>65 chars)
      const displayUrl = url.length > 65 ? url.substring(0, 62) + '...' : url;

      doc.textWithLink(displayUrl, 210 - 20 - 4, yPos + 4, { url: url, align: 'right' });
    }

    // --- PAY TO / FROM (Left Column below Bill To) ---
    let leftY = Math.max(90, yPos + 20);
    if (!invoice.websiteUrl) leftY = 110;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...brandNavy);
    doc.text("PAY TO", 20, leftY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...slateGray);
    leftY += 5;
    doc.text(companySettings.name, 20, leftY);
    leftY += 5;
    const companyAddr = doc.splitTextToSize(companySettings.address, 70);
    doc.text(companyAddr, 20, leftY);
    leftY += (companyAddr.length * 5);
    doc.text(`VAT ID: ${companySettings.vatNumber}`, 20, leftY);


    // --- ITEMS TABLE ---
    const tableStartY = Math.max(leftY + 10, 125); // Reduced top margin

    // Determine Product Name (find order to get product name)
    const order = orders.find(o => o.id === invoice.orderId);
    const description = order ? order.productName : "Shopify Store Development Service";

    // Layout configuration
    const descWidth = 85;
    const typeWidth = 40;
    const qtyWidth = 15;
    const amtWidth = 30; // Total: 170

    // @ts-ignore
    autoTable(doc, {
      startY: tableStartY,
      head: [['DESCRIPTION', 'TYPE', 'QTY', 'AMOUNT']],
      body: [
        [description, 'Professional Service', '1', `€${invoice.subtotal.toFixed(2)}`]
      ],
      theme: 'plain', // Cleaner look, no borders by default
      styles: {
        font: 'helvetica',
        fontSize: 10,
        cellPadding: 6, // Compact padding
        textColor: [51, 65, 85], // slate-700
        valign: 'middle',
        overflow: 'linebreak', // Allow wrapping if absolutely necessary
      },
      headStyles: {
        fillColor: [248, 250, 252], // Very light gray header background
        textColor: [100, 116, 139], // slate-500
        fontStyle: 'bold',
        fontSize: 8,
        halign: 'left',
        cellPadding: 6
      },
      columnStyles: {
        0: { cellWidth: descWidth }, // Description
        1: { cellWidth: typeWidth }, // Type
        2: { cellWidth: qtyWidth, halign: 'center' }, // Qty
        3: { cellWidth: amtWidth, halign: 'right', fontStyle: 'bold' } // Amount
      },
      // Add a bottom border to header
      didDrawPage: (data) => {
        // Draw header line manually for cleaner look
        const startX = data.settings.margin.left;
        const endX = startX + descWidth + typeWidth + qtyWidth + amtWidth;
        const y = data.cursor?.y || 0;
        // This hook runs after page content is drawn but before table? 
        // No, let's better use didDrawCell for custom borders or just rely on 'plain' + some manual drawing
      },
      didParseCell: (data) => {
        // Optional: custom parsing
      }
    });

    // Draw a line under the header row (manual approach for 'plain' theme)
    // We can't easily hook into the exact header Y, so let's just draw a line at startY + headerHeight
    // Assuming header height is roughly 10-12 points.

    // Actually, 'striped' theme is often good but has vertical borders. 
    // Let's stick to 'plain' but add a bottom border to the header manually after the table call if possible.
    // Or better, switch back to 'grid' but with transparent vertical borders?
    // Let's use 'grid' but customize borders.
    // doc.setDrawColor(241, 245, 249); // slate-100 logic handled below in previous code, 
    // but here we are replacing the block. 
    // Let's force a clean horizontal line style.

    // --- TOTALS ---
    // @ts-ignore
    let finalY = doc.lastAutoTable.finalY + 10; // Reduced spacing from 15
    const totalsX = 130; // Shift left slightly to make room

    // Ensure totals don't overlap with audit trail
    // Audit trail starts at pageHeight - 60 (~237)
    // If finalY > 210, we should push to next page or warn.
    if (finalY > 235) {
      doc.addPage();
      finalY = 40;
    }

    // Totals Box Background (Subtle)
    // doc.setFillColor(252, 252, 253);
    // doc.roundedRect(totalsX - 10, finalY - 5, 70, 45, 2, 2, 'F');

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    // Subtotal
    doc.setTextColor(...slateGray);
    doc.text(`Subtotal`, totalsX, finalY);
    doc.setTextColor(15, 23, 42);
    doc.text(`€${invoice.subtotal.toFixed(2)}`, 190, finalY, { align: 'right' });

    // VAT
    finalY += 6; // Compact spacing
    doc.setTextColor(...slateGray);
    doc.text(`VAT (20%)`, totalsX, finalY);
    doc.setTextColor(15, 23, 42);
    doc.text(`€${invoice.tax.toFixed(2)}`, 190, finalY, { align: 'right' });

    // Divider Line
    finalY += 6;
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.line(totalsX, finalY, 190, finalY);

    // Total
    finalY += 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14); // Slightly smaller for professional look
    doc.setTextColor(15, 23, 42);
    doc.text(`Total`, totalsX, finalY);
    doc.setTextColor(...brandTeal);
    doc.text(`€${invoice.total.toFixed(2)}`, 190, finalY, { align: 'right' });


    // --- AUDIT TRAIL (Bottom) ---
    // Position at bottom of page
    const pageHeight = doc.internal.pageSize.height;
    const auditY = pageHeight - 55; // Lower slightly

    // Light gray box
    doc.setFillColor(248, 250, 252);
    // Ensure this doesn't overlap with totals if on same page
    // If finalY (which is top of Total line) is close to auditY, we have a problem.
    // If we added a page, finalY is small. If not, check space.

    doc.roundedRect(20, auditY, 170, 30, 2, 2, 'F'); // Background

    // Label
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...slateGray);
    doc.text("DELIVERY AUTHENTICATION", 25, auditY + 8);

    // Divider inside box
    // doc.setDrawColor(226, 232, 240);
    // doc.line(25, auditY + 11, 185, auditY + 11);

    // Content
    doc.setFont('courier', 'normal'); // Monospace for technical data
    doc.setFontSize(7);
    doc.setTextColor(30, 41, 59); // slate-800

    const deliveryInfo = `STATUS: ${audit.deliveryStatus}  |  IP: ${audit.accessIp}  |  TIMESTAMP: ${audit.timestamp || audit.accessTime}`;
    doc.text(deliveryInfo, 25, auditY + 16);

    const auditId = `REF: ${audit.linkId}  |  SIG: ${audit.deviceSig.substring(0, 30)}...`;
    doc.text(auditId, 25, auditY + 22);


    // --- FOOTER ---
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text(`${companySettings.footerText}`, 105, pageHeight - 15, { align: 'center' });
    doc.text(`${companySettings.website}`, 105, pageHeight - 10, { align: 'center' });

    return doc.output('blob');
  },

  generateInvoice: async (orderId: string): Promise<Invoice> => {
    const order = orders.find(o => o.id === orderId);
    if (!order) throw new Error("Order not found");

    const newInvoice: Invoice = {
      id: `inv_${Math.random().toString(36).substr(2, 9)}`,
      orderId,
      invoiceNumber: `${companySettings.invoicePrefix}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
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

  getCompanySettings: async (): Promise<CompanySettings> => {
    return new Promise(resolve => setTimeout(() => resolve({ ...companySettings }), 200));
  },

  updateCompanySettings: async (settings: CompanySettings): Promise<CompanySettings> => {
    companySettings = settings;
    save();
    return new Promise(resolve => setTimeout(() => resolve(companySettings), 400));
  },

  // NEW: Generate Service Agreement PDF (Replaces Ebook)
  generateEbookPDFBlob: async (productId: string): Promise<Blob> => {
    const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
    const doc = new jsPDF();
    const brandNavy: [number, number, number] = [15, 23, 42];
    const brandTeal: [number, number, number] = [20, 184, 166];

    // --- COVER PAGE ---
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 210, 297, 'F');

    // Title
    doc.setTextColor(...brandNavy);
    doc.setFont('times', 'bold');
    doc.setFontSize(32);
    doc.text("SERVICE AGREEMENT", 20, 80);

    doc.setTextColor(...brandTeal);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(product.name.toUpperCase(), 20, 100);

    // Subtitle
    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text("Thank you for your business. This document outlines the scope of work.", 20, 120);

    // Footer
    doc.setTextColor(...brandNavy);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text("© 2026 GARSABERS", 20, 270);

    return doc.output('blob');
  },
};
