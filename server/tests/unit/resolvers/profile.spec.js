import profileResolvers from '../../../src/resolvers/profile';

const { Query, Profile, Project } = profileResolvers;

describe('(Profile resolvers)', () => {
  let parent;
  let args;
  let context;
  let behanceAPI;
  let dataSources;

  beforeEach(() => {
    behanceAPI = {
      getProfile: sinon.stub(),
      getProfiles: sinon.stub(),
      getFollowers: sinon.stub(),
      getFollowing: sinon.stub(),
      getWorkExperience: sinon.stub(),
      getProjects: sinon.stub()
    };
    dataSources = { behanceAPI };
  });

  describe('Query', () => {
    it('should request the behance profile using the getProfile method', async () => {
      parent = null;
      args = { username: 'amy' };
      context = { dataSources };

      Query.profile(parent, args, context);
      expect(behanceAPI.getProfile).to.be.calledWith(args.username);
    });

    it('should request the behance profiles using the getProfiles method', async () => {
      parent = null;
      args = { queryTerm: 'jimbo', page: 12 };
      context = { dataSources };

      Query.profiles(parent, args, context);
      expect(behanceAPI.getProfiles).to.be.calledWith(args.queryTerm, args.page);
    });
  });

  describe('Profile', () => {
    it('should request the behance profile followers using the getFollowers method', async () => {
      parent = { username: 'clive', page: 12 };
      args = null;
      context = { dataSources };

      Profile.followers(parent, args, context);
      expect(behanceAPI.getFollowers).to.be.calledWith(parent.username, parent.page);
    });

    it('should request the behance profiles followed by a user using the getFollowing method', async () => {
      parent = { username: 'clive', page: 12 };
      args = null;
      context = { dataSources };

      Profile.following(parent, args, context);
      expect(behanceAPI.getFollowing).to.be.calledWith(parent.username, parent.page);
    });

    it('should request the work experience from a behance profile using the getWorkExperience method', async () => {
      parent = { username: 'avi' };
      args = null;
      context = { dataSources };

      Profile.work_experience(parent, args, context);
      expect(behanceAPI.getWorkExperience).to.be.calledWith(parent.username);
    });

    it('should request the projects from a behance profile using the getProjects method', async () => {
      parent = { username: 'ari' };
      args = null;
      context = { dataSources };

      Profile.projects(parent, args, context);
      expect(behanceAPI.getProjects).to.be.calledWith(parent.username);
    });

    it('should reformat the images from a behance profile', async () => {
      const images = {
        '50': 'example.com/img1.png',
        '150': 'example.com/img2.png'
      };
      const expectedOutput = [
        { size: 50, url: 'example.com/img1.png' },
        { size: 150, url: 'example.com/img2.png' }
      ];
      parent = { images };

      const result = Profile.images(parent);
      expect(result).to.eql(expectedOutput);
    });
  });

  describe('Project', () => {
    it('should reformat the project cover images from a behance profile', () => {
      const covers = {
        '50': 'example.com/img1.png',
        '150': 'example.com/img2.png'
      };
      const expectedOutput = [
        { size: 50, url: 'example.com/img1.png' },
        { size: 150, url: 'example.com/img2.png' }
      ];
      parent = { covers };

      const result = Project.covers(parent);
      expect(result).to.eql(expectedOutput);
    });
  });
});
