export default () => {
  let logStub;
  let loggerStub;

  loggerStub = {
    log: sinon.stub(),
    error: sinon.stub()
  };
  logStub = sinon.stub();
  loggerStub.log.returns(logStub);
  return { logStub, loggerStub };
};
