/**
 * Health check middleware
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export function healthCheck(req, res, next) {
  return res.json({
    status: 'ok'
  });
}
