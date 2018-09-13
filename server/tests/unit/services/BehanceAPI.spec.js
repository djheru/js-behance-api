import proxyquire from 'proxyquire';
import loggerStubHelper from '../helpers/logger';
import { URLSearchParams } from 'apollo-server-env';

const proxyquireStrict = proxyquire.noCallThru();
const { logStub, loggerStub } = loggerStubHelper();

describe('(BehanceAPI Service)', () => {
  const apiKey = 'abc123';
  let BehanceAPIProxy;
  let behanceInstance;
  let getStub;

  beforeEach(() => {
    getStub = sinon.stub();
    const BehanceAPIModule = proxyquireStrict(
        '../../../src/services/BehanceAPI',
        {
          '../utils/logger': loggerStub
        }
    );
    BehanceAPIProxy = BehanceAPIModule.BehanceAPI;
    behanceInstance = new BehanceAPIProxy(apiKey);
    sinon.stub(behanceInstance, 'get').callsFake(getStub);
  });

  describe('getProfiles', () => {
    it('should make a GET request to /users', async () => {
      const queryTerm = 'joe';
      const expectedURI = `/users`;
      const expectedResponse = { users: ['joe'] };
      getStub.returns(Promise.resolve(expectedResponse));

      await behanceInstance.getProfiles(queryTerm);
      expect(getStub).to.be.calledWith(expectedURI, sinon.match.instanceOf(URLSearchParams));
    });

    it('should format the query string params', async () => {
      const queryTerm = 'joe';
      const page = 42;
      const expectedResponse = { users: ['joe'] };
      const expectedParams = new URLSearchParams(`q=${queryTerm}&page=${page}&per_page=10`);
      getStub.returns(Promise.resolve(expectedResponse));

      await behanceInstance.getProfiles(queryTerm, page);
      expect(getStub.getCall(0).args[1].toString()).to.eql(expectedParams.toString());
    });

    it('should retry, log, and re-throw errors', async () => {
      const queryTerm = 'joe';
      const expectedError = new Error('Error retrieving profiles');
      try {
        getStub.throws(expectedError);

        await behanceInstance.getProfiles(queryTerm);
        assert.fail('should have thrown and caught an Error');
      } catch (e) {
        expect(getStub).to.be.calledThrice;
        expect(logStub).to.be.calledWith(e.message);
        expect(loggerStub.error).to.be.calledWith(e);
        expect(e).to.equal(expectedError);
      }
    });
  });

  describe('getProfile', () => {
    it('should make a GET request to /users/${username}', async () => {
      const username = 'jane';
      const expectedURI = `/users/${username}`;
      const expectedResponse = { user: 'jane' };
      getStub.returns(Promise.resolve(expectedResponse));

      await behanceInstance.getProfile(username);
      expect(getStub).to.be.calledWith(expectedURI);
    });

    it('should retry, log and re-throw errors', async () => {
      const username = 'joe';
      const expectedError = new Error('Error retrieving profile');
      try {
        getStub.throws(expectedError);

        await behanceInstance.getProfile(username);
        assert.fail('should have thrown and caught an Error');
      } catch (e) {
        expect(getStub).to.be.calledThrice;
        expect(logStub).to.be.calledWith(e.message);
        expect(loggerStub.error).to.be.calledWith(e);
        expect(e).to.equal(expectedError);
      }
    });
  });

  describe('getFollowers', () => {
    it('should make a GET request to /users/${username}/followers', async () => {
      const username = 'joe';
      const expectedURI = `/users/${username}/followers`;
      const expectedResponse = { followers: ['jay'] };
      getStub.returns(Promise.resolve(expectedResponse));

      await behanceInstance.getFollowers(username);
      expect(getStub).to.be.calledWith(expectedURI, sinon.match.instanceOf(URLSearchParams));
    });

    it('should format the query string params', async () => {
      const username = 'joe';
      const page = 42;
      const expectedResponse = { followers: ['jay'] };
      const expectedParams = new URLSearchParams(`sort=alpha&sort_order=asc&page=${page}&per_page=10`);
      getStub.returns(Promise.resolve(expectedResponse));

      await behanceInstance.getFollowers(username, page);
      expect(getStub.getCall(0).args[1].toString()).to.eql(expectedParams.toString());
    });

    it('should retry, log, and re-throw errors', async () => {
      const username = 'joe';
      const expectedError = new Error('Error retrieving followers');
      try {
        getStub.throws(expectedError);

        await behanceInstance.getFollowers(username);
        assert.fail('should have thrown and caught an Error');
      } catch (e) {
        expect(getStub).to.be.calledThrice;
        expect(logStub).to.be.calledWith(e.message);
        expect(loggerStub.error).to.be.calledWith(e);
        expect(e).to.equal(expectedError);
      }
    });
  });

  describe('getFollowing', () => {
    it('should make a GET request to /users/${username}/following', async () => {
      const username = 'joe';
      const expectedURI = `/users/${username}/following`;
      const expectedResponse = { following: ['jan'] };
      getStub.returns(Promise.resolve(expectedResponse));

      await behanceInstance.getFollowing(username);
      expect(getStub).to.be.calledWith(expectedURI, sinon.match.instanceOf(URLSearchParams));
    });

    it('should format the query string params', async () => {
      const username = 'joe';
      const page = 42;
      const expectedResponse = { following: ['jan'] };
      const expectedParams = new URLSearchParams(`sort=alpha&sort_order=asc&page=${page}&per_page=10`);
      getStub.returns(Promise.resolve(expectedResponse));

      await behanceInstance.getFollowing(username, page);
      expect(getStub.getCall(0).args[1].toString()).to.eql(expectedParams.toString());
    });

    it('should retry, log, and re-throw errors', async () => {
      const username = 'joe';
      const expectedError = new Error('Error retrieving following');
      try {
        getStub.throws(expectedError);

        await behanceInstance.getFollowing(username);
        assert.fail('should have thrown and caught an Error');
      } catch (e) {
        expect(getStub).to.be.calledThrice;
        expect(logStub).to.be.calledWith(e.message);
        expect(loggerStub.error).to.be.calledWith(e);
        expect(e).to.equal(expectedError);
      }
    });
  });

  describe('getWorkExperience', () => {
    it('should make a GET request to /users/${username}/work_experience', async () => {
      const username = 'joe';
      const expectedURI = `/users/${username}/work_experience`;
      const expectedResponse = { work_experience: 'workin for a livin' };
      getStub.returns(Promise.resolve(expectedResponse));

      await behanceInstance.getWorkExperience(username);
      expect(getStub).to.be.calledWith(expectedURI);
    });

    it('should retry, log and re-throw errors', async () => {
      const username = 'joe';
      const expectedError = new Error('Error retrieving work experience');
      try {
        getStub.throws(expectedError);

        await behanceInstance.getWorkExperience(username);
        assert.fail('should have thrown and caught an Error');
      } catch (e) {
        expect(getStub).to.be.calledThrice;
        expect(logStub).to.be.calledWith(e.message);
        expect(loggerStub.error).to.be.calledWith(e);
        expect(e).to.equal(expectedError);
      }
    });
  });

  describe('getProjects', () => {
    it('should make a GET request to /users/${username}/projects', async () => {
      const username = 'jane';
      const expectedURI = `/users/${username}/projects`;
      const expectedResponse = { projects: ['mydesigns'] };
      getStub.returns(Promise.resolve(expectedResponse));

      await behanceInstance.getProjects(username);
      expect(getStub).to.be.calledWith(expectedURI);
    });

    it('should retry, log and re-throw errors', async () => {
      const username = 'joe';
      const expectedError = new Error('Error retrieving projects');
      try {
        getStub.throws(expectedError);

        await behanceInstance.getProjects(username);
        assert.fail('should have thrown and caught an Error');
      } catch (e) {
        expect(getStub).to.be.calledThrice;
        expect(logStub).to.be.calledWith(e.message);
        expect(loggerStub.error).to.be.calledWith(e);
        expect(e).to.equal(expectedError);
      }
    });
  });
});
