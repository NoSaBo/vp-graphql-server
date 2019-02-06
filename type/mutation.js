// @flow

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLFloat,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean
} from "graphql";
import { GraphQLDateTime, GraphQLTime } from "graphql-iso-date";
import * as bcrypt from "bcrypt";

import Employee from "../model/employee";
import Branch from "../model/branch";
import ServiceShift from "../model/service-shift";
import Parking from "../model/parking";
import EmployeexServiceShifts from "../model/employee-x-service-shift";

import Db from "../conn/db";

const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "Funtions to create data",
  fields() {
    return {
      addEmployee: {
        type: Employee,
        args: {
          firstname: {
            type: new GraphQLNonNull(GraphQLString)
          },
          lastname: {
            type: new GraphQLNonNull(GraphQLString)
          },
          user: {
            type: new GraphQLNonNull(GraphQLString)
          },
          dni: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          },
          phone: {
            type: new GraphQLNonNull(GraphQLString)
          },
          active: {
            type: new GraphQLNonNull(GraphQLBoolean)
          }
        },
        resolve(root, args) {
          const saltRounds = 10;
          const salt = bcrypt.genSaltSync(saltRounds);
          const hash = bcrypt.hashSync(args.password, salt);

          return Db.models.employee.create({
            firstname: args.firstname,
            lastname: args.lastname,
            user: args.user.toLowerCase(),
            password: hash,
            dni: args.dni,
            phone: args.phone,
            active: args.active
          });
        }
      },
      addBranch: {
        type: Branch,
        args: {
          branch: {
            type: new GraphQLNonNull(GraphQLString)
          },
          address: {
            type: new GraphQLNonNull(GraphQLString)
          },
          latitude: {
            type: new GraphQLNonNull(GraphQLFloat)
          },
          longitude: {
            type: new GraphQLNonNull(GraphQLFloat)
          },
          contact: {
            type: new GraphQLNonNull(GraphQLString)
          },
          phone: {
            type: new GraphQLNonNull(GraphQLString)
          },
          active: {
            type: new GraphQLNonNull(GraphQLBoolean)
          }
        },
        resolve(root, args) {
          return Db.models.branch.create({
            branch: args.branch,
            address: args.address,
            latitude: args.latitude,
            longitude: args.longitude,
            contact: args.contact,
            phone: args.phone,
            active: args.active
          });
        }
      },
      addServiceShift: {
        type: ServiceShift,
        args: {
          begindate: {
            type: new GraphQLNonNull(GraphQLDateTime)
          },
          workspan: {
            type: new GraphQLNonNull(GraphQLDateTime)
          },
          active: {
            type: new GraphQLNonNull(GraphQLBoolean)
          },
          branchId: {
            type: new GraphQLNonNull(GraphQLID)
          }
        },
        resolve(root, args) {
          return Db.models.serviceshift.create({
            begindate: args.begindate,
            workspan: args.workspan,
            active: args.active,
            branchId: args.branchId
          });
        }
      },
      addParking: {
        type: Parking,
        args: {
          plate: {
            type: new GraphQLNonNull(GraphQLString)
          },
          owner: {
            type: GraphQLString
          },
          values: {
            type: GraphQLList(GraphQLString)
          },
          comment: {
            type: GraphQLString
          },
          damage: {
            type: GraphQLString
          },
          sign: {
            type: GraphQLString
          },
          token: {
            type: new GraphQLNonNull(GraphQLString)
          },
          serviceshiftId: {
            type: new GraphQLNonNull(GraphQLID)
          }
        },
        resolve(root, args) {
          return Db.models.parking.create({
            plate: args.plate,
            owner: args.owner,
            values: args.values,
            comment: args.comment,
            damage: args.damage,
            sign: args.sign,
            token: args.token,
            returned: false,
            serviceshiftId: args.serviceshiftId
          });
        }
      },
      addEmployeeToServiceShift: {
        type: ServiceShift,
        args: {
          id: {
            type: GraphQLID
          },
          employeeId: {
            type: GraphQLID
          }
        },
        resolve(root, args) {
          return Db.models.serviceshift
            .findOne({
              include: [
                {
                  model: Db.models.employee
                }
              ],
              where: { id: args.id }
            })
            .then(result => {
              result.addEmployee(args.employeeId);
            })
            .then(() => {
              return Db.models.serviceshift.findOne({ where: { id: args.id } });
            });
        }
      },
      updateEmployee: {
        type: Employee,
        args: {
          firstname: {
            type: GraphQLString
          },
          lastname: {
            type: GraphQLString
          },
          user: {
            type: new GraphQLNonNull(GraphQLString)
          },
          dni: {
            type: GraphQLString
          },
          password: {
            type: GraphQLString
          },
          phone: {
            type: GraphQLString
          },
          active: {
            type: GraphQLBoolean
          }
        },
        resolve(roots, args) {
          const saltRounds = 10;
          const salt = bcrypt.genSaltSync(saltRounds);
          args.password = bcrypt.hashSync(args.password, salt);
          return Db.models.employee
            .findOne({ where: { user: args.user } })
            .then(result => {
              return result
                .update(args, { returning: true })
                .then(updatedresult => {
                  return updatedresult;
                });
            });
        }
      },
      updateBranch: {
        type: Branch,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID)
          },
          branch: {
            type: GraphQLString
          },
          address: {
            type: GraphQLString
          },
          latitude: {
            type: GraphQLFloat
          },
          longitude: {
            type: GraphQLFloat
          },
          contact: {
            type: GraphQLString
          },
          phone: {
            type: GraphQLString
          },
          active: {
            type: GraphQLBoolean
          }
        },
        resolve(roots, args) {
          console.log("***********");
          return Db.models.branch
            .findOne({ where: { id: args.id } })
            .then(result => {
              console.log("result", result);
              return result
                .update(args, { returning: true })
                .then(updatedresult => {
                  return updatedresult;
                });
            });
        }
      },
      updateServiceShift: {
        type: ServiceShift,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID)
          },
          begindate: {
            type: new GraphQLNonNull(GraphQLDateTime)
          },
          workspan: {
            type: new GraphQLNonNull(GraphQLDateTime)
          },
          active: {
            type: new GraphQLNonNull(GraphQLBoolean)
          },
          branchId: {
            type: new GraphQLNonNull(GraphQLID)
          }
        },
        resolve(roots, args) {
          return Db.models.serviceshift
            .findOne({ where: { id: args.id } })
            .then(result => {
              return result
                .update(args, { returning: true })
                .then(updatedresult => {
                  return updatedresult;
                });
            });
        }
      },
      updateEmployeesxServiceShifts: {
        type: ServiceShift,
        args: {
          photo: {
            type: new GraphQLNonNull(GraphQLString)
          },
          latitude: {
            type: new GraphQLNonNull(GraphQLFloat)
          },
          longitude: {
            type: new GraphQLNonNull(GraphQLFloat)
          },
          comment: {
            type: new GraphQLNonNull(GraphQLString)
          },
          // start: {
          //   type: new GraphQLNonNull(GraphQLDateTime)
          // },
          employeeId: {
            type: new GraphQLNonNull(GraphQLID)
          },
          serviceShiftId: {
            type: new GraphQLNonNull(GraphQLID)
          }
        },
        resolve(roots, args) {
          return Db.models.serviceshift
            .findOne({
              include: [
                {
                  model: Db.models.employee,
                  where: { id: args.employeeId }
                }
              ],
              where: { id: args.serviceShiftId }
            })
            .then(serviceshift => {
              Db.models.employee
                .findOne({ where: { id: args.employeeId } })
                .then(employee => {
                  const nowIso = new Date().toISOString();
                  serviceshift.addEmployees(employee, {
                    through: {
                      photo: args.photo,
                      latitude: args.latitude,
                      longitude: args.longitude,
                      comment: args.comment,
                      start: nowIso
                    }
                  });
                });
            });
        }
      },
      returnParking: {
        type: Parking,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID)
          }
        },
        resolve(roots, args) {
          return Db.models.parking
            .findOne({ where: { id: args.id } })
            .then(result => {
              return result
                .update({ returned: true }, { returning: true })
                .then(updatedresult => {
                  return updatedresult;
                });
            });
        }
      },
      deleteEmployee: {
        type: Employee,
        args: {
          user: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(parent, args) {
          return Db.models.employee
            .findOne({ where: { user: args.user } })
            .then(result => {
              Db.models.employee.destroy({
                where: {
                  user: args.user.toLowerCase()
                }
              });
              return result;
            });
        }
      },
      deleteBranch: {
        type: Branch,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID)
          }
        },
        resolve(parent, args) {
          return Db.models.branch
            .findOne({ where: { id: args.id } })
            .then(result => {
              Db.models.branch.destroy({
                where: {
                  id: args.id
                }
              });
              return result;
            });
        }
      },
      deleteServiceShift: {
        type: ServiceShift,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID)
          }
        },
        resolve(parent, args) {
          return Db.models.serviceshift
            .findOne({ where: { id: args.id } })
            .then(result => {
              Db.models.serviceshift.destroy({
                where: {
                  id: args.id
                }
              });
              return result;
            });
        }
      },
      deleteEmployeeFromServiceShift: {
        type: ServiceShift,
        args: {
          id: {
            type: GraphQLID
          },
          employeeId: {
            type: GraphQLID
          }
        },
        resolve(root, args) {
          return Db.models.serviceshift
            .findOne({
              include: [
                {
                  model: Db.models.employee
                }
              ],
              where: { id: args.id }
            })
            .then(result => {
              result.removeEmployee(args.employeeId);
            })
            .then(() => {
              return Db.models.serviceshift.findOne({ where: { id: args.id } });
            });
        }
      },
      deleteParking: {
        type: Parking,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID)
          }
        },
        resolve(parent, args) {
          return Db.models.parking
            .findOne({ where: { id: args.id } })
            .then(result => {
              Db.models.parking.destroy({
                where: {
                  id: args.id
                }
              });
              return result;
            });
        }
      },
      deleteEmployeexserviceshift: {
        type: ServiceShift,
        args: {
          id: {
            type: GraphQLID
          },
          employeeId: {
            type: GraphQLID
          }
        },
        resolve(root, args) {
          return Db.models.serviceshift
            .findOne({
              include: [
                {
                  model: Db.models.employee,
                  where: { id: args.employeeId }
                }
              ],
              where: { id: args.id }
            })
            .then(result => {
              return result.employees[0].employeexserviceshift.destroy();
            });
        }
      }
    };
  }
});

export default MutationType;
