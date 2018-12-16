import Sequelize from "sequelize";

const AttendanceControlModel = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  photo: {
    type: Sequelize.STRING
  },
  latitude: {
    type: Sequelize.FLOAT
  },
  longitude: {
    type: Sequelize.FLOAT
  },
  comment: {
    type: Sequelize.STRING
  }
};

export default AttendanceControlModel;
