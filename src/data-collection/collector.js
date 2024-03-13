const process = require('process')

/**
 * Class for collecting API performance metrics.
 */
class MetricsCollector {
  constructor() {
    this.cpuUsage = process.cpuUsage()
    this.startTime = process.hrtime()
  }

  /**
   * Calculate CPU usage since object creation.
   * @returns {string} CPU usage in percentage.
   */
  getCpuUsage() {
    const currentUsage = process.cpuUsage(this.cpuUsage)
    const totalUsage = currentUsage.user + currentUsage.system
    return (totalUsage / 1000).toFixed(2) // Convert to percentage
  }

  /**
   * Get memory usage of the Node.js process.
   * @returns {object} Memory usage details.
   */
  getMemoryUsage() {
    return process.memoryUsage()
  }

  /**
   * Get response time for an API request.
   * @returns {number} Response time in milliseconds.
   */
  getResponseTime() {
    const diff = process.hrtime(this.startTime)
    return (diff[0] * 1e9 + diff[1]) / 1e6 // Convert to milliseconds
  }

  /**
   * Get network traffic data.
   * @returns {object} Network traffic details.
   */
  getNetworkTraffic() {
    // This will be implemented later as it requires integration with API requests
    return {}
  }
}

module.exports = MetricsCollector
