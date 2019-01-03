import express from "express"

const server = express()

server.get("/*", (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" })
  res.end(JSON.stringify({ isServerReady: true }))
})

server.listen(8080, () => {
  console.log("listening to port 8080!")
})
