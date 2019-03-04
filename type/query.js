// @flow

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull
} from "graphql";
import * as bcrypt from "bcrypt";

import Employee from "../model/employee";
import Branch from "../model/branch";
import ServiceShift from "../model/service-shift";
import Employeesxserviceshifts from "../model/employee-x-service-shift";
import Parking from "../model/parking";
import WebLogin from "../model/webLogin";
import jwt from "jsonwebtoken";

import Db from "../conn/db";

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  fields: () => {
    return {
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
        resolve(root, args) {
          return Db.models.employee.findAll({ where: args });
        }
      },
      employeesxserviceshifts: {
        type: new GraphQLList(Employeesxserviceshifts),
        args: {
          id: {
            type: GraphQLID
          }
        },
        resolve(root, args) {
          return Db.models.employeexserviceshift.findAll({
            where: args
          });
        }
      },
      parkings: {
        type: new GraphQLList(Parking),
        args: {
          id: {
            type: GraphQLID
          },
          token: {
            type: GraphQLString
          },
          returned: {
            type: GraphQLBoolean
          },
          serviceshiftId: {
            type: GraphQLID
          }
        },
        resolve(root, args) {
          return Db.models.parking.findAll({ where: args });
        }
      },
      webLogin: {
        type: WebLogin,
        args: {
          email: {
            type: GraphQLString
          },
          password: {
            type: GraphQLString
          }
        },
        async resolve(root, { email, password }) {
          const user = await Db.models.admin.findOne({where: { email: email }});
          if (!user) {
            throw new Error("El administrador no existe");
          }
          const isEqual = await bcrypt.compare(password, user.password);
          if (!isEqual) {
            throw new Error("La contraseña es incorrecta");
          }
          const token = jwt.sign(
            { userId: user.id, email: user.email },
            "somesupersecretkey",
            { expiresIn: "1h" }
          );
          return {userID: user.id, user: user.username, token: token, tokenExpiration: 1}
        }
      }
    };
  }
});

export default QueryType;
