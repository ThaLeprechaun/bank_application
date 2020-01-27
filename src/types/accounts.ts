import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} from 'graphql';
import userType from './users';

const accountType = new GraphQLObjectType({
  name: 'Account',
  description: "This describes a user's account",
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'The account ID',
      resolve: data => data.id,
    },
    user: {
      type: userType,
      description: 'The account owner',
    },
    accountNumber: {
      type: GraphQLInt,
      description: "The holder's account number",
    },
    accountBalance: {
      type: GraphQLInt,
      description: 'The account balance',
    },
    createdAt: {
      type: GraphQLString,
      description: 'Date of account creation',
    },
    updatedAt: {
      type: GraphQLString,
      description: 'Date of account updating',
    },
    deletedtedAt: {
      type: GraphQLString,
      description: 'Date of closing account',
    },
  }),
});

export default accountType;
