import React from 'react';
import { Query } from 'react-apollo';
import { Grid, Tab } from 'semantic-ui-react';
import ProjectPane from '../components/ProjectPane';
import FollowPane from '../components/FollowPane';
import ProfileCard from '../components/ProfileCard';
import StatsCard from '../components/StatsCard';
import WorkExperienceCard from '../components/WorkExperienceCard';
import { PROFILE_QUERY } from '../queries';
import LoadingAnimation from '../components/LoadingAnimation';
import ErrorHeader from '../components/ErrorHeader';

const ProfilePage = (props) => {
  const profileUsername = props.match.params.username;
  console.log('profileUsername', profileUsername);
  const buildPanes = (username) => [
   {
      menuItem: 'Projects',
      render: () => (
          <ProjectPane profileUsername={username} />
      )
    },
    {
      menuItem: 'Following',
      render: () => (
          <FollowPane
              type={FollowPane.FOLLOWING}
              profileUsername={username}/>
      )
    },
    {
      menuItem: 'Followers',
      render: () => (
          <FollowPane
              type={FollowPane.FOLLOWERS}
              profileUsername={username}/>
      )
    }
  ];

  return (
      <Query query={PROFILE_QUERY} variables={{ profileUsername }}>
        {
          ({ data: { profile = {} } = {}, loading, error }) => {
            if (loading) {
              return <LoadingAnimation/>
            }
            if (error) {
              return <ErrorHeader/>
            }

            return (
              <Grid columns={2} divided stackable>
                <Grid.Row>
                  <Grid.Column computer={6} tablet={8} mobile={16}>
                    <ProfileCard profile={profile}/>
                    <StatsCard stats={profile.stats}/>
                    <WorkExperienceCard workExperience={profile.work_experience}/>
                  </Grid.Column>
                  <Grid.Column computer={10} tablet={8} mobile={16}>
                    <Tab
                        renderActiveOnly={true}
                        menu={{ secondary: true, pointing: true }}
                        panes={buildPanes(profileUsername)}/>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            );
          }
        }
      </Query>
  );
};

export default ProfilePage;
