/* @flow */

import Sequelize from "sequelize";
import * as bcrypt from "bcrypt";
import _ from "lodash";
import Faker from "faker";

import EmployeeModel from "./employee";
import BranchModel from "./branch";
import ServiceShiftModel from "./service-shift";
import EmployeeXServiceShiftModel from "./employee-x-service-shift";
import ParkingModel from "./parking";
import { dirname } from "path";

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
const EmployeeXServiceShift = conn.define(
  "employeexserviceshift",
  EmployeeXServiceShiftModel
);
const Parking = conn.define("parking", ParkingModel);

// Relationships
Branch.hasMany(ServiceShift);
ServiceShift.belongsTo(Branch);

Employee.belongsToMany(ServiceShift, { through: EmployeeXServiceShift });
ServiceShift.belongsToMany(Employee, { through: EmployeeXServiceShift });
// Employee.hasMany(EmployeeXServiceShift);
// ServiceShift.belongsToMany(EmployeeXServiceShift);

//serviceshift_id -> parking
ServiceShift.hasMany(Parking);
//parking_id -> serciceshift
Parking.belongsTo(ServiceShift);

conn.sync({ force: false }).then(() => {
  // _.times(4, () => {
  //   return Employee.create({
  //     firstName: Faker.name.firstName(),
  //     lastName: Faker.name.lastName(),
  //     userName: Faker.name.firstName()
  //   });
  // });
  // const saltRounds = 10;
  // const salt = bcrypt.genSaltSync(saltRounds);
  // Employee.create({
  //   firstname: "Jesus",
  //   lastname: "Rey",
  //   user: "jreyp",
  //   password: bcrypt.hashSync("jesus", salt),
  //   dni: "32424"
  //   phone: "324234"
  //   active: false
  // });
  // Employee.create({
  //   firstname: "Diego",
  //   lastname: "Buendia",
  //   user: "dbuendia",
  //   password: bcrypt.hashSync("diego", salt),
  //   dni: "32424"
  //   phone: "324234"
  //   active: false
  // });
  // Branch.create({
  //   branch: "Jesus's House",
  //   address: "Ca. Las Tordillas 173",
  //   latitude: -12.094413,
  //   longitude: -77.019715,
  //   contact: "tu"
  //   phone: "876"
  //   active: true
  // });
  // Branch.create({
  //   branch: "Yo Manejo S.A.C.",
  //   address: "Av. Del Parque Norte 1126",
  //   latitude: -12.09752,
  //   longitude: -77.010324,
  //   contact: "tu"
  //   phone: "876"
  //   active: true
  // });
  // Branch.create({
  //   branch: "Colegio Alpamayo",
  //   address: "Ca. Bucaramanga 145",
  //   latitude: -12.061806,
  //   longitude: -76.937528,
  //   contact: "tu"
  //   phone: "876"
  //   active: true
  // });
  // Branch.create({
  //   branch: "Shaniko Common",
  //   address: "Warm Springs Blvd",
  //   latitude: 37.488448,
  //   longitude: -121.927627
  //   contact: "yo"
  //   phone: "23423"
  //   active: true
  // });
  // ServiceShift.create({
  //   begindate: "18/09",
  //   workspan: "11:00 am",
  //   active: "4:00 pm",
  //   branchId: "1",
  //   employeeId: "1"
  // });
  // ServiceShift.create({
  //   date: "19/09",
  //   begin: "12:00 am",
  //   end: "3:00 pm",
  //   branchId: "2",
  //   employeeId: "1"
  // });
  // ServiceShift.create({
  //   date: "20/09",
  //   begin: "12:00 am",
  //   end: "3:00 pm",
  //   branchId: "3",
  //   employeeId: "1"
  // });
  // ServiceShift.create({
  //   date: "21/09",
  //   begin: "10:00 am",
  //   end: "4:00 pm",
  //   branchId: "4",
  //   employeeId: "1"
  // });
  // ServiceShift.create({
  //   date: "18/09",
  //   begin: "10:00 am",
  //   end: "2:00 pm",
  //   branchId: "2",
  //   employeeId: "2"
  // });
  // ServiceShift.create({
  //   date: "19/09",
  //   begin: "2:00 pm",
  //   end: "6:00 pm",
  //   branchId: "1",
  //   employeeId: "2"
  // });
});

export default conn;
