
import React, { useState, useEffect, useCallback } from 'react';
import { LayoutDashboard, ShoppingCart, FileText, Download, Settings, Search, Plus, Eye, DownloadCloud, RefreshCw, Key, Shield, Link as LinkIcon, Edit3, CreditCard, Pencil, X, Save, CheckCircle2, AlertCircle, Zap } from 'lucide-react';
import { MockBackend } from '../services/mockBackend';
import { Order, Invoice, AccessLog, AdminStats, OrderStatus, DownloadLink, InvoiceAuditTrail, CompanySettings } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { COUNTRIES, PRODUCTS } from '../constants';

type View = 'DASHBOARD' | 'ORDERS' | 'INVOICES' | 'LOGS' | 'SETTINGS';

export const AdminDashboard: React.FC = () => {
    const [currentView, setCurrentView] = useState<View>('DASHBOARD');

    return (
        <div className="flex h-screen bg-white text-slate-900 overflow-hidden font-sans selection:bg-brand-teal selection:text-white">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-200 bg-slate-50 flex flex-col">
                <div className="p-6 border-b border-slate-200">
                    <h1 className="font-bold text-lg text-brand-navy leading-tight">Garsabers<span className="text-brand-teal">.</span></h1>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 block">Institutional Admin</span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <SidebarItem icon={LayoutDashboard} label="Dashboard" active={currentView === 'DASHBOARD'} onClick={() => setCurrentView('DASHBOARD')} />
                    <SidebarItem icon={ShoppingCart} label="Orders" active={currentView === 'ORDERS'} onClick={() => setCurrentView('ORDERS')} />
                    <SidebarItem icon={FileText} label="Invoices" active={currentView === 'INVOICES'} onClick={() => setCurrentView('INVOICES')} />
                    <SidebarItem icon={Download} label="Downloads" active={currentView === 'LOGS'} onClick={() => setCurrentView('LOGS')} />
                    <SidebarItem icon={Settings} label="Settings" active={currentView === 'SETTINGS'} onClick={() => setCurrentView('SETTINGS')} />
                </nav>

                <div className="p-4 border-t border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-xs shadow-lg shadow-brand-navy/20">TP</div>
                        <div>
                            <p className="text-sm font-medium text-brand-navy">Administrator</p>
                            <p className="text-xs text-slate-500">admin@garsabers.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-white relative">
                <div className="p-8 max-w-7xl mx-auto min-h-full">
                    {currentView === 'DASHBOARD' && <DashboardOverview />}
                    {currentView === 'ORDERS' && <OrdersManager />}
                    {currentView === 'INVOICES' && <InvoicesManager />}
                    {currentView === 'LOGS' && <DownloadsManager />}
                    {currentView === 'SETTINGS' && <SettingsView />}
                </div>
            </main>
        </div>
    );
};

const SidebarItem: React.FC<{ icon: any, label: string, active: boolean, onClick: () => void }> = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-white text-brand-navy border border-slate-200 shadow-sm font-bold' : 'text-slate-500 hover:bg-white hover:text-brand-navy hover:shadow-sm'}`}
    >
        <Icon className={`w-4 h-4 ${active ? 'text-brand-teal' : ''}`} />
        <span className="text-sm">{label}</span>
    </button>
);

// --- Sub-Views ---

