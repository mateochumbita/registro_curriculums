import { FaSearch } from 'react-icons/fa';

const BarraBusqueda = ({ placeholder, value, onChange, onSearch }) => {
  return (
    <div className="flex items-center bg-white/80 shadow-md rounded-full px-4 py-2 max-w-lg mx-auto backdrop-blur-md">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-400 px-2"
      />
      <button
        onClick={onSearch}
        className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition flex items-center justify-center"
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default BarraBusqueda;
