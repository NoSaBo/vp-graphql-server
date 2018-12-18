// @flow

import {
  GraphQLObjectType,
  GraphQLString,
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
    };
  }
});

export default MutationType;
