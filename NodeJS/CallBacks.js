function printresults(res)
{
    console.log("Results : ",res);
}
function calc(val1,val2,printresults)
{
    var result = val1+val2;
    printresults(result);
}
var lmao  = 9123123;
calc(10,20,printresults);
//module . exports: exports all the reusable finctions and reusable codes x
module.exports = {
    cal:calc,printresults,lmao
}