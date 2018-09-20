import { transformImages } from '../utils/transformImages';

export default {
  Query: {
    profile: async (parent, { username }, { dataSources: { behanceAPI } }) =>
      await behanceAPI.getProfile(username),

    profiles: async (parent, { queryTerm, page = 1 }, { dataSources: { behanceAPI } }) =>
      await behanceAPI.getProfiles(queryTerm, page),

    followers: async (parent, { username, page = 1, perPage = 10 }, { dataSources: { behanceAPI } }) =>
      await behanceAPI.getFollowers(username, page, perPage),

    following: async (parent, { username, page = 1, perPage = 10 }, { dataSources: { behanceAPI } }) =>
      await behanceAPI.getFollowing(username, page, perPage),

    projects: async (parent, { username, page = 1, perPage = 10 }, { dataSources: { behanceAPI } }) =>
      await behanceAPI.getProjects(username, page, perPage)
  },

  Profile: {
    work_experience: async ({ username }, args, { dataSources: { behanceAPI } }) =>
      await behanceAPI.getWorkExperience(username),

    images: ({ images }) =>
      transformImages(images)
  },

  Project: {
    covers: ({ covers }) =>
      transformImages(covers)
  }
};
