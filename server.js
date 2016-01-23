//set up
var express  = require('express')
var app      = express()

// configuration =================


app.use(express.static(__dirname + '/public'))

// application -------------------------------------------------------------
app.get('*', function(req, res) {
    res.sendfile('./public/index.html')
})

// listen (start app with node server.js)
app.listen(8080)
console.log("App listening on port 8080")