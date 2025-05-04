import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BarraNavegacion from '../components/BarraNavegacion';

const DetalleCurriculum = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidato, setCandidato] = useState(null);

  useEffect(() => {
    const curriculums = JSON.parse(localStorage.getItem('curriculums')) || [];
    const encontrado = curriculums.find((c) => c.id === parseInt(id));
    if (encontrado) setCandidato(encontrado);
    else navigate('/');
  }, [id, navigate]);

  if (!candidato) return <p className="text-center text-gray-600">Cargando...</p>;

  return (
    <>
      <BarraNavegacion />
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-8 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-4xl w-full">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
            Detalle de Currículum
          </h1>
          <div className="flex flex-col md:flex-row items-center">
            {candidato.foto && (
              <img
                src={candidato.foto}
                alt="Foto del candidato"
                className="w-64 h-64 object-cover rounded-lg shadow-md mb-6 md:mb-0 md:mr-8"
              />
            )}
            <div className="text-left space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">{candidato.nombre}</h2>
              <p className="text-gray-600">
                <strong>Email:</strong> {candidato.email}
              </p>
              <p className="text-gray-600">
                <strong>Teléfono:</strong> {candidato.telefono}
              </p>
            </div>
          </div>

         
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Educación</h2>
            <ul className="space-y-4">
              {candidato.educacion.map((edu, index) => (
                <li
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg shadow-md text-gray-700"
                >
                  <p>
                    <strong>Título:</strong> {edu.titulo}
                  </p>
                  <p>
                    <strong>Institución:</strong> {edu.institucion}
                  </p>
                  <p>
                    <strong>Año de Graduación:</strong> {edu.anioGraduacion}
                  </p>
                </li>
              ))}
            </ul>
          </div>

         
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Experiencia Laboral</h2>
            <ul className="space-y-4">
              {candidato.experiencia.map((exp, index) => (
                <li
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg shadow-md text-gray-700"
                >
                  <p>
                    <strong>Empleador:</strong> {exp.empleador}
                  </p>
                  <p>
                    <strong>Cargo:</strong> {exp.cargo}
                  </p>
                  <p>
                    <strong>Fecha de Inicio:</strong> {exp.fechaInicio}
                  </p>
                  <p>
                    <strong>Fecha de Fin:</strong> {exp.fechaFin}
                  </p>
                  <p>
                    <strong>Responsabilidades:</strong> {exp.responsabilidades}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/lista')}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Volver a la lista
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetalleCurriculum;