const DashboardOverview: React.FC = () => {
    const [stats, setStats] = useState<AdminStats | null>(null);

    useEffect(() => {
        MockBackend.getStats().then(setStats);
    }, []);

    if (!stats) return <div className="text-slate-500">Loading stats...</div>;

    const chartData = [
        { name: 'Mon', val: 400 }, { name: 'Tue', val: 300 }, { name: 'Wed', val: 600 },
        { name: 'Thu', val: 800 }, { name: 'Fri', val: 500 }, { name: 'Sat', val: 900 }, { name: 'Sun', val: 1000 }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
                <h2 className="text-3xl font-bold text-brand-navy mb-2">Dashboard</h2>
                <p className="text-slate-500">Welcome back. Here's what's happening today.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard label="Total Revenue" value={`€${stats.totalRevenue.toLocaleString()}`} trend="+12%" />
                <StatCard label="Total Orders" value={stats.totalOrders.toString()} trend="+5%" />
                <StatCard label="Active Users" value={stats.activeUsers.toString()} trend="+24%" />
                <StatCard label="Conversion Rate" value={`${stats.conversionRate}%`} trend="+0.4%" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-brand-navy">Revenue Overview</h3>
                        <select className="bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 px-2 py-1 outline-none focus:border-brand-teal">
                            <option>Last 7 Days</option>
                            <option>This Month</option>
                        </select>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `€${value}`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#0f172a', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                                    cursor={{ fill: '#f1f5f9' }}
                                />
                                <Bar dataKey="val" radius={[4, 4, 0, 0]}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 6 ? '#14b8a6' : '#0f172a'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard: React.FC<{ label: string, value: string, trend: string }> = ({ label, value, trend }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-brand-teal/50 transition-all shadow-sm hover:shadow-md">
        <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-2 font-bold">{label}</p>
        <div className="flex justify-between items-end">
            <h3 className="text-2xl font-bold text-brand-navy tracking-tight">{value}</h3>
            <span className="text-emerald-600 text-[10px] bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100 font-bold">{trend}</span>
        </div>
    </div>
);

const OrdersManager: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingOrder, setEditingOrder] = useState<Order | null>(null);
    const [isCreatingOrder, setIsCreatingOrder] = useState(false);

    const refresh = () => {
        setLoading(true);
        MockBackend.getOrders().then((data) => {
            setOrders(data);
            setLoading(false);
        });
    }

    useEffect(() => {
        refresh();
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-brand-navy">Orders</h2>
                <div className="flex gap-2">
                    <button onClick={refresh} className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 border border-slate-200 text-slate-600"><RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /></button>
                    <button
                        onClick={() => setIsCreatingOrder(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-brand-teal text-white rounded-lg text-sm font-bold hover:bg-brand-teal/90 transition-all shadow-lg shadow-brand-teal/20"
                    >
                        <Plus className="w-4 h-4" /> Manual Order
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-bold">ID</th>
                            <th className="px-6 py-4 font-bold">Customer</th>
                            <th className="px-6 py-4 font-bold">Product</th>
                            <th className="px-6 py-4 font-bold">Amount</th>
                            <th className="px-6 py-4 font-bold">Status</th>
                            <th className="px-6 py-4 text-right font-bold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-slate-50 transition-colors group">
                                <td className="px-6 py-4 font-mono text-slate-400 text-xs">{order.id}</td>
                                <td className="px-6 py-4">
                                    <div className="text-slate-900 font-bold">{order.customerName}</div>
                                    <div className="text-xs text-slate-500">{order.customerEmail}</div>
                                </td>
                                <td className="px-6 py-4 text-slate-600">{order.productName}</td>
                                <td className="px-6 py-4 text-slate-900 font-medium">€{order.amount}</td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={order.status} />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => setEditingOrder(order)}
                                        className="p-2 hover:bg-slate-200 hover:text-brand-navy rounded-lg text-slate-400 transition-colors"
                                        title="Edit Invoice"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editingOrder && (
                <EditInvoiceModal
                    order={editingOrder}
                    onClose={() => setEditingOrder(null)}
                    onSave={() => { setEditingOrder(null); refresh(); }}
                />
            )}

            {isCreatingOrder && (
                <CreateOrderModal
                    onClose={() => setIsCreatingOrder(false)}
                    onSave={() => { setIsCreatingOrder(false); refresh(); }}
                />
            )}
        </div>
    );
};

const CreateOrderModal: React.FC<{ onClose: () => void, onSave: () => void }> = ({ onClose, onSave }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [productId, setProductId] = useState(PRODUCTS[0].id);
    const [status, setStatus] = useState<OrderStatus>(OrderStatus.COMPLETED);
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('Germany');
    // Default to current date and time
    const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [time, setTime] = useState(() => new Date().toTimeString().slice(0, 5));
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        if (!name || !email) {
            alert("Name and Email are required");
            return;
        }
        setLoading(true);
        try {
            // Combine Date and Time into ISO Strings
            const dateTimeStr = `${date}T${time}:00`;
            const isoDateTime = new Date(dateTimeStr).toISOString();

            await MockBackend.createOrder(
                productId,
                name,
                email,
                'MANUAL',
                status,
                address,
                country,
                isoDateTime, // Created At
                isoDateTime  // Access Time
            );
            onSave();
        } catch (e) {
            alert("Failed to create order");
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh]">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="text-lg font-bold text-brand-navy">New Manual Order</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-brand-navy transition-colors"><X className="w-5 h-5" /></button>
                </div>

                <div className="p-6 space-y-4 overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <Input label="Customer Name" value={name} onChange={setName} required />
                        </div>
                        <div className="col-span-2">
                            <Input label="Customer Email" value={email} onChange={setEmail} type="email" required />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Address</label>
                            <textarea
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-colors min-h-[60px]"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Country</label>
                            <select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-colors"
                            >
                                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="col-span-1">
                            {/* Spacer or additional field */}
                        </div>
                    </div>

                    <div className="h-px bg-slate-100 my-4"></div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Product</label>
                            <select
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-colors"
                            >
                                {PRODUCTS.map(p => (
                                    <option key={p.id} value={p.id}>{p.name} (€{p.price})</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as OrderStatus)}
                                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-colors"
                            >
                                <option value={OrderStatus.PENDING}>PENDING</option>
                                <option value={OrderStatus.COMPLETED}>COMPLETED</option>
                                <option value={OrderStatus.DOWNLOADED}>DOWNLOADED (Simulated)</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Order Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Access Time</label>
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-colors"
                            />
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 text-slate-500 text-sm transition-all shadow-sm">Cancel</button>
                    <button
                        onClick={handleCreate}
                        disabled={loading}
                        className="px-6 py-2 bg-brand-navy hover:bg-brand-navy/90 text-white font-bold rounded-lg text-sm transition-all shadow-lg shadow-brand-navy/10 disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Order'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const EditInvoiceModal: React.FC<{ order: Order, onClose: () => void, onSave: () => void }> = ({ order, onClose, onSave }) => {
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [auditData, setAuditData] = useState<InvoiceAuditTrail | null>(null);

    // Initial Load
    useEffect(() => {
        MockBackend.getInvoiceByOrderId(order.id).then(async (data) => {
            setInvoice(data);
            // Pre-fetch simulated audit data for display
            try {
                const pdfData = await MockBackend.generateInvoicePdfData(data.id);
                if (pdfData.auditTrail) setAuditData(pdfData.auditTrail);
            } catch (e) { /* ignore if new invoice */ }
            setLoading(false);
        });
    }, [order.id]);

    // Totals Recalculation
    useEffect(() => {
        if (invoice) {
            setInvoice(prev => prev ? ({ ...prev, total: prev.subtotal + prev.tax }) : null);
        }
    }, [invoice?.subtotal, invoice?.tax]);

    // Shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if ((e.metaKey || e.ctrlKey) && e.key === 's') {
                e.preventDefault();
                handleSave();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [invoice]);

    const handleSave = async () => {
        if (!invoice) return;
        setIsSaving(true);
        setError(null);

        // Basic Validation
        if (!invoice.billTo.name || !invoice.billTo.email || !invoice.invoiceNumber) {
            setError("Missing required fields.");
            setIsSaving(false);
            return;
        }

        try {
            await MockBackend.updateInvoice(invoice);
            onSave();
        } catch (err: any) {
            setError(err.message || "Failed to save.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDownloadPdf = async () => {
        if (!invoice) return;

        try {
            // Generate valid PDF Blob
            const pdfBlob = await MockBackend.generateInvoicePDFBlob(invoice.id);

            // Create download link
            const url = window.URL.createObjectURL(pdfBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Invoice_${invoice.invoiceNumber}.pdf`; // Correct extension
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (e: any) {
            setError("Failed to generate PDF: " + e.message);
        }
    };

    if (loading || !invoice) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <div>
                        <h3 className="text-lg font-bold text-brand-navy tracking-tight">Edit Invoice</h3>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${invoice.status === 'ISSUED' || invoice.status === 'PAID' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                            invoice.status === 'VOIDED' ? 'bg-red-50 text-red-600 border-red-200' :
                                'bg-slate-100 text-slate-500 border-slate-200'
                            }`}>
                            {invoice.status}
                        </span>
                        <button onClick={onClose} className="text-slate-400 hover:text-brand-navy transition-colors"><X className="w-5 h-5" /></button>
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin">

                    {/* Section: Billing */}
                    <div className="space-y-4">
                        <h4 className="text-xs uppercase tracking-widest text-brand-teal font-bold">Billing Details</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Bill-To Name" value={invoice.billTo.name} onChange={(v) => setInvoice({ ...invoice, billTo: { ...invoice.billTo, name: v } })} required />
                            <Input label="Bill-To Email" type="email" value={invoice.billTo.email} onChange={(v) => setInvoice({ ...invoice, billTo: { ...invoice.billTo, email: v } })} required />
                            <div className="col-span-2">
                                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Address</label>
                                <textarea
                                    value={invoice.billTo.address || ''}
                                    onChange={(e) => setInvoice({ ...invoice, billTo: { ...invoice.billTo, address: e.target.value } })}
                                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-colors min-h-[80px]"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Country</label>
                                <select
                                    value={invoice.billTo.country || ''}
                                    onChange={(e) => setInvoice({ ...invoice, billTo: { ...invoice.billTo, country: e.target.value } })}
                                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-colors"
                                >
                                    <option value="">Select Country...</option>
                                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section: Meta */}
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                        <h4 className="text-xs uppercase tracking-widest text-brand-teal font-bold">Invoice Meta</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Invoice #" value={invoice.invoiceNumber} onChange={(v) => setInvoice({ ...invoice, invoiceNumber: v })} required />
                            <Input label="Order #" value={order.id} disabled />
                            <Input label="Issue Date (UTC)" type="date" value={new Date(invoice.issueDate).toISOString().split('T')[0]} onChange={(v) => setInvoice({ ...invoice, issueDate: new Date(v).toISOString() })} />
                            <Input
                                label="Delivered Website URL"
                                value={invoice.websiteUrl || ''}
                                onChange={(v) => setInvoice({ ...invoice, websiteUrl: v })}
                                placeholder="https://..."
                            />
                        </div>
                    </div>

                    {/* Section: Amounts */}
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                        <h4 className="text-xs uppercase tracking-widest text-brand-teal font-bold">Amounts & Currency</h4>
                        <div className="grid grid-cols-3 gap-4">
                            <Input
                                label="Subtotal (€)"
                                type="number"
                                value={invoice.subtotal}
                                onChange={(v) => {
                                    const val = parseFloat(v);
                                    const subtotal = isNaN(val) ? 0 : val;
                                    const tax = invoice.tax || 0;
                                    setInvoice({
                                        ...invoice,
                                        subtotal: subtotal,
                                        total: subtotal + tax
                                    });
                                }}
                            />
                            <Input
                                label="Tax (€)"
                                type="number"
                                value={invoice.tax}
                                onChange={(v) => {
                                    const val = parseFloat(v);
                                    const tax = isNaN(val) ? 0 : val;
                                    const subtotal = invoice.subtotal || 0;
                                    setInvoice({
                                        ...invoice,
                                        tax: tax,
                                        total: subtotal + tax
                                    });
                                }}
                            />
                            <Input label="Total (€)" type="number" value={invoice.total} disabled />
                        </div>
                    </div>

                    {/* Section: Audit Preview */}
                    <div className="pt-4 border-t border-slate-100">
                        <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
                            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                                <span>Digital Delivery Confirmation (Audit Trail)</span>
                                {auditData?.isSandbox && <span className="text-[9px] bg-yellow-100 text-yellow-700 px-1 rounded border border-yellow-200">SANDBOX</span>}
                            </h5>
                            <div className="grid grid-cols-2 gap-y-2 text-xs font-mono">
                                <div className="text-slate-500">Delivery Status:</div>
                                <div className={auditData?.deliveryStatus === 'DOWNLOADED' ? 'text-emerald-600 font-bold' : 'text-slate-400'}>{auditData?.deliveryStatus || 'PENDING'}</div>

                                <div className="text-slate-500">Link ID:</div>
                                <div className="text-slate-700">{auditData?.linkId || '—'}</div>

                                <div className="text-slate-500">Access IP:</div>
                                <div className="text-slate-700">{auditData?.accessIp || '—'}</div>

                                <div className="text-slate-500">Timestamp (UTC):</div>
                                <div className="text-slate-700">{auditData?.accessTime ? new Date(auditData.accessTime).toLocaleString() : '—'}</div>
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-2 text-center">This data will be embedded permanently in the generated PDF.</p>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg flex items-center gap-2 text-sm">
                            <AlertCircle className="w-4 h-4" /> {error}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                    <button
                        onClick={handleDownloadPdf}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-sm transition-colors font-medium shadow-sm"
                    >
                        <Download className="w-4 h-4" /> Download PDF
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-2 bg-brand-navy hover:bg-brand-navy/90 text-white font-bold rounded-lg text-sm transition-all shadow-lg shadow-brand-navy/10 disabled:opacity-50"
                    >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                        {!isSaving && <Save className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

// Helper Input for Modal
const Input: React.FC<{ label: string, value: any, onChange?: (v: string) => void, type?: string, required?: boolean, disabled?: boolean, placeholder?: string }> = ({ label, value, onChange, type = "text", required, disabled, placeholder }) => (
    <div>
        <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
            {label} {required && <span className="text-brand-teal">*</span>}
        </label>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
            disabled={disabled}
            placeholder={placeholder}
            className={`w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-colors ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-50' : ''}`}
        />
    </div>
);

const StatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
    const colors = {
        [OrderStatus.COMPLETED]: 'bg-green-500/10 text-green-400 border-green-500/20',
        [OrderStatus.PENDING]: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
        [OrderStatus.FAILED]: 'bg-red-500/10 text-red-400 border-red-500/20',
        [OrderStatus.REFUNDED]: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        [OrderStatus.DOWNLOADED]: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    };
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[status]}`}>
            {status}
        </span>
    );
};

const InvoicesManager: React.FC = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);

    useEffect(() => {
        MockBackend.getInvoices().then(setInvoices);
    }, []);

    const handleDownload = async (invoice: Invoice) => {
        try {
            const pdfBlob = await MockBackend.generateInvoicePDFBlob(invoice.id);
            const url = window.URL.createObjectURL(pdfBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Invoice_${invoice.invoiceNumber}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (e: any) {
            alert("Error: " + e.message);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in">
            <h2 className="text-2xl font-bold text-brand-navy">Invoices</h2>
            <div className="grid gap-4">
                {invoices.map((inv) => (
                    <div key={inv.id} className="bg-white p-6 rounded-xl border border-slate-200 flex justify-between items-center hover:border-brand-teal/50 transition-all shadow-sm hover:shadow-md group">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-slate-50 rounded-lg text-slate-400 group-hover:text-brand-teal transition-colors">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-brand-navy font-bold">{inv.invoiceNumber}</h4>
                                <p className="text-sm text-slate-500">Issued: {new Date(inv.issueDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="text-right">
                                <p className="text-brand-navy font-bold">€{inv.total.toFixed(2)}</p>
                                <p className="text-xs text-slate-500">{inv.billTo.name}</p>
                            </div>
                            <button
                                onClick={() => handleDownload(inv)}
                                className="p-2 bg-slate-50 hover:bg-brand-teal hover:text-white rounded-lg text-slate-400 transition-colors shadow-sm" title="Download PDF"
                            >
                                <DownloadCloud className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const DownloadsManager: React.FC = () => {
    const [links, setLinks] = useState<DownloadLink[]>([]);
    const [logs, setLogs] = useState<AccessLog[]>([]);

    useEffect(() => {
        MockBackend.getDownloadLinks().then(setLinks);
        MockBackend.getLogs().then(setLogs);
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in">
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-brand-navy">Active Download Links</h2>
                    <button className="text-xs bg-white hover:bg-slate-50 text-slate-600 px-3 py-1 rounded-md border border-slate-200 shadow-sm transition-colors">Export CSV</button>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 font-bold">Product</th>
                                <th className="px-6 py-3 font-bold">Key</th>
                                <th className="px-6 py-3 font-bold">Downloads</th>
                                <th className="px-6 py-3 font-bold">Expires</th>
                                <th className="px-6 py-3 font-bold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {links.map((link) => (
                                <tr key={link.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-3 text-slate-900 font-medium">{link.productName}</td>
                                    <td className="px-6 py-3 font-mono text-xs text-brand-teal bg-brand-teal/5 px-2 py-1 rounded w-fit">{link.key}</td>
                                    <td className="px-6 py-3 text-slate-500">{link.downloadCount} / {link.maxDownloads}</td>
                                    <td className="px-6 py-3 text-slate-400 text-xs">{new Date(link.expiresAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-3">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${link.isActive ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                                            {link.isActive ? 'ACTIVE' : 'REVOKED'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-bold text-brand-navy mb-4">Recent Access Logs</h2>
                <div className="bg-white rounded-xl border border-slate-200 p-4 font-mono text-sm space-y-2 max-h-[400px] overflow-y-auto shadow-sm">
                    {logs.map((log) => (
                        <div key={log.id} className="flex gap-4 text-xs border-b border-slate-100 pb-2 mb-2 last:border-0 hover:bg-slate-50 p-2 rounded transition-colors items-center">
                            <span className="text-brand-teal font-bold w-32 shrink-0">{new Date(log.timestamp).toLocaleTimeString()}</span>
                            <span className="text-brand-navy w-32 shrink-0 bg-slate-100 px-2 py-0.5 rounded text-center">{log.ip}</span>
                            <span className="text-slate-600 flex-1">{log.resource}</span>
                            <span className="text-slate-400 truncate w-48 hidden md:block" title={log.deviceSig}>{log.deviceSig}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

const SettingsView: React.FC = () => {
    const [companySettings, setCompanySettings] = useState<CompanySettings | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        MockBackend.getCompanySettings().then(setCompanySettings);
    }, []);

    const updateCompany = (key: keyof CompanySettings, val: any) => {
        if (!companySettings) return;
        setCompanySettings({ ...companySettings, [key]: val });
    };

    const handleSaveAll = async () => {
        setIsSaving(true);
        // Simulate persistence
        if (companySettings) {
            await Promise.all([
                MockBackend.updateCompanySettings(companySettings)
            ]);
        }
        setTimeout(() => {
            setIsSaving(false);
            alert("Settings Saved!");
        }, 500);
    };

    if (!companySettings) return <div className="text-slate-500">Loading settings...</div>;

    return (
        <div className="space-y-8 animate-in fade-in max-w-4xl">
            <header className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-brand-navy">Settings</h2>
                    <p className="text-slate-500">Manage store configuration.</p>
                </div>
                <button
                    onClick={handleSaveAll}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2 bg-brand-navy hover:bg-brand-navy/90 text-white font-bold rounded-lg text-sm transition-all shadow-lg shadow-brand-navy/10 disabled:opacity-50"
                >
                    {isSaving ? 'Saving...' : 'Save All Changes'}
                    {!isSaving && <Save className="w-4 h-4" />}
                </button>
            </header>

            <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-brand-teal/10 rounded-xl text-brand-teal">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-brand-navy">Company & Invoice Details</h3>
                        <p className="text-sm text-slate-500">These details appear on generated PDF invoices.</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <Input label="Company Name" value={companySettings.name} onChange={(v) => updateCompany('name', v)} />
                    </div>
                    <div>
                        <Input label="VAT Number" value={companySettings.vatNumber} onChange={(v) => updateCompany('vatNumber', v)} />
                    </div>
                    <div>
                        <Input label="Invoice Prefix" value={companySettings.invoicePrefix} onChange={(v) => updateCompany('invoicePrefix', v)} />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">Company Address</label>
                        <textarea
                            value={companySettings.address}
                            onChange={(e) => updateCompany('address', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-colors min-h-[80px]"
                        />
                    </div>
                    <div className="col-span-2">
                        <Input label="Website URL" value={companySettings.website} onChange={(v) => updateCompany('website', v)} />
                    </div>
                    <div className="col-span-2">
                        <Input label="Invoice Footer Text" value={companySettings.footerText} onChange={(v) => updateCompany('footerText', v)} />
                    </div>
                </div>
            </section>
        </div>
    );
};

const SettingsInput: React.FC<{ label: string, value?: string, className?: string, type?: string, onChange?: (e: any) => void }> = ({ label, value, className, type = "text", onChange }) => (
    <div className={className}>
        <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all text-sm"
        />
    </div>
);

const Toggle: React.FC<{ checked: boolean, onChange: (val: boolean) => void }> = ({ checked, onChange }) => (
    <button
        onClick={() => onChange(!checked)}
        className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${checked ? 'bg-brand-teal' : 'bg-slate-300'}`}
    >
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 shadow-sm ${checked ? 'left-7' : 'left-1'}`} />
    </button>
);
