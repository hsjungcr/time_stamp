var express = require('express')
var moment = require('moment')
var fs = require('fs')
var path = require('path')

var app = express()
var port = process.env.PORT|| 8000

app.listen(port,() => console.log('Listening on port: ' + port))

app.use(express.static(path.join(__dirname + '/css')))

app.get('/',(req, res) => {
  let fileName = path.join(__dirname, 'index.html')
  res.sendFile(fileName, (err) => {
    if(err){
      console.log(err)
      res.status(err.status).end()
    }
    else{
      console.log('Sent: ', fileName)
    }
  })
})

app.get('/:datestring' , (req,res) => {
  var myDate;
  if(/^\d{8,}$/.test(req.params.datestring)) {
    myDate = moment(req.params.datestring, 'X')
  }
  else{
    myDate = moment(req.params.datestring, 'MMMM DD, YYYY')
  }

  if(myDate.isValid()){
    res.json({
      unix: myDate.format('X'),
      natural: myDate.format('MMMM DD, YYYY')
    })
  }
  else {
    res.json({
      unix: null,
      natural: null
    })
  }
})
