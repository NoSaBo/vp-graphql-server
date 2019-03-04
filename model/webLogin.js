import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from "graphql";

const webLogin = new GraphQLObjectType({
  name: "webLogin",
  description: "This represents an webLogin response",
  fields: () => {
    return {
      userID: {
        type: GraphQLID,
        resolve(logresp) {
          return logresp.userID;
        }
      },
      username: {
        type: GraphQLString,
        resolve(logresp) {
          return logresp.user;
        }
      },
      token: {
        type: GraphQLString,
        resolve(logresp) {
          return logresp.token;
        }
      },
      tokenExpiration: {
        type: GraphQLInt,
        resolve(logresp) {
          return logresp.tokenExpiration;
        }
      }
    };
  }
});

export default webLogin;
