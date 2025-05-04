import { useNavigate } from 'react-router-dom';

const TarjetaCandidato = ({ candidato, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl shadow-lg bg-white overflow-hidden max-w-sm mx-auto transition-transform transform hover:scale-105">
   
      {candidato.foto ? (
        <img
          src={candidato.foto}
          alt={`Foto de ${candidato.nombre}`}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
          Sin Foto
        </div>
      )}

      <div className="p-6 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{candidato.nombre}</h2>
        <p className="text-gray-600 mb-4">{candidato.email}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate(`/detalle/${candidato.id}`)}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Ver Detalle
          </button>
          <button
            onClick={() => onDelete(candidato.id)}
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TarjetaCandidato;
