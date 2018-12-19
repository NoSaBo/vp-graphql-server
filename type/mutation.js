// @flow

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLFloat,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean
} from "graphql";
import * as bcrypt from "bcrypt";

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
          firstname: {
            type: new GraphQLNonNull(GraphQLString)
          },
          lastname: {
            type: new GraphQLNonNull(GraphQLString)
          },
          user: {
            type: new GraphQLNonNull(GraphQLString)
          },
          dni: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          },
          phone: {
            type: new GraphQLNonNull(GraphQLString)
          },
          active: {
            type: new GraphQLNonNull(GraphQLBoolean)
          }
        },
        resolve(root, args) {
          const saltRounds = 10;
          const salt = bcrypt.genSaltSync(saltRounds);
          const hash = bcrypt.hashSync(args.password, salt);

          return Db.models.employee.create({
            firstname: args.firstname,
            lastname: args.lastname,
            user: args.user.toLowerCase(),
            dni: args.dni,
            password: hash,
            phone: args.phone,
            active: args.active
          });
        }
      },
      addBranch: {
        type: Branch,
        args: {
          branch: {
            type: new GraphQLNonNull(GraphQLString)
          },
          address: {
            type: new GraphQLNonNull(GraphQLString)
          },
          latitude: {
            type: new GraphQLNonNull(GraphQLFloat)
          },
          longitude: {
            type: new GraphQLNonNull(GraphQLFloat)
          },
          contact: {
            type: new GraphQLNonNull(GraphQLString)
          },
          phone: {
            type: new GraphQLNonNull(GraphQLString)
          },
          active: {
            type: new GraphQLNonNull(GraphQLBoolean)
          }
        },
        resolve(root, args) {
          return Db.models.branch.create({
            branch: args.branch,
            address: args.address,
            latitude: args.latitude,
            longitude: args.longitude,
            contact: args.contact,
            phone: args.phone,
            active: args.active
          });
        }
      },
      deleteEmployee: {
        type: Employee,
        args: {
            user: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve(parent, args) {
            return Db.models.employee.findOne({where: {user: args.user }})
            .then( (result) => {
                Db.models.employee.destroy({
                    where: {
                        user: args.user.toLowerCase()
                    }
                })
                return result;
                }
            );
        }
    },
    deleteBranch: {
      type: Branch,
      args: {
          id: {
              type: new GraphQLNonNull(GraphQLID)
          }
      },
      resolve(parent, args) {
          return Db.models.branch.findOne({where: {id: args.id }})
          .then( (result) => {
              Db.models.branch.destroy({
                  where: {
                      id: args.id
                  }
              })
              return result;
              }
          );
      }
  },
    };
  }
});

export default MutationType;
