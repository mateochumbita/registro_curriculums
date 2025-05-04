import { useState } from 'react';
import TarjetaCandidato from './TarjetaCandidato';
import BarraBusqueda from './BarraBusqueda';
import BarraNavegacion from './BarraNavegacion';

const PanelFiltros = () => {
  const [filtro, setFiltro] = useState('');
  const [resultados, setResultados] = useState([]);

  const handleFiltrar = () => {
    const curriculums = JSON.parse(localStorage.getItem('curriculums')) || [];
    const filtrados = curriculums.filter((c) =>
      c.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      c.experiencia.some((exp) =>
        exp.cargo.toLowerCase().includes(filtro.toLowerCase())
      ) ||
      c.educacion.some((edu) =>
        edu.titulo.toLowerCase().includes(filtro.toLowerCase())
      )
    );
    setResultados(filtrados);
  };

  return (
    <>
      <BarraNavegacion />
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-8">
        <h1 className="text-4xl font-extrabold text-white text-center mb-8">
          Filtrar Candidatos
        </h1>
        <div className="mb-8 max-w-3xl mx-auto">
          <BarraBusqueda
            placeholder="Buscar por nombre, experiencia o educación"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            onSearch={handleFiltrar}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {resultados.length > 0 ? (
            resultados.map((candidato) => (
              <TarjetaCandidato
                key={candidato.id}
                candidato={candidato}
                onDelete={() => {}}
              />
            ))
          ) : (
            <p className="text-center text-white col-span-full">
              No se encontraron resultados.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default PanelFiltros;
