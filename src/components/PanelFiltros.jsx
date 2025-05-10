import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TarjetaCandidato from './TarjetaCandidato';
import BarraBusqueda from './BarraBusqueda';
import BarraNavegacion from './BarraNavegacion';

const PanelFiltros = () => {
  const [filtro, setFiltro] = useState('');
  const [resultados, setResultados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
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
    }, 300); 

    return () => clearTimeout(timeoutId); 
  }, [filtro]);

  const handleDelete = (id) => {
    const curriculums = JSON.parse(localStorage.getItem('curriculums')) || [];
    const actualizados = curriculums.filter((candidato) => candidato.id !== id);
    localStorage.setItem('curriculums', JSON.stringify(actualizados));
    setResultados(resultados.filter((candidato) => candidato.id !== id));
    alert('Candidato eliminado exitosamente.');
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
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {resultados.length > 0 ? (
            resultados.map((candidato) => (
              <TarjetaCandidato
                key={candidato.id}
                candidato={candidato}
                onDelete={() => handleDelete(candidato.id)}
              />
            ))
          ) : (
            <div className="text-center text-white col-span-full">
              <p>No se encontraron resultados.</p>
              <button
                onClick={() => navigate('/registrar')}
                className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
              >
                Registrar nuevo candidato
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PanelFiltros;
