import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, RefreshCw } from 'lucide-react';
import { currencies } from './data/currencies';
import { CurrencySelect } from './components/CurrencySelect';
import { AmountInput } from './components/AmountInput';

function App() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const mockConversion = () => {
    setLoading(true);
    // Simulate API call with mock conversion rates
    const mockRates: Record<string, number> = {
      'USD-EUR': 0.92,
      'EUR-USD': 1.09,
      'GBP-USD': 1.27,
      'USD-GBP': 0.79,
      // Add more mock rates as needed
    };

    setTimeout(() => {
      const rate = mockRates[`${fromCurrency}-${toCurrency}`] || Math.random() * (1.5 - 0.5) + 0.5;
      setConvertedAmount(parseFloat(amount) * rate);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      mockConversion();
    }
  }, [amount, fromCurrency, toCurrency]);

  const fromCurrencySymbol = currencies.find(c => c.code === fromCurrency)?.symbol || '';
  const toCurrencySymbol = currencies.find(c => c.code === toCurrency)?.symbol || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Currency Converter
        </h1>

        <div className="space-y-4">
          <AmountInput
            value={amount}
            onChange={setAmount}
            label="Amount"
          />

          <div className="relative">
            <CurrencySelect
              currencies={currencies}
              value={fromCurrency}
              onChange={setFromCurrency}
              label="From Currency"
            />

            <button
              onClick={handleSwapCurrencies}
              className="absolute right-[-12px] top-1/2 transform translate-x-full -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md transition-colors"
            >
              <ArrowRightLeft className="h-4 w-4" />
            </button>
          </div>

          <CurrencySelect
            currencies={currencies}
            value={toCurrency}
            onChange={setToCurrency}
            label="To Currency"
          />
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Converted Amount</p>
              {loading ? (
                <div className="flex items-center space-x-2">
                  <RefreshCw className="h-5 w-5 animate-spin text-blue-500" />
                  <span className="text-gray-400">Converting...</span>
                </div>
              ) : (
                <p className="text-2xl font-bold text-gray-900">
                  {convertedAmount !== null && (
                    <>
                      {toCurrencySymbol}{convertedAmount.toFixed(2)}
                    </>
                  )}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Original Amount</p>
              <p className="text-lg font-semibold text-gray-700">
                {fromCurrencySymbol}{parseFloat(amount || '0').toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-center text-gray-500 mt-4">
          Exchange rates are for demonstration purposes only
        </p>
      </div>
    </div>
  );
}

export default App;