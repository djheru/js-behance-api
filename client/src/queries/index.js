import gql from 'graphql-tag';

export const PROFILES_QUERY = gql`
    query profiles($queryTerm:String) {
      profiles(queryTerm: $queryTerm) {
        id
        username
        display_name
        city
        country
        images{
          url
        }
      }
    }
`;

export const PROFILE_QUERY = gql`
  query profile($profileUsername:String!) {
    profile(username:$profileUsername){
      ...basicProfile
      city
      state
      country
      company
      occupation
      created_on
      url
      images {
        size
        url
      }
      links {
        title
        url
      }
      stats {
        followers
        following
        appreciations
        views
      }
      work_experience {
        position
        location
        organization
      }
    }
  }
  
  fragment basicProfile on Profile {
    id
    display_name
    first_name
    last_name
    username
  }
`;

export const FOLLOWERS_QUERY = gql`
  query followers($profileUsername:String!, $perPage: Int, $page:Int) {
    followers(username: $profileUsername, perPage: $perPage, page: $page) {
      pageInfo {
        page
        perPage
      }
      items {
        id
        display_name
        first_name
        last_name
        username
        stats {
          followers
          following
        }
        images {
          url
        }
        city
        country 
        url
      }
    }
  }
`;

export const FOLLOWING_QUERY = gql`
  query following($profileUsername:String!, $perPage: Int, $page: Int) {
    following(username: $profileUsername, perPage: $perPage, page: $page) {
      pageInfo {
        page
        perPage
      }
      items {
        id
        display_name
        first_name
        last_name
        username
        stats {
          following
          followers
        }
        images {
          url
        }
        city
        country 
        url
      }
    }
  }
`;

export const PROJECTS_QUERY = gql`
  query projects($profileUsername:String!, $perPage: Int, $page: Int) {
    projects(username: $profileUsername, perPage: $perPage, page: $page) {
      pageInfo {
        page
        perPage
      }
      items {
        id
        name
        created_on
        published_on
        url
        fields
        covers {
          size
          url
        }
      }
    }
  }
`;
