export const validarFormulario = (datos) => {
  const errores = [];

  // Validar datos personales
  if (!datos.nombre.trim()) errores.push('Nombre requerido');
  if (!/\S+@\S+\.\S+/.test(datos.email)) errores.push('Email inválido');
  if (!/^\d{7,15}$/.test(datos.telefono)) errores.push('Teléfono inválido');

  // Validar educación
  datos.educacion.forEach((edu, index) => {
    if (!edu.titulo.trim()) errores.push(`Título de educación requerido en entrada ${index + 1}`);
    if (!edu.institucion.trim()) errores.push(`Institución educativa requerida en entrada ${index + 1}`);
    if (!edu.anioGraduacion || isNaN(edu.anioGraduacion)) {
      errores.push(`Año de graduación inválido en entrada ${index + 1}`);
    }
  });

  // Validar experiencia laboral
  datos.experiencia.forEach((exp, index) => {
    if (!exp.empleador.trim()) errores.push(`Nombre del empleador requerido en entrada ${index + 1}`);
    if (!exp.cargo.trim()) errores.push(`Cargo requerido en entrada ${index + 1}`);
    if (!exp.fechaInicio) errores.push(`Fecha de inicio requerida en entrada ${index + 1}`);
    if (!exp.fechaFin) errores.push(`Fecha de fin requerida en entrada ${index + 1}`);
    if (!exp.responsabilidades.trim()) {
      errores.push(`Descripción de responsabilidades requerida en entrada ${index + 1}`);
    }
  });

  return errores;
};
