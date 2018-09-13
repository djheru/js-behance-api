import { gql } from 'apollo-server-express';
import profileSchema from './profile';

const linkSchema = gql`
  type Query {
     _: Boolean
  }
`;

export default [
  linkSchema,
  profileSchema
];
