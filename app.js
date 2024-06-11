const express = require('express')
const path = require('path')

const root = path.basename;

const app = express()

app.use(express.static("public"))

app.get("/", function (req, res) {
  const indexHtml = path.join(root, '/public/index.html')
  res.sendFile(indexHtml)
})

app.listen(process.env.PORT || 443, 
	() => console.log("Server is running..."));
