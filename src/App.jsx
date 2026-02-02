import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { Wallet, TrendingUp, TrendingDown, Calendar, Search, Plus, Bell, LayoutDashboard, Receipt, BarChart3, Settings } from 'lucide-react';

const mockData = [
  { name: 'Ene', ingresos: 4000, gastos: 2400 },
  { name: 'Feb', ingresos: 3000, gastos: 1398 },
  { name: 'Mar', ingresos: 2000, gastos: 8000 },
  { name: 'Abr', ingresos: 2780, gastos: 3908 },
  { name: 'May', ingresos: 4890, gastos: 4800 },
];

const categoryData = [
  { name: 'Alimentación', value: 400 },
  { name: 'Transporte', value: 300 },
  { name: 'Ocio', value: 200 },
];

const COLORS = ['#2563eb', '#10b981', '#f43f5e'];

export default function App() {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <div style={{ width: '40px', height: '40px', background: '#2563eb', borderRadius: '10px', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>P</div>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>PlataBot V2</h1>
        </div>
        <nav style={{ display: 'grid', gap: '8px' }}>
          <button style={{ border: 'none', background: '#2563eb', color: 'white', padding: '12px', borderRadius: '10px', display: 'flex', gap: '12px', cursor: 'pointer', fontWeight: 'bold' }}><LayoutDashboard size={20} /> Dashboard</button>
          <button style={{ border: 'none', background: 'transparent', padding: '12px', borderRadius: '10px', display: 'flex', gap: '12px', cursor: 'pointer', color: '#64748b' }}><Receipt size={20} /> Movimientos</button>
          <button style={{ border: 'none', background: 'transparent', padding: '12px', borderRadius: '10px', display: 'flex', gap: '12px', cursor: 'pointer', color: '#64748b' }}><BarChart3 size={20} /> Reportes</button>
          <button style={{ border: 'none', background: 'transparent', padding: '12px', borderRadius: '10px', display: 'flex', gap: '12px', cursor: 'pointer', color: '#64748b' }}><Settings size={20} /> Config</button>
        </nav>
      </aside>

      <main className="main-content">
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <h2 style={{ fontSize: '28px', margin: 0 }}>Bienvenido de nuevo 👋</h2>
            <p style={{ color: '#64748b', marginTop: '4px' }}>Tus 437 registros históricos ya están sincronizados.</p>
          </div>
          <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>+ Nuevo Gasto</button>
        </header>

        <div className="stat-grid">
          <StatCard title="Balance Total" value="$12,450,000" icon={Wallet} color="#3b82f6" />
          <StatCard title="Ingresos" value="$3,200,000" icon={TrendingUp} color="#10b981" />
          <StatCard title="Gastos" value="$1,850,000" icon={TrendingDown} color="#f43f5e" />
        </div>

        <div className="chart-grid">
          <div className="card">
            <h3 style={{ margin: '0 0 24px 0' }}>Evolución Mensual</h3>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="ingresos" stroke="#2563eb" fill="#2563eb" fillOpacity={0.1} strokeWidth={3} />
                  <Area type="monotone" dataKey="gastos" stroke="#94a3b8" fill="transparent" strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <h3 style={{ margin: '0 0 24px 0' }}>Categorías</h3>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {categoryData.map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="card" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 8px 0' }}>{title}</p>
        <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{value}</p>
      </div>
      <div style={{ padding: '12px', borderRadius: '12px', background: color + '10', color: color }}>
        <Icon size={24} />
      </div>
    </div>
  );
}
