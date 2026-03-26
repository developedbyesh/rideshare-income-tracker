import { Zap, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface QuickEstimateProps {
  onUseEstimate: (income: number, expenses: number) => void;
}

export function QuickEstimate({ onUseEstimate }: QuickEstimateProps) {
  const [income, setIncome] = useState<number>(0);
  const [roughExpenses, setRoughExpenses] = useState<number>(0);

  const netProfit = income - roughExpenses;
  const profitMargin = income > 0 ? ((netProfit / income) * 100).toFixed(1) : 0;

  const handleUseEstimate = () => {
    const gst = income * 0.1;
    const tax = income * 0.25;
    const remainingExpenses = roughExpenses - gst - tax;
    const perCategory = Math.max(0, remainingExpenses / 4);

    onUseEstimate(income, roughExpenses);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl">Quick Estimate</h2>
        </div>
        <p className="text-sm text-slate-500">Get instant results with rough numbers</p>
      </div>

      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
        <h3 className="text-lg mb-4 text-yellow-900">Fast Income Check</h3>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-yellow-900 mb-2 block">Rough Income (this period)</label>
            <input
              type="number"
              value={income || ''}
              onChange={(e) => setIncome(Number(e.target.value))}
              placeholder="e.g., 1500"
              className="w-full px-4 py-3 rounded-xl border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
            />
          </div>

          <div>
            <label className="text-sm text-yellow-900 mb-2 block">Rough Total Expenses</label>
            <input
              type="number"
              value={roughExpenses || ''}
              onChange={(e) => setRoughExpenses(Number(e.target.value))}
              placeholder="e.g., 800"
              className="w-full px-4 py-3 rounded-xl border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
            />
          </div>
        </div>

        {income > 0 && (
          <div className="mt-6 pt-6 border-t border-yellow-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-yellow-900">Quick Net Profit:</span>
              <span className={`text-2xl ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${netProfit.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-yellow-900">Profit Margin:</span>
              <span className={`text-lg ${Number(profitMargin) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {profitMargin}%
              </span>
            </div>
          </div>
        )}

        <div className="mt-6">
          <p className="text-xs text-yellow-800 mb-3">
            Want a detailed breakdown? Use the full calculator for accurate expense tracking.
          </p>
          <button
            onClick={handleUseEstimate}
            disabled={income === 0}
            className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
          >
            Use This Estimate
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-lg mb-3">Why use detailed tracking?</h3>
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>See exactly where your money goes with expense breakdown charts</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Automatic GST and tax calculations based on Australian rates</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Track trends over time to optimize your earnings</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Get personalized insights to improve profitability</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
