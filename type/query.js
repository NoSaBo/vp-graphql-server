// @flow

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from "graphql";
import * as bcrypt from "bcrypt";

import Employee from "../model/employee";
import Branch from "../model/branch";
import ServiceShift from "../model/service-shift";
import Employeesxserviceshifts from "../model/employee-x-service-shift";
import Parking from "../model/parking";

import Db from "../conn/db";

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  fields: () => {
    return {
      login: {
        type: Employee,
        args: {
          user: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, args) {
          return Db.models.employee
            .findOne({ where: { user: args.user } })
            .then(user => {
              if (
                user &&
                bcrypt.compareSync(args.password, user.get().password)
              )
                return user;
              else return null;
            });
        }
      },
      serviceShifts: {
        type: new GraphQLList(ServiceShift),
        args: {
          id: {
            type: GraphQLID
          }
        },
        resolve(root, args) {
          return Db.models.serviceshift.findAll({
            include: [
              {
                model: Db.models.employee,
                through: {
                  attributes: [
                    "firstname",
                    "lastname",
                    "user",
                    "dni",
                    "phone",
                    "active"
                  ]
                }
              }
            ],
            where: args
          });
        }
      },
      branches: {
        type: new GraphQLList(Branch),
        args: {
          id: {
            type: GraphQLID
          }
        },
        resolve(root, args) {
          return Db.models.branch.findAll({ where: args });
        }
      },
      employees: {
        type: new GraphQLList(Employee),
        args: {
          user: {
            type: GraphQLString
          }
        },
        resolve(parent, args) {
          return Db.models.employee.findAll({ where: args });
        }
      },
      // employeesxserviceshifts: {
      //   type: new GraphQLList(Employeesxserviceshifts),
      //   args: {
      //     id: {
      //       type: GraphQLID
      //     }
      //   },
      //   resolve(root, args) {
      //     return Db.models.employeexserviceshift.findAll({
      //       where: args
      //     });
      //   }
      // },
      employeesxserviceshifts: {
        type: new GraphQLList(Employeesxserviceshifts),
        args: {
          id: {
            type: GraphQLID
          }
        },
        resolve(root, args) {
          return Db.models.employeexserviceshift.findAll({
            // include: [
            //   {
            //     model: Db.models.employee,
            //     through: { attributes: ['firstname'] }
            //   }
            // ],
            where: args
          })
          // .then((result) => {
          //   console.log("query-result", result[0].dataValues.employees.employeexserviceshift);
          //   // innerJoin.findAll({ where: args });
          // });
        }
      },
      parkings: {
        type: new GraphQLList(Parking),
        args: {
          id: {
            type: GraphQLID
          }
        },
        resolve(root, args) {
          return Db.models.parking.findAll({ where: args });
        }
      }
    };
  }
});

export default QueryType;
