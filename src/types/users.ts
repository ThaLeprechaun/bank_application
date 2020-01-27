import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'This describes a user',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'The ID of the user',
      resolve: data => data.id,
    },
    firstName: {
      type: GraphQLString,
      description: 'The first name of the user',
    },
    lastName: {
      type: GraphQLString,
      description: 'The last name of the user',
    },
    phone: {
      type: GraphQLString,
      description: 'The phone number of the user',
    },
    bvn: {
      type: GraphQLString,
      description: 'The bvn number of the user',
    },
    email: {
      type: GraphQLString,
      description: 'The email of the user',
    },
    password: {
      type: GraphQLString,
      description: 'The password of the user',
    },
    createdAt: {
      type: GraphQLString,
      description: 'The date the contact was created',
    },
    updatedAt: {
      type: GraphQLString,
      description: 'The last time the contact info was updated',
    },
  }),
});

export default userType;
