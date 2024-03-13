const http = require('http')
const MetricsMiddleware = require('../middlewares/metrics-middleware')

const metricsMiddleware = new MetricsMiddleware(true)

/**
 * Mock data for dog information.
 */
const dogs = [
  { id: 1, name: 'Buddy', breed: 'Golden Retriever', age: 3 },
  { id: 2, name: 'Charlie', breed: 'Labrador', age: 5 },
  { id: 3, name: 'Max', breed: 'Beagle', age: 4 },
]

/**
 * The server for dog-related API.
 */
const server = http.createServer((req, res) => {
  // tests
  metricsMiddleware.use(req, res, () => {
    if (req.url === '/dogs' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(dogs))
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Route not found' }))
    }
  })
})

const PORT = 3000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
