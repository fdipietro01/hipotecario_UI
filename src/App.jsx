import { useEffect, useState } from "react";
import { fetchLoanSummary } from "./api.js";

const fmt = (n, unit) =>
  unit === currency.UVA
    ? ` ${Number(n).toLocaleString("es-AR", {
        maximumFractionDigits: 2,
      })} ${unit}`
    : `${unit} ${Number(n).toLocaleString("es-AR", {
        maximumFractionDigits: 2,
      })}`;

const currency = { ARS: "$", USD: "USD", UVA: "Uva" };

function ProgressCard({ item: loadData }) {
  return (
    <div className="card">
      <h3>{loadData.label}</h3>

      <p className="muted">
      Deuda inicial Uva: {fmt(loadData.initial, currency.UVA)}
      </p>
      <p className="muted">
      Deuda inicial en pesos : {fmt(loadData.totalArs, currency.ARS)}
      </p>
      <p className="muted">
      Deuda inicial en dólares : {fmt(loadData.totalUsd, currency.USD)}
      </p>

      <div className="bar">
        <div className="fill" style={{ width: `${loadData.paidUvaPct}%` }} />
      </div>
      <p className="muted">
        Monto cancelado: {fmt(loadData.paidUva, currency.UVA)} - <strong>{loadData.paidUvaPct.toFixed(2)}%</strong> cubierto
      </p>
      <p className="muted">
        Total actualizado: {fmt(loadData.totalUva, currency.UVA)} - <strong>{loadData.remainingDebtUvaPct.toFixed(2)}%</strong> restante
      </p>
    </div>
  );
}

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLoanSummary()
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="error">{error}</p>;
  if (!data) return <p>Cargando...</p>;

  return (
    <main>
      <h1>Crédito hipotecario UVA</h1>
      <p className="muted">
        <strong>UVA hoy:</strong> {data.sources.uva.value} ({data.sources.uva.source}) · <strong>Dólar
        oficial venta:</strong> {data.sources.fx.venta}
      </p>
      <section className="grid">{<ProgressCard item={data.debt} />}</section>
    </main>
  );
}
