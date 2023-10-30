var files=require('fs');
var fdesc=0;


files.readFile('Demo1.txt','utf8',function(err,data){
    if(err !=undefined){
    console.log(err.message);
    console.log(err.code);
    }else{
        console.log(data);
    }

})