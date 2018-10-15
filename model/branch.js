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

const Branch = new GraphQLObjectType({
  name: "Branch",
  description: "This represents a Branch",
  fields: () => {
    return {
      id: {
        type: GraphQLID,
        resolve(branch) {
          return branch.id;
        }
      },
      branchName: {
        type: GraphQLString,
        resolve(branch) {
          return branch.branchName;
        }
      },
      address: {
        type: GraphQLString,
        resolve(branch) {
          return branch.address;
        }
      },
      latitude: {
        type: GraphQLFloat,
        resolve(branch) {
          return branch.latitude;
        }
      },
      longitude: {
        type: GraphQLFloat,
        resolve(branch) {
          return branch.longitude;
        }
      },
      shift: {
        type: new GraphQLList(ServiceShift),
        resolve(branch) {
          return branch.getServiceshifts();
        }
      }
    };
  }
});

export default Branch;
