import { Persona } from "../models/person.model.js";

const createPerson = data => {
  const {
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    tipoIdentificacion,
    numeroIdentificacion,
    fechaNacimiento,
    direccion
  } = data;

  const newPerson = Persona.create({
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    tipoIdentificacion,
    numeroIdentificacion,
    fechaNacimiento,
    direccion
  });

  return newPerson;
};

const updatePerson = data => {
  const {
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    tipoIdentificacion,
    numeroIdentificacion,
    fechaNacimiento,
    direccion,
    idPersona

  } = data;


  return Persona.update(
    {
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      tipoIdentificacion,
      numeroIdentificacion,
      fechaNacimiento,
      direccion
    },
    { where: { idPersona } }
  );
};
const deletePerson = idPersona => {
  return Persona.destroy({ where: { idPersona } });
};

export { createPerson, updatePerson, deletePerson };
