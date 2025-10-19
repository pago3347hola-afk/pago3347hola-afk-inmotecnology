// NO imports, NO client components.
// Un 404 mínimo para que el build nunca falle.
export default function NotFound() {
  return (
    <main style={{maxWidth: 720, margin: '40px auto', padding: 16}}>
      <h1>404 — Página no encontrada</h1>
      <p>La ruta que buscaste no existe.</p>
      <a href="/">← Volver al inicio</a>
    </main>
  );
}
