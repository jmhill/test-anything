var fs = require('fs')
var path = require('path')
var exec = require('child_process').exec
var concat = require('concat-stream')


exports.problem = fs.createReadStream(path.join(__dirname, 'problem.txt'))
exports.solution = fs.createReadStream(path.join(__dirname, 'solution.txt'))


exports.verify = function (args, pass) {
  var cmd = 'node ' + path.join(process.cwd(), args[0]) +
   ' ' + path.join(__dirname, 'emotify.js') + 
   ' ' + '"testing like a pro"'
  
  var program = exec(cmd)
  
  program.stdout.pipe(concat(function (result) {
      if(result === 'testing like a pro :)\n') {
        pass(true)
      } else {
        console.log('Something is not right there')
        pass(false)
      }
    
  }))
  
  
}