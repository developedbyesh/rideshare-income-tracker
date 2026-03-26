import { Fuel, Wrench, Shield, CreditCard, Receipt, FileText, DollarSign, Info } from 'lucide-react';
import { useState } from 'react';

interface IncomeExpenseFormProps {
  grossIncome: number;
  setGrossIncome: (value: number) => void;
  expenses: {
    fuel: number;
    maintenance: number;
    insurance: number;
    financing: number;
    gst: number;
    tax: number;
    other: number;
  };
  setExpenses: (expenses: any) => void;
  period: 'weekly' | 'monthly' | 'yearly';
}

export function IncomeExpenseForm({ grossIncome, setGrossIncome, expenses, setExpenses, period }: IncomeExpenseFormProps) {
  const [autoCalculateGST, setAutoCalculateGST] = useState(true);
  const [autoCalculateTax, setAutoCalculateTax] = useState(true);

  const handleIncomeChange = (value: number) => {
    setGrossIncome(value);
    if (autoCalculateGST) {
      updateGST(value);
    }
    if (autoCalculateTax) {
      updateTax(value);
    }
  };

  const updateGST = (income: number) => {
    const gst = income * 0.1;
    setExpenses({ ...expenses, gst });
  };

  const updateTax = (income: number) => {
    let taxRate = 0;
    const yearlyIncome = period === 'weekly' ? income * 52 : period === 'monthly' ? income * 12 : income;

    if (yearlyIncome <= 18200) {
      taxRate = 0;
    } else if (yearlyIncome <= 45000) {
      taxRate = 0.19;
    } else if (yearlyIncome <= 120000) {
      taxRate = 0.325;
    } else if (yearlyIncome <= 180000) {
      taxRate = 0.37;
    } else {
      taxRate = 0.45;
    }

    const periodMultiplier = period === 'weekly' ? 1/52 : period === 'monthly' ? 1/12 : 1;
    const tax = yearlyIncome * taxRate * periodMultiplier;
    setExpenses({ ...expenses, tax });
  };

  const getPeriodLabel = () => {
    switch (period) {
      case 'weekly': return 'Weekly';
      case 'monthly': return 'Monthly';
      case 'yearly': return 'Yearly';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-1">Income & Expenses</h2>
        <p className="text-sm text-slate-500">{getPeriodLabel()} breakdown</p>
      </div>

      {/* Income Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg">Gross Income</h3>
        </div>
        <div>
          <label className="text-sm text-slate-600 mb-2 block">Total earnings before expenses</label>
          <input
            type="number"
            value={grossIncome || ''}
            onChange={(e) => handleIncomeChange(Number(e.target.value))}
            placeholder="0"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
        </div>
      </div>

      {/* Expenses Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-lg mb-5">Expenses</h3>

        <div className="space-y-4">
          {/* Fuel */}
          <div>
            <label className="flex items-center gap-2 text-sm text-slate-600 mb-2">
              <Fuel className="w-4 h-4 text-red-500" />
              Fuel Costs
            </label>
            <input
              type="number"
              value={expenses.fuel || ''}
              onChange={(e) => setExpenses({ ...expenses, fuel: Number(e.target.value) })}
              placeholder="0"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Maintenance */}
          <div>
            <label className="flex items-center gap-2 text-sm text-slate-600 mb-2">
              <Wrench className="w-4 h-4 text-orange-500" />
              Car Maintenance & Repairs
            </label>
            <input
              type="number"
              value={expenses.maintenance || ''}
              onChange={(e) => setExpenses({ ...expenses, maintenance: Number(e.target.value) })}
              placeholder="0"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Insurance */}
          <div>
            <label className="flex items-center gap-2 text-sm text-slate-600 mb-2">
              <Shield className="w-4 h-4 text-yellow-500" />
              Insurance
            </label>
            <input
              type="number"
              value={expenses.insurance || ''}
              onChange={(e) => setExpenses({ ...expenses, insurance: Number(e.target.value) })}
              placeholder="0"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Financing */}
          <div>
            <label className="flex items-center gap-2 text-sm text-slate-600 mb-2">
              <CreditCard className="w-4 h-4 text-green-500" />
              Vehicle Financing / Lease
            </label>
            <input
              type="number"
              value={expenses.financing || ''}
              onChange={(e) => setExpenses({ ...expenses, financing: Number(e.target.value) })}
              placeholder="0"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* GST */}
          <div>
            <label className="flex items-center gap-2 text-sm text-slate-600 mb-2">
              <Receipt className="w-4 h-4 text-cyan-500" />
              GST (10%)
              <div className="relative group">
                <Info className="w-3 h-3 text-slate-400 cursor-help" />
                <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-slate-800 text-white text-xs rounded-lg z-10">
                  In Australia, if you're registered for GST, you need to pay 10% of your income to the ATO. This is automatically calculated.
                </div>
              </div>
            </label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={autoCalculateGST}
                onChange={(e) => {
                  setAutoCalculateGST(e.target.checked);
                  if (e.target.checked) updateGST(grossIncome);
                }}
                className="rounded"
              />
              <span className="text-xs text-slate-500">Auto-calculate (10% of gross income)</span>
            </div>
            <input
              type="number"
              value={expenses.gst || ''}
              onChange={(e) => setExpenses({ ...expenses, gst: Number(e.target.value) })}
              disabled={autoCalculateGST}
              placeholder="0"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>

          {/* Income Tax */}
          <div>
            <label className="flex items-center gap-2 text-sm text-slate-600 mb-2">
              <FileText className="w-4 h-4 text-purple-500" />
              Income Tax Estimate
              <div className="relative group">
                <Info className="w-3 h-3 text-slate-400 cursor-help" />
                <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-slate-800 text-white text-xs rounded-lg z-10">
                  Estimated based on Australian tax brackets (2025-26). This is an estimate only - consult a tax professional for accurate advice.
                </div>
              </div>
            </label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={autoCalculateTax}
                onChange={(e) => {
                  setAutoCalculateTax(e.target.checked);
                  if (e.target.checked) updateTax(grossIncome);
                }}
                className="rounded"
              />
              <span className="text-xs text-slate-500">Auto-calculate based on tax brackets</span>
            </div>
            <input
              type="number"
              value={expenses.tax || ''}
              onChange={(e) => setExpenses({ ...expenses, tax: Number(e.target.value) })}
              disabled={autoCalculateTax}
              placeholder="0"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>

          {/* Other */}
          <div>
            <label className="flex items-center gap-2 text-sm text-slate-600 mb-2">
              <DollarSign className="w-4 h-4 text-pink-500" />
              Other Expenses
            </label>
            <input
              type="number"
              value={expenses.other || ''}
              onChange={(e) => setExpenses({ ...expenses, other: Number(e.target.value) })}
              placeholder="Car washes, tolls, etc."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-xs text-amber-800">
          <strong>Disclaimer:</strong> Tax and GST estimates are indicative only and should not be considered financial or tax advice.
          Please consult with a qualified accountant or tax professional for accurate calculations specific to your situation.
        </p>
      </div>
    </div>
  );
}
