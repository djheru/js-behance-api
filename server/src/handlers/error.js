import logger from '../utils/logger';

const log = logger.log('app:handlers:error');

/**
 * Log NotFound errors before passing them on to the internalServerErrorHandler
 * @param req
 * @param res
 * @param next
 */
export function notFoundHandler(req, res, next) {
  log('404 Middleware');
  const err = new Error();
  err.status = 404;
  err.message = 'Not Found';
  next(err);
}

/**
 * Handle unhandled middleware errors
 * @param err
 * @param req
 * @param res
 * @param next
 */
export function internalServerErrorHandler(err, req, res, next) {
  log(`Error Middleware - Status: ${err.status} - Message: ${err.message}`);
  res
      .status(err.status || 500)
      .json({
        message: err.message || 'Server Error'
      });
}
