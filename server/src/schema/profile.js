import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    profile(username: String!): Profile
    profiles(queryTerm: String, page: Int): [Profile]
    followers(username: String!, page: Int, perPage: Int): FollowConnection!
    following(username: String!, page: Int, perPage: Int): FollowConnection!
    projects(username: String!, page: Int, perPage: Int): ProjectConnection!
  }
  
  type FollowConnection {
    items: [Profile!]
    pageInfo: PageInfo
  }
  
  type ProjectConnection {
    items: [Project!]
    pageInfo: PageInfo
  }
  
  type PageInfo {
    page: Int!
    perPage: Int!
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
    stats: Stats
    work_experience: [WorkExperience]
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
