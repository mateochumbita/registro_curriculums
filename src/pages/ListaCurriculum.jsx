import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TarjetaCandidato from '../components/TarjetaCandidato';
import BarraNavegacion from '../components/BarraNavegacion';

const ListaCurriculum = () => {
  const [curriculums, setCurriculums] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('curriculums')) || [];
    setCurriculums(data);
  }, []);

  const handleDelete = (id) => {
    const nuevos = curriculums.filter((c) => c.id !== id);
    setCurriculums(nuevos);
    localStorage.setItem('curriculums', JSON.stringify(nuevos));
  };

  return (
    <>
      <BarraNavegacion />
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-8">
        <h1 className="text-4xl font-extrabold text-white text-center mb-8">
          Lista de Candidatos
        </h1>

        {curriculums.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {curriculums.map((candidato) => (
              <TarjetaCandidato
                key={candidato.id}
                candidato={candidato}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-white">
            <p className="text-lg mb-4">No hay candidatos registrados.</p>
            <Link
              to="/registrar"
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
            >
              Registrar Nuevo Candidato
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default ListaCurriculum;
