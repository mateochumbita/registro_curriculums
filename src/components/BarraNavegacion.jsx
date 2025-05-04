import { Link } from 'react-router-dom';

const BarraNavegacion = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
     
        <h1 className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-200 transition">
            Registro de Currículums
          </Link>
        </h1>

 
        <div className="flex space-x-4">
          <Link
            to="/"
            className="py-2 px-4 bg-blue-700 rounded-full hover:bg-blue-800 transition text-sm font-medium"
          >
            Inicio
          </Link>
          <Link
            to="/lista"
            className="py-2 px-4 bg-blue-700 rounded-full hover:bg-blue-800 transition text-sm font-medium"
          >
            Listado
          </Link>
          <Link
            to="/filtros"
            className="py-2 px-4 bg-blue-700 rounded-full hover:bg-blue-800 transition text-sm font-medium"
          >
            Filtrar
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default BarraNavegacion;