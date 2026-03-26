import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface DashboardProps {
  grossIncome: number;
  expenses: {
    fuel: number;
    maintenance: number;
    insurance: number;
    financing: number;
    gst: number;
    tax: number;
    other: number;
  };
  period: 'weekly' | 'monthly' | 'yearly';
}

export function Dashboard({ grossIncome, expenses, period }: DashboardProps) {
  const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + val, 0);
  const netProfit = grossIncome - totalExpenses;
  const profitMargin = grossIncome > 0 ? ((netProfit / grossIncome) * 100).toFixed(1) : 0;

  const expenseData = [
    { name: 'Fuel', value: expenses.fuel, color: '#ef4444' },
    { name: 'Maintenance', value: expenses.maintenance, color: '#f97316' },
    { name: 'Insurance', value: expenses.insurance, color: '#f59e0b' },
    { name: 'Financing', value: expenses.financing, color: '#84cc16' },
    { name: 'GST (10%)', value: expenses.gst, color: '#06b6d4' },
    { name: 'Income Tax', value: expenses.tax, color: '#8b5cf6' },
    { name: 'Other', value: expenses.other, color: '#ec4899' },
  ].filter(item => item.value > 0);

  const getPeriodLabel = () => {
    switch (period) {
      case 'weekly': return 'This Week';
      case 'monthly': return 'This Month';
      case 'yearly': return 'This Year';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-1">Dashboard</h2>
        <p className="text-sm text-slate-500">{getPeriodLabel()}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Gross Income */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-slate-500">Gross Income</p>
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl text-slate-900">${grossIncome.toLocaleString()}</p>
        </div>

        {/* Total Expenses */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-slate-500">Total Expenses</p>
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <p className="text-3xl text-red-600">${totalExpenses.toLocaleString()}</p>
        </div>

        {/* Net Profit */}
        <div className={`rounded-2xl p-6 shadow-sm border ${netProfit >= 0 ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-100' : 'bg-gradient-to-br from-red-50 to-rose-50 border-red-100'}`}>
          <div className="flex items-center justify-between mb-3">
            <p className={`text-sm ${netProfit >= 0 ? 'text-green-700' : 'text-red-700'}`}>Net Profit</p>
            <div className={`w-10 h-10 rounded-full ${netProfit >= 0 ? 'bg-green-100' : 'bg-red-100'} flex items-center justify-center`}>
              <TrendingUp className={`w-5 h-5 ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`} />
            </div>
          </div>
          <p className={`text-4xl ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${netProfit.toLocaleString()}
          </p>
          <p className={`text-sm mt-2 ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {profitMargin}% profit margin
          </p>
        </div>
      </div>

      {/* Expense Breakdown Chart */}
      {expenseData.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg mb-4">Expense Breakdown</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Insights */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <h3 className="text-lg text-blue-900 mb-3">💡 Quick Insights</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          {expenses.fuel > grossIncome * 0.25 && (
            <li>• Your fuel costs are high ({((expenses.fuel / grossIncome) * 100).toFixed(0)}% of income). Consider fuel-efficient routes.</li>
          )}
          {netProfit < 0 && (
            <li>• You're currently operating at a loss. Review your expenses and consider ways to increase income.</li>
          )}
          {netProfit > 0 && Number(profitMargin) > 50 && (
            <li>• Great job! You're maintaining a healthy {profitMargin}% profit margin.</li>
          )}
          {expenses.gst === 0 && grossIncome > 0 && (
            <li>• Remember to account for GST (10%) if you're registered for GST.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
