import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} from 'graphql';
import userType from './users';

const transactionType = new GraphQLObjectType({
  name: 'Transaction',
  description: 'This describes a transaction',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'The transaction ID',
      resolve: data => data.id,
    },
    user: {
      type: userType,
      description: 'The ID of the account owner',
    },
    benefactor: {
      type: userType,
      description: 'The name of the receiver or lender',
    },
    transactionType: {
      type: GraphQLString,
      description: 'The type of transaction (DEBIT, CREDIT)',
    },
    transactionAmount: {
      type: GraphQLInt,
      description: 'The amount credited or debited from the account',
    },
    description: {
      type: GraphQLString,
      description: 'The transaction description',
    },
    transactionDate: {
      type: GraphQLString,
      description: 'The date the transaction',
    },
  }),
});

export default transactionType;
