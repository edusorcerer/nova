import express from "express"

const server = express()

server.get("/*", (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" })
  res.end(JSON.stringify({ isServerReady: false }))
})

const port = 4000

server.listen(port, () => {
  console.log("server started! listening to port " + port)
})
