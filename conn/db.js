//@flow

import Sequelize from "sequelize";
import _ from "lodash";
import Faker from "faker";

import EmployeeModel from "./employee";
import BranchModel from "./branch";
import ServiceShiftModel from "./service-shift";

const conn = new Sequelize(
  "d8lclr6faernog", // database
  "ovqboahjoerpnl", // username
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

const Employee = conn.define("employee", EmployeeModel);
const Branch = conn.define("branch", BranchModel);
const ServiceShift = conn.define("serviceshift", ServiceShiftModel);

// Relationships
Branch.hasMany(ServiceShift);
ServiceShift.belongsTo(Branch);
Employee.hasMany(ServiceShift);

conn.sync({ force: true }).then(() => {
  // _.times(4, () => {
  //   return Employee.create({
  //     firstName: Faker.name.firstName(),
  //     lastName: Faker.name.lastName(),
  //     userName: Faker.name.firstName()
  //   });
  // });
  Employee.create({
    firstName: "Jesus",
    lastName: "Rey",
    userName: "jreyp",
    password: "jesus"
  });
  Employee.create({
    firstName: "Diego",
    lastName: "Buendia",
    userName: "dbuendia",
    password: "diego"
  });
  Branch.create({
    branchName: "Jesus's House",
    address: "Ca. Las Tordillas 173",
    latitude: -12.094413,
    longitude: -77.019715
  });
  Branch.create({
    branchName: "Yo Manejo S.A.C.",
    address: "Av. Del Parque Norte 1126",
    latitude: -12.09752,
    longitude: -77.010324
  });
  ServiceShift.create({
    date: "18/09",
    begin: "11:00 am",
    end: "4:00 pm",
    branchId: "1",
    employeeId: "1"
  });
  ServiceShift.create({
    date: "19/09",
    begin: "12:00 am",
    end: "3:00 pm",
    branchId: "2",
    employeeId: "1"
  });
  ServiceShift.create({
    date: "18/09",
    begin: "10:00 am",
    end: "2:00 pm",
    branchId: "2",
    employeeId: "2"
  });
  ServiceShift.create({
    date: "19/09",
    begin: "2:00 pm",
    end: "6:00 pm",
    branchId: "1",
    employeeId: "2"
  });
});

export default conn;
