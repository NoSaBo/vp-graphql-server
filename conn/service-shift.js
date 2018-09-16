import Sequelize from "sequelize";

const ServiceShiftModel = {
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
