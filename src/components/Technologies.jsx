function Technologies() {
  return (
    <div className="mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">🛠 Tecnologías y Funcionalidades</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li><strong>React</strong>: Framework para construir la interfaz de usuario.</li>
        <li><strong>Vite</strong>: Servidor de desarrollo ultrarrápido y bundler.</li>
        <li><strong>Tailwind CSS</strong>: Framework utility-first para estilos rápidos y responsivos.</li>
        <li><strong>Axios</strong>: Librería HTTP para consumir la API-Football.</li>
        <li><strong>Chart.js + react-chartjs-2</strong>: Gráficos dinámicos de goles por jugador.</li>
        <li><strong>API-Football</strong>: Datos reales de jugadores, equipos y temporadas.</li>
        <li><strong>FlagsAPI</strong>: Banderas de los países de los jugadores.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-2">✨ Funcionalidades:</h3>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>Selector de temporada (2022, 2023, etc.).</li>
        <li>Gráfico de barras con los máximos goleadores.</li>
        <li>Listado de jugadores con foto, escudo, bandera y nombre del equipo.</li>
        <li>Diseño responsive adaptado a desktop y mobile.</li>
      </ul>
    </div>
  );
}

export default Technologies;
