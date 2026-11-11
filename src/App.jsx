import { useEffect, useState } from 'react';
import { fetchLoanSummary } from './api.js';

const fmt = (n, unit) =>
  `${Number(n).toLocaleString('es-AR', { maximumFractionDigits: 2 })} ${unit}`;

function ProgressCard({ item }) {
  return (
    <div className="card">
      <h3>{item.label}</h3>
      {item.initial != null && (
        <p className="muted">Valor inicial: {fmt(item.initial, item.unit)}</p>
      )}
      <p className="muted">Total actualizado: {fmt(item.total, item.unit)}</p>
      <div className="bar">
        <div className="fill" style={{ width: `${item.pct}%` }} />
      </div>
      <p>
        <strong>{item.pct.toFixed(2)}%</strong> cubierto · pagado {fmt(item.paid, item.unit)}
      </p>
    </div>
  );
}

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLoanSummary().then(setData).catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="error">{error}</p>;
  if (!data) return <p>Cargando...</p>;

  return (
    <main>
      <h1>Crédito hipotecario UVA</h1>
      <p className="muted">
        UVA hoy: {data.sources.uva.value} ({data.sources.uva.source}) · Dólar oficial venta:{' '}
        {data.sources.fx.venta}
      </p>
      <section className="grid">
        {data.items.map((item) => (
          <ProgressCard key={item.key} item={item} />
        ))}
      </section>
    </main>
  );
}
