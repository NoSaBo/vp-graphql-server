import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from "graphql";

import Db from "./db";

// Employee Type
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

const Branch = new GraphQLObjectType({
  name: "Branch",
  description: "This represents a Branch",
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
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
      }
    };
  }
});

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

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => {
    return {
      employee: {
        type: new GraphQLList(Employee),
        args: {
          id: {
            type: GraphQLInt
          },
          userName: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          return Db.models.employee.findAll({ where: args });
        }
      },
      serviceShift: {
        type: new GraphQLList(ServiceShift),
        resolve(root, args) {
          return Db.models.serviceshift.findAll({ where: args });
        }
      }
    };
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
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
          }
        },
        resolve(root, args) {
          return Db.models.employee.create({
            firstName: args.firstName,
            lastName: args.lastName,
            userName: args.userName.toLowerCase()
          });
        }
      }
    };
  }
});

const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

export default Schema;
