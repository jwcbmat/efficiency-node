const MetricsCollector = require('../src/data-collection/collector')

describe('MetricsCollector', () => {
  let collector

  beforeEach(() => {
    collector = new MetricsCollector()
  })

  test('should accurately measure CPU usage', () => {
    const cpuUsage = collector.getCpuUsage()
    expect(cpuUsage).toBeDefined()
    expect(typeof cpuUsage).toBe('string')
  })

  test('should accurately measure memory usage', () => {
    const memoryUsage = collector.getMemoryUsage()
    expect(memoryUsage).toBeDefined()
    expect(memoryUsage).toHaveProperty('rss')
    expect(memoryUsage).toHaveProperty('heapTotal')
    expect(memoryUsage).toHaveProperty('heapUsed')
    expect(memoryUsage).toHaveProperty('external')
  })

  test('should accurately measure response time', () => {
    const responseTime = collector.getResponseTime()
    expect(responseTime).toBeDefined()
    expect(typeof responseTime).toBe('number')
  })
})
