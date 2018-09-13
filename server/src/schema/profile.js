import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    profile(username: String!): Profile
    profiles(queryTerm: String, page: Int): [Profile]
  }
  
  type Profile {
    id: ID!
    first_name: String!
    last_name: String!
    username: String!
    city: String
    state: String
    country: String
    company: String
    occupation: String
    created_on: Int
    url: String
    display_name: String
    images: [Image]
    links: [Link]
    followers: [Profile]
    following: [Profile]
    stats: Stats
    work_experience: [WorkExperience]
    projects: [Project]
  }
  
  type Image {
    size: Int
    url: String
  }
  
  type Link {
    title: String
    url: String
  }
  
  type Project {
    id: ID!
    name: String!
    created_on: Int!
    published_on: Int
    url: String
    fields: [String]
    covers: [Image]
  }
  
  type Stats {
    followers: Int
    following: Int
    appreciations: Int
    views: Int
    comments: Int
  }
  
  type WorkExperience {
    position: String
    location: String
    organization: String
  }
`;
