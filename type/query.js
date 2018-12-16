// @flow

import {
  GraphQLObjectType,
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

import Db from "../conn/db";

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  fields: () => {
    return {
      employee: {
        type: Employee,
        args: {
          userName: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          return Db.models.employee.findOne({ where: args });
        }
      },
      login: {
        type: Employee,
        args: {
          userName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, args) {
          return Db.models.employee
            .findOne({ where: { userName: args.userName } })
            .then(user => {
              if (bcrypt.compareSync(args.password, user.get().password))
                return user;
              else return null;
            });
        }
      },
      serviceShift: {
        type: ServiceShift,
        args: {
          id: {
            type: GraphQLInt
          }
        },
        resolve(root, args) {
          return Db.models.serviceshift.findOne({ where: args });
        }
      },
      branches: {
        type: Branch,
        args: {
          id: {
            type: GraphQLInt
          }
        },
        resolve(root, args) {
          return Db.models.branch.findOne({ where: args });
        }
      },
      Employees: {
        type: new GraphQLList(Employee),
        resolve(parent,args) {
            return Db.models.employee.findAll({where: args});
        },
    },
    };
  }
});

export default QueryType;
