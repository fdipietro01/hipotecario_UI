// ← MODIFICAR: URL del BFF (o usar variable VITE_API_URL en web/.env)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function fetchLoanSummary() {
  const res = await fetch(`${API_URL}/api/loan/summary`);
  if (!res.ok) throw new Error('Error al consultar el BFF');
  return res.json();
}
