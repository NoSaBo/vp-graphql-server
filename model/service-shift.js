// @flow

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean
} from "graphql";

import {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime
} from 'graphql-iso-date';

import Employee from "./employee";
import Branch from "./branch";

import Db from "../conn/db";

const ServiceShift = new GraphQLObjectType({
  name: "ServiceShift",
  description: "This represents a Shift on a Branch",
  fields: () => {
    return {
      id: {
        type: GraphQLID,
        resolve(serviceShift) {
          return serviceShift.id;
        }
      },
      begindate: {
        type: GraphQLDateTime,
        resolve(serviceShift) {
          return serviceShift.begindate;
        }
      },
      workspan: {
        type: GraphQLTime,
        resolve(serviceShift) {
          return serviceShift.workspan;
        }
      },
      active: {
        type: GraphQLBoolean,
        resolve(serviceShift) {
          return serviceShift.active;
        }
      },
    };
  }
});

export default ServiceShift;
