// @flow

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from "graphql";

import Employee from "./employee";
import Branch from "./branch";

import Db from "../conn/db";

const ServiceShift = new GraphQLObjectType({
  name: "ServiceShift",
  description: "This represents a Shift on a Branch",
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(serviceShift) {
          return serviceShift.id;
        }
      },
      date: {
        type: GraphQLString,
        resolve(serviceShift) {
          return serviceShift.date;
        }
      },
      begin: {
        type: GraphQLString,
        resolve(serviceShift) {
          return serviceShift.begin;
        }
      },
      end: {
        type: GraphQLString,
        resolve(serviceShift) {
          return serviceShift.end;
        }
      },
      branch: {
        type: Branch,
        resolve(serviceShift) {
          return serviceShift.getBranch();
        }
      },
      employee: {
        type: Employee,
        resolve(serviceShift) {
          return serviceShift.getEmployee();
        }
      }
    };
  }
});

export default ServiceShift;
