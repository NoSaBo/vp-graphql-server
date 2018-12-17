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

import Employee from "./employee";
import ServiceShift from "./service-shift";

import Db from "../conn/db";

const AttendanceControl = new GraphQLObjectType({
  name: "AttendanceControl",
  description: "This represents an AttendanceControl",
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
      }
    };
  }
});

export default AttendanceControl;
