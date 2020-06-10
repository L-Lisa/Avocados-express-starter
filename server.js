import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import data from "./data.json"

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello happy world')
})

app.get("/avocados", (req, res) => {
  const page = req.query.page ?? 0
  const pageSize = req.query.pageSize ?? 20
  const startIndex = page * pageSize
  const endIndex = startIndex + +pageSize

  const salesForPage = data.slice(startIndex, endIndex)

  const returnObject = {
    pageSize: pageSize,
    page: page,
    maxPages: parseInt(data.length / pageSize),
    results: salesForPage,
  }

  res.send(returnObject)
})


app.get("/avocados/:id", (req, res) => {
  const { id } = req.params //updates to take path variable find "avocados/id"
  /* console.log(`the req.params are: ${JSON.stringify(req.params)}`) */
  /* console.log(id) */
  const findById = data.find( // find the string?
    (avocado) => avocado.id == id)
  /*  console.log(findById) */
  res.send(findById)
})

/* sort on price functions...
app.get("/avocados/:averagePrice",(req,res) => {
  const averagePrice = req.params.averagePrice
  res.json(averagePrice)
}) 
 */

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
