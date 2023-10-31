import { useEffect, useState } from "react";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
export default function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("USD");
  const [converted, setConverted] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function apiCall() {
      setLoading(true);
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
      );

      const data = await res.json();
      console.log(data, "sdsd");

      setConverted(data.rates[to]);
      setLoading(false);
    }
    if (from === to) return setConverted(amount);
    apiCall();
  }, [amount, from, to]);

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(+e.target.value)}
        disabled={loading}
      />
      <select
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        disabled={loading}
      >
        <option value="USD"> From USD</option>
        <option value="EUR"> From EUR</option>
        <option value="CAD">From CAD</option>
        <option value="INR"> From INR</option>
      </select>
      <select
        value={to}
        onChange={(e) => setTo(e.target.value)}
        disabled={loading}
      >
        <option value="USD">To USD</option>
        <option value="EUR"> To EUR</option>
        <option value="CAD">To CAD</option>
        <option value="INR">To INR</option>
      </select>
      <p>
        OUTPUT:- {converted} {to}
      </p>
    </div>
  );
}
