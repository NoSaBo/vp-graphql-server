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
      }
    };
  }
});

export default ServiceShift;
