import { Link } from 'react-router-dom';
import { FaUserPlus, FaList, FaFilter } from 'react-icons/fa';

const Inicio = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center space-y-6 w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Registro de Currículos
        </h1>
        <p className="text-gray-600 text-lg">
          Bienvenido a la plataforma de gestión de candidatos. Administra y filtra currículos fácilmente.
        </p>

        <div className="flex flex-col space-y-4">
          <Link
            to="/registrar"
            className="flex items-center justify-center bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
          >
            <FaUserPlus className="mr-2" />
            Registrar Nuevo Candidato
          </Link>
          <Link
            to="/lista"
            className="flex items-center justify-center bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition text-lg font-semibold"
          >
            <FaList className="mr-2" />
            Ver Currículos Registrados
          </Link>
          <Link
            to="/filtros"
            className="flex items-center justify-center bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition text-lg font-semibold"
          >
            <FaFilter className="mr-2" />
            Filtrar Candidatos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
