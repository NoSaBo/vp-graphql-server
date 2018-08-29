import Sequelize from "sequelize";
import _ from "lodash";
import Faker from "faker";

const conn = new Sequelize(
  "d8lclr6faernog", // database
  "ovqboahjoerpnl", // user
  "695fb2928517140e66ebf0ce78617a9501ca37b326d7f3c3ad2394354eed11b8", // password
  {
    host: "ec2-54-235-94-36.compute-1.amazonaws.com",
    dialect: "postgres",
    ssl: true,
    dialectOptions: {
      ssl: true
    }
  }
);

const Employee = conn.define("employee", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Branch = conn.define("branch", {
  branchName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const ServiceShift = conn.define("serviceshift", {
  begin: {
    type: Sequelize.STRING,
    allowNull: false
  },
  end: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// Relationships
ServiceShift.belongsTo(Branch);
Employee.hasMany(ServiceShift);

// conn.sync({ force: true }).then(() => {
//   _.times(4, () => {
//     return Employee.create({
//       firstName: Faker.name.firstName(),
//       lastName: Faker.name.lastName(),
//       userName: Faker.name.firstName()
//     });
//   });
// });

export default conn;
