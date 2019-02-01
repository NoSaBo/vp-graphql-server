/* @flow */

import Sequelize from "sequelize";

const AdminModel = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isAlphanumeric: {
        args: true,
        msg: "El nombre de usuario solo puede contener letras y números"
      },
      len: {
        args: [5, 10],
        msg: "El nombre de usuario debe tener entre 5 y 10 caracteres"
      }
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: {
        args: true,
        msg: "Cuenta de correo inválida"
      }
    }
  },
  password: {
    type: Sequelize.STRING
  }
};

export default AdminModel;
