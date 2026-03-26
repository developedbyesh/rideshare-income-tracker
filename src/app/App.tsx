import { useState } from 'react';
import { LayoutDashboard, Calculator, Zap, Calendar } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { IncomeExpenseForm } from './components/IncomeExpenseForm';
import { QuickEstimate } from './components/QuickEstimate';

type ViewType = 'dashboard' | 'form' | 'quick';
type PeriodType = 'weekly' | 'monthly' | 'yearly';

export default function App() {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [period, setPeriod] = useState<PeriodType>('weekly');
  const [grossIncome, setGrossIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState({
    fuel: 0,
    maintenance: 0,
    insurance: 0,
    financing: 0,
    gst: 0,
    tax: 0,
    other: 0,
  });

  const handleQuickEstimate = (income: number, totalExpenses: number) => {
    setGrossIncome(income);
    const gst = income * 0.1;
    const tax = income * 0.25;
    const remainingExpenses = Math.max(0, totalExpenses - gst - tax);
    const perCategory = remainingExpenses / 4;

    setExpenses({
      fuel: perCategory,
      maintenance: perCategory,
      insurance: perCategory,
      financing: perCategory,
      gst,
      tax,
      other: 0,
    });
    setActiveView('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div>
              <h1 className="text-2xl text-slate-900">Rideshare Income Tracker</h1>
              <p className="text-sm text-slate-500">For Australian drivers (Uber, DiDi & more)</p>
            </div>

            {/* Period Selector */}
            <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
              <button
                onClick={() => setPeriod('weekly')}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  period === 'weekly'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setPeriod('monthly')}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  period === 'monthly'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setPeriod('yearly')}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  period === 'yearly'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex gap-1 -mb-px">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeView === 'dashboard'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="text-sm">Dashboard</span>
            </button>
            <button
              onClick={() => setActiveView('form')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeView === 'form'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span className="text-sm">Income & Expenses</span>
            </button>
            <button
              onClick={() => setActiveView('quick')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeView === 'quick'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span className="text-sm">Quick Estimate</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'dashboard' && (
          <Dashboard grossIncome={grossIncome} expenses={expenses} period={period} />
        )}
        {activeView === 'form' && (
          <IncomeExpenseForm
            grossIncome={grossIncome}
            setGrossIncome={setGrossIncome}
            expenses={expenses}
            setExpenses={setExpenses}
            period={period}
          />
        )}
        {activeView === 'quick' && (
          <QuickEstimate onUseEstimate={handleQuickEstimate} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-slate-500">
            Built for rideshare drivers in Australia 🇦🇺 • Track your real earnings, maximize your profit
          </p>
        </div>
      </footer>
    </div>
  );
}