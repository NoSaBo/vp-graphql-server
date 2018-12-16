import Sequelize from "sequelize";

const ServiceShiftModel = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false
  },
  begin: {
    type: Sequelize.STRING,
    allowNull: false
  },
  end: {
    type: Sequelize.STRING,
    allowNull: false
  }
};

export default ServiceShiftModel;
