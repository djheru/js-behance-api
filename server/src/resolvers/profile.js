import { transformImages } from '../utils/transformImages';

export default {
  Query: {
    profile: async (parent, { username }, { dataSources: { behanceAPI } }) =>
      await behanceAPI.getProfile(username),

    profiles: async (parent, { queryTerm, page = 1 }, { dataSources: { behanceAPI } }) =>
      await behanceAPI.getProfiles(queryTerm, page)
  },

  Profile: {
    followers: async ({ username, page = 1 }, args, { dataSources: { behanceAPI } }) =>
      await behanceAPI.getFollowers(username, page),

    following: async ({ username, page = 1 }, args, { dataSources: { behanceAPI } }) =>
      await behanceAPI.getFollowing(username, page),

    work_experience: async ({ username }, args, { dataSources: { behanceAPI } }) =>
      await behanceAPI.getWorkExperience(username),

    projects: async ({ username }, args, { dataSources: { behanceAPI } }) =>
      await behanceAPI.getProjects(username),

    images: ({ images }) =>
      transformImages(images)
  },

  Project: {
    covers: ({ covers }) =>
      transformImages(covers)
  }
};
