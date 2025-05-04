import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validarFormulario } from "../services/validacionesFormularios";
import BarraNavegacion from "./BarraNavegacion";
import { FaTrash } from "react-icons/fa"; // Importamos el ícono de basura

const FormularioCandidato = () => {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    telefono: "",
    educacion: [{ titulo: "", institucion: "", anioGraduacion: "" }],
    experiencia: [
      {
        empleador: "",
        cargo: "",
        fechaInicio: "",
        fechaFin: "",
        responsabilidades: "",
      },
    ],
    foto: "",
  });

  const handleChange = (e, index, section) => {
    const { name, value, files } = e.target;

    if (name === "foto") {
      const file = files[0];
      if (file && !file.type.startsWith("image/")) {
        alert(
          "Por favor, selecciona un archivo de imagen válido (jpg, png, etc.)."
        );
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setFormulario({ ...formulario, foto: reader.result });
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else if (section) {
      const updatedSection = [...formulario[section]];
      updatedSection[index][name] = value;
      setFormulario({ ...formulario, [section]: updatedSection });
    } else {
      setFormulario({ ...formulario, [name]: value });
    }
  };

  const handleAdd = (section) => {
    const newEntry =
      section === "educacion"
        ? { titulo: "", institucion: "", anioGraduacion: "" }
        : {
            empleador: "",
            cargo: "",
            fechaInicio: "",
            fechaFin: "",
            responsabilidades: "",
          };
    setFormulario({
      ...formulario,
      [section]: [...formulario[section], newEntry],
    });
  };

  const handleDelete = (section, index) => {
    if (formulario[section].length > 1) {
      const updatedSection = [...formulario[section]];
      updatedSection.splice(index, 1);
      setFormulario({ ...formulario, [section]: updatedSection });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errores = validarFormulario(formulario);
    if (errores.length === 0) {
      const curriculums = JSON.parse(localStorage.getItem("curriculums")) || [];
      const nuevo = { ...formulario, id: Date.now() };
      curriculums.push(nuevo);
      localStorage.setItem("curriculums", JSON.stringify(curriculums));
      navigate("/lista");
    } else {
      alert("Errores: " + errores.join(", "));
    }
  };

  return (
    <>
      <BarraNavegacion />
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center py-8">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
            Registrar Candidato
          </h1>
          <form onSubmit={handleSubmit} className="space-y-8">
           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                name="nombre"
                onChange={handleChange}
                placeholder="Nombre completo"
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                name="email"
                onChange={handleChange}
                placeholder="Correo electrónico"
                required
                type="email"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                name="telefono"
                onChange={handleChange}
                placeholder="Teléfono"
                required
                type="tel"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="file"
                name="foto"
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

           
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Educación
              </h2>
              {formulario.educacion.map((edu, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-center"
                >
                  <input
                    name="titulo"
                    value={edu.titulo}
                    onChange={(e) => handleChange(e, index, "educacion")}
                    placeholder="Título obtenido"
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <input
                    name="institucion"
                    value={edu.institucion}
                    onChange={(e) => handleChange(e, index, "educacion")}
                    placeholder="Institución educativa"
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <input
                    name="anioGraduacion"
                    value={edu.anioGraduacion}
                    onChange={(e) => handleChange(e, index, "educacion")}
                    placeholder="Año de graduación"
                    required
                    type="number"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  {index > 0 && ( 
                    <button
                      type="button"
                      onClick={() => handleDelete("educacion", index)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAdd("educacion")}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
              >
                Añadir Educación
              </button>
            </div>

          
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Experiencia Laboral
              </h2>
              {formulario.experiencia.map((exp, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 items-center"
                >
                  <input
                    name="empleador"
                    value={exp.empleador}
                    onChange={(e) => handleChange(e, index, "experiencia")}
                    placeholder="Nombre del empleador"
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <input
                    name="cargo"
                    value={exp.cargo}
                    onChange={(e) => handleChange(e, index, "experiencia")}
                    placeholder="Cargo"
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <input
                    name="fechaInicio"
                    value={exp.fechaInicio}
                    onChange={(e) => handleChange(e, index, "experiencia")}
                    placeholder="Fecha de inicio"
                    required
                    type="date"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <input
                    name="fechaFin"
                    value={exp.fechaFin}
                    onChange={(e) => handleChange(e, index, "experiencia")}
                    placeholder="Fecha de fin"
                    required
                    type="date"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <textarea
                    name="responsabilidades"
                    value={exp.responsabilidades}
                    onChange={(e) => handleChange(e, index, "experiencia")}
                    placeholder="Descripción de responsabilidades"
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 col-span-2"
                  />
                  {index > 0 && ( 
                    <button
                      type="button"
                      onClick={() => handleDelete("experiencia", index)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAdd("experiencia")}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
              >
                Añadir Experiencia
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Guardar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormularioCandidato;
