import Sequelize from "sequelize";

const BranchModel = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  branchName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  latitude: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  longitude: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
};

export default BranchModel;
