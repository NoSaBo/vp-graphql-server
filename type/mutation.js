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

const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "Funtions to create data",
  fields() {
    return {
      addEmployee: {
        type: Employee,
        args: {
          firstName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          lastName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          userName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, args) {
          return Db.models.employee.create({
            firstName: args.firstName,
            lastName: args.lastName,
            userName: args.userName.toLowerCase(),
            password: args.password
          });
        }
      }
    };
  }
});

export default MutationType;
