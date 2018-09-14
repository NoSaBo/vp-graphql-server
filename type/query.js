// @flow

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from "graphql";

import Employee from "../model/employee";
import Branch from "../model/branch";
import ServiceShift from "../model/service-shift";

import Db from "../conn/db";

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  fields: () => {
    return {
      employee: {
        type: new GraphQLList(Employee),
        args: {
          userName: {
            type: GraphQLString
          },
          password: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          return Db.models.employee.findAll({ where: args });
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
          const user = Db.models.employee.findOne({ where: args });

          if (!user) {
            return {
              error: "INVALID_EMAIL_PASSWORD"
            };
          }
          return user;
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
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve(root, args) {
          return Db.models.branch.findOne({ where: args });
        }
      }
    };
  }
});

export default QueryType;
