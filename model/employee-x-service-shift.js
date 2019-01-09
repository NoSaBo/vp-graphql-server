// @flow

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from "graphql";

import {
  GraphQLDateTime
} from 'graphql-iso-date';

import Employee from "./employee";
import ServiceShift from "./service-shift";

import Db from "../conn/db";

const EmployeeXServiceShift = new GraphQLObjectType({
  name: "EmployeeXServiceShift",
  description: "This represents a relation between Employee and ServiceShift",
  fields: () => {
    return {
      id: {
        type: GraphQLID,
        resolve(attendance) {
          return attendance.id;
        }
      },
      photo: {
        type: GraphQLString,
        resolve(attendance) {
          return attendance.photo;
        }
      },
      latitude: {
        type: GraphQLFloat,
        resolve(attendance) {
          return attendance.latitude;
        }
      },
      longitude: {
        type: GraphQLFloat,
        resolve(attendance) {
          return attendance.longitude;
        }
      },
      comment: {
        type: GraphQLString,
        resolve(attendance) {
          return attendance.comment;
        }
      },
      start: {
        type: GraphQLDateTime,
        resolve(attendance) {
          return attendance.start;
        }
      }
    };
  }
});

export default EmployeeXServiceShift;
