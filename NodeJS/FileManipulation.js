const { dir, Console } = require('console');
const { FILE } = require('dns');
var files=require('fs');
var fdesc=0
//OPEN(<FILENAME,<MODE>,<CALLBACKFUNCTION>))
//MODE OF OPENING CAN BE r-read,w-write,a-append
files.open('Demo.txt','a',function(err,fd){            //Opens the file in write mode.
    if(err !=undefined){
    console.log(err.message);
    console.log(err.code);
    }else{
        console.log('File opened successfully.');
        console.log(fd);
        fdesc=fd;
    }


var str=new Buffer.from('Welcome to NodeJS\n');
console.log(fdesc);
//WRITE(<FILENO.><DATATOBEWRITTEN>,<STARTINGPOSITION>,<SIZE>,<BUFFER||NULL>,<CALLBACKFUNCTION>)
files.write(fdesc,str,0, str.length,null, function(err,written){
    console.log('Wrote' +written+'characters to the file');
    console.log(err);
})
files.close(fdesc, function(){
    console.log('File closed successfully.')
});
});

