/* @flow */

import Sequelize from "sequelize";

const AdminModel = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  token: {
    type: Sequelize.STRING
  }
};

export default AdminModel;
