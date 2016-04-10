var stream = require('stream')
var liner = new stream.Transform( { objectMode: true } )
var fs = require('fs')
var source = fs.createReadStream('input-sensor.txt')
var arg = process.argv.slice(2)
var linesArray = new Array()
 
liner._transform = function (chunk, encoding, done) {
     var data = chunk.toString()
     if (this._lastLineData) data = this._lastLineData + data
 
     var lines = data.split(arg)
     this._lastLineData = lines.splice(lines.length-1,1)[0]

     lines.forEach(this.push, this)
     done()
}

source.pipe(liner)
liner.on('readable', function () {
     var line
     while (null !== (line = liner.read())) {
         
         linesArray.push(line.trim())
     }
})

liner.on('end', function(){
	console.log(linesArray)
})