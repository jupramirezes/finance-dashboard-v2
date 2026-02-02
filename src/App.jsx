import React, { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, AreaChart, Area
} from 'recharts';
import {
  Wallet, TrendingUp, TrendingDown, Calendar, Search, Filter, Plus, Bell, Settings, MoreHorizontal, ArrowUpRight, ArrowDownRight, LayoutDashboard, Receipt, BarChart3, Users, HelpCircle, LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';

const COLORS = ['#2563eb', '#16a34a', '#dc2626', '#ca8a04', '#7c3aed', '#0891b2', '#ea580c'];

const mockData = [
  { name: 'Ene', ingresos: 4000, gastos: 2400 },
  { name: 'Feb', ingresos: 3000, gastos: 1398 },
  { name: 'Mar', ingresos: 2000, gastos: 9800 },
  { name: 'Abr', ingresos: 2780, gastos: 3908 },
  { name: 'May', ingresos: 1890, gastos: 4800 },
  { name: 'Jun', ingresos: 2390, gastos: 3800 },
];

const categoryData = [
  { name: 'Alimentación', value: 400 },
  { name: 'Transporte', value: 300 },
  { name: 'Ocio', value: 300 },
  { name: 'Tecnología', value: 200 },
  { name: 'Hogar', value: 278 },
];

const transactions = [
  { id: 1, desc: 'Suscripción Netflix', cat: 'Ocio', amount: -39800, date: 'Hoy, 10:30 AM', type: 'gasto' },
  { id: 2, desc: 'Arriendo Local 1', cat: 'Negocios', amount: 1200000, date: 'Ayer', type: 'ingreso' },
  { id: 3, desc: 'Almuerzo Crepes', cat: 'Alimentación', amount: -45000, date: '2 Feb', type: 'gasto' },
  { id: 4, desc: 'Gasolina', cat: 'Transporte', amount: -150000, date: '1 Feb', type: 'gasto' },
];

const Card = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm ${className}`}
  >
    {children}
  </motion.div>
);

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => (
  <Card>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{value}</h3>
      </div>
      <div className={`p-2 rounded-xl bg-${color}-500/10 text-${color}-500`}>
        <Icon size={20} />
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2">
      <span className={`flex items-center text-xs font-semibold ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
        {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {trendValue}
    </div>
    <span className="text-xs text-slate-400">vs mes anterior</span>
  </div>
  </Card >
);

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex text-slate-900 dark:text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 hidden lg:flex flex-col p-6 bg-white dark:bg-slate-900">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">P</div>
          <h1 className="text-xl font-bold tracking-tight">PlataBot <span className="text-primary font-normal text-sm">v2</span></h1>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem icon={LayoutDashboard} label="Dashboard" active />
          <NavItem icon={Receipt} label="Transacciones" />
          <NavItem icon={BarChart3} label="Reportes" />
          <NavItem icon={Users} label="Presupuesto" />
          <NavItem icon={Settings} label="Configuración" />
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <NavItem icon={HelpCircle} label="Ayuda" />
          <NavItem icon={LogOut} label="Cerrar Sesión" color="rose" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md px-8 flex items-center justify-between z-10">
          <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-full w-96">
            <Search size={18} className="text-slate-400" />
            <input type="text" placeholder="Buscar gastos..." className="bg-transparent border-none outline-none text-sm w-full" />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-full text-slate-500 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-950"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 dark:border-slate-800 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold">User Colombia</p>
                <p className="text-xs text-slate-500">Premium Plan</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=User+Colombia" alt="Avatar" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Hola de nuevo 👋</h2>
              <p className="text-slate-500 mt-1">Aquí está lo que ha pasado con tu dinero hoy.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors">
                <Calendar size={16} /> Últimos 30 días
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
                <Plus size={16} /> Nuevo Registro
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Balance Total" value="$12,450,000" icon={Wallet} trend="up" trendValue="+12.5%" color="blue" />
            <StatCard title="Ingresos" value="$3,200,000" icon={TrendingUp} trend="up" trendValue="+8.2%" color="emerald" />
            <StatCard title="Gastos" value="$1,850,000" icon={TrendingDown} trend="down" trendValue="+5.1%" color="rose" />
            <StatCard title="Ahorro" value="$1,350,000" icon={ArrowUpRight} trend="up" trendValue="+15%" color="amber" />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-lg">Evolución Financiera</h3>
                <div className="flex gap-4 text-xs font-medium">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-primary"></span> Ingresos</div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-slate-300"></span> Gastos</div>
                </div>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockData}>
                    <defs>
                      <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(v) => `$${v / 1000}k`} />
                    <Tooltip
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      cursor={{ stroke: '#2563eb', strokeWidth: 2 }}
                    />
                    <Area type="monotone" dataKey="ingresos" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorIngresos)" />
                    <Area type="monotone" dataKey="gastos" stroke="#cbd5e1" strokeWidth={3} fill="transparent" strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <h3 className="font-bold text-lg mb-8">Por Categoría</h3>
              <div className="h-[300px] flex flex-col items-center justify-center relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      innerRadius={80}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Gastos</p>
                  <p className="text-2xl font-bold">$1.85M</p>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {categoryData.slice(0, 3).map((item, i) => (
                  <div key={item.name} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                      <span className="text-slate-600 dark:text-slate-400 font-medium">{item.name}</span>
                    </div>
                    <span className="font-bold">${item.value}k</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card>
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Últimos Movimientos</h3>
              <button className="text-sm font-semibold text-primary hover:underline">Ver todo</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                    <th className="pb-4">Descripción</th>
                    <th className="pb-4">Categoría</th>
                    <th className="pb-4">Fecha</th>
                    <th className="pb-4 text-right">Monto</th>
                    <th className="pb-4 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {transactions.map((t) => (
                    <tr key={t.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.type === 'ingreso' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                            {t.type === 'ingreso' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                          </div>
                          <div>
                            <p className="font-bold text-sm tracking-tight">{t.desc}</p>
                            <p className="text-xs text-slate-500 uppercase font-medium">{t.type}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-sm font-medium text-slate-600 dark:text-slate-400">{t.cat}</td>
                      <td className="py-4 text-sm text-slate-500">{t.date}</td>
                      <td className={`py-4 text-sm font-bold text-right ${t.type === 'ingreso' ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>
                        {t.type === 'ingreso' ? '+' : ''}{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(t.amount)}
                      </td>
                      <td className="py-4 text-right">
                        <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal size={16} className="text-slate-400" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon: Icon, label, active = false, color = "primary" }) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${active
        ? 'bg-primary text-white shadow-lg shadow-primary/20'
        : `text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white ${color === 'rose' ? 'hover:text-rose-500' : ''}`
      }`}>
      <Icon size={20} />
      {label}
    </button>
  );
}
