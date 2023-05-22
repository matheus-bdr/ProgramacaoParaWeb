var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/somar/:n1/:n2', function (req, res) {
    res.send('n1 = '+req.params.n1)
})

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})
