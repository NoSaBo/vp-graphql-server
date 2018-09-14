// @flow

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from "graphql";

import Branch from "./branch";
import ServiceShift from "./service-shift";

import Db from "../conn/db";

const Employee = new GraphQLObjectType({
  name: "Employee",
  description: "This represents a Employee",
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(employee) {
          return employee.id;
        }
      },
      firstName: {
        type: GraphQLString,
        resolve(employee) {
          return employee.firstName;
        }
      },
      lastName: {
        type: GraphQLString,
        resolve(employee) {
          return employee.lastName;
        }
      },
      userName: {
        type: GraphQLString,
        resolve(employee) {
          return employee.userName;
        }
      },
      serviceShifts: {
        type: new GraphQLList(ServiceShift),
        resolve(employee) {
          return employee.getServiceShift();
        }
      }
    };
  }
});

export default Employee;
