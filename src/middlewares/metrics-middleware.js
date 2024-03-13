const MetricsCollector = require('../data-collection/collector')

/**
 * Middleware class for collecting and handling API performance metrics.
 */
class MetricsMiddleware {
  /**
   * Initializes the middleware with optional logging.
   * @param {boolean} logMetrics - Whether to log metrics to the console.
   */
  constructor(logMetrics = false) {
    this.logMetrics = logMetrics
  }

  /**
   * Middleware function to collect and handle metrics.
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @param {Function} next - The next middleware function in the stack.
   */
  use(req, res, next) {
    const collector = new MetricsCollector()
    let finished = false

    const finishResponse = () => {
      if (!finished) {
        finished = true
        if (this.logMetrics) {
          console.log(`CPU Usage: ${collector.getCpuUsage()}%`)
          console.log(
            `Memory Usage: ${JSON.stringify(collector.getMemoryUsage())}`
          )
          console.log(`Response Time: ${collector.getResponseTime()}ms`)
        }
      }
    }

    // Override the 'end' method of the response to capture the end of the request
    const originalEnd = res.end
    res.end = function (...args) {
      finishResponse()
      originalEnd.apply(res, args)
    }

    next()
  }
}

module.exports = MetricsMiddleware
