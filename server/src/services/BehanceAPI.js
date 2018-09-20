import { RESTDataSource } from 'apollo-datasource-rest';
import { URLSearchParams } from 'apollo-server-env';
import logger from '../utils/logger';

const log = logger.log('app:services:BehanceAPI');

/**
 * Using the BehanceAPI as a RESTDataSource
 */
export class BehanceAPI extends RESTDataSource {
  /**
   * Class constructor
   * @param {String} apiKey
   */
  constructor(apiKey) {
    super();
    this.baseURL = 'http://behance.net/v2';
    this.apiKey = apiKey;
    this.params = new URLSearchParams();
  }

  /**
   * Intercept requests to add the api_key to the params
   * @param request
   */
  willSendRequest(request) {
    request.params.set('api_key', this.apiKey);
  }

  /**
   * Retrieve the collection of profiles matching the query term
   * @param {String} queryTerm
   * @param {Number} page
   * @returns {Promise<void>}
   */
  async getProfiles(queryTerm, page = 1, perPage = 24) {
    try {
      this.params.set('q', queryTerm);
      this.params.set('page', page);
      this.params.set('per_page', perPage);
      const { users: profiles } = await this.retry('get', '/users', this.params);
      return profiles;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  /**
   * Return the profile details for a given user
   * @param {String} username
   * @returns {Promise<void>}
   */
  async getProfile(username) {
    try {
      const { user: profile } = await this.retry('get', `/users/${username}`);
      return profile;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  /**
   * Get the profiles of users following the given user
   * @param {String} username
   * @param {Number} page
   * @param {Number} perPage
   * @returns {Promise<*>}
   */
  async getFollowers(username, page = 1, perPage = 24) {
    try {
      const pageInfo = { page, perPage };
      this.params.set('sort', 'appreciations');
      this.params.set('sort_order', 'desc');
      this.params.set('page', page);
      this.params.set('per_page', perPage);
      const { followers } = await this.retry('get', `/users/${username}/followers`, this.params);
      return { followers, pageInfo };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  /**
   * Get the profiles of users followed by the given user
   * @param username
   * @param {Number} page
   * @param {Number} perPage
   * @returns {Promise<*>}
   */
  async getFollowing(username, page = 1, perPage = 24) {
    try {
      const pageInfo = { page, perPage };
      this.params.set('sort', 'appreciations');
      this.params.set('sort_order', 'desc');
      this.params.set('page', page);
      this.params.set('per_page', perPage);
      const { following } = await this.retry('get', `/users/${username}/following`, this.params);
      return { following, pageInfo };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  /**
   * Get the work experience of a given user
   * @param username
   * @returns {Promise<void>}
   */
  async getWorkExperience(username) {
    try {
      const { work_experience: workExperience } = await this.retry('get', `/users/${username}/work_experience`);
      return workExperience;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  /**
   * Get the projects of a given user
   * @param username
   * @param {Number} page
   * @param {Number} perPage
   * @returns {Promise<*>}
   */
  async getProjects(username, page = 1, perPage = 24) {
    try {
      const pageInfo = { page, perPage };
      this.params.set('sort', 'published_date');
      this.params.set('sort_order', 'desc');
      this.params.set('page', page);
      this.params.set('per_page', perPage);
      const { projects } = await this.retry('get', `/users/${username}/projects`, this.params);
      return { projects, pageInfo };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  /**
   * Retries a method
   * @param {String} fcn
   * @param args A list of arguments that captured using rest
   * @returns {Promise<void>}
   */
  retry = async (fcn, ...args) => {
    const retries = 3;
    let lastError;
    for (let i = 0; i < retries; i++) {
      try {
        const response = await this[fcn](...args); // eslint-disable-line no-invalid-this
        log(`${fcn} operation successful`);
        return response;
      } catch (e) {
        log(`Caught error in retry method for ${fcn}, attempt #${i + 1}`);
        log(e.message);
        lastError = e;
      }
    }
    throw lastError;
  };
}
