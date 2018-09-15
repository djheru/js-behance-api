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
      projects{
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
      followers {
        ...basicProfile
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
      following{
        ...basicProfile
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
  
  fragment basicProfile on Profile {
    id
    display_name
    first_name
    last_name
    username
  }
`;
