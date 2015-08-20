var fs = require('fs');
var contents = fs.readFileSync('test.txt').toString();


function processData(input) {
    var parse_fun = function (s) { return parseInt(s, 10); }; //takes string input and returns an Number
     
    var lines = input.split('\n'); //make an array out of the lines of input, we split the input on a line break

    var T = parse_fun(lines.shift()); //removes the first element 'T' of the array and then turns that in Number

    // 'T' is the number of test cases to calculate. T anywhere from 1 - 10. Its also the length of the remaining array of test cases.

    // 'N' is the number of growth cycles. There are 2 growth cycles per year. N is anywhere from 0 - 60

    // 1st Cycle: height doubles in Spring. 2nd Cycle: height increases by 1 meter during Summer. 
    var finalArray = [];//Keep final array so that we can turn this array into lines as our final result

    var data = lines.splice(0, T).map(parse_fun); //we parse every string element of our array of test cases and return an array of Numbers
    //this could also be shortened to var data = lines.map(parse_fun);

    console.log(data);

    //We start off with a tree planed on the beginning of Spring that is 1 meter tall. After 1 growth cycle (half a Year), the tree is now 2 meters
    //After 4 growth cycles (2 Years) the tree is 7 meters

    //our Tree starts off equal to 1 (meter).
    // INPUT: [ 0, 1, 4 ]
    // OUTPUT: 3 lines: 1 - 2 - 7
    var Tree = 1; 
    //loop through our array and work on every test case element
    for(var i = 0; i < data.length; i++) {
        //each element of our array is N growth cycles. An odd N growth cycle is Spring time where it DOUBLES. 
        //an even N is Summer where it just adds 1 to it. 
        //loop through N and then for every Odd Num, double the Tree and for every Even Num, just add 1 to the Tree. 

        
        if(data[i] == 0) {//If the element is 0 growth cycles, then return the Tree (1 meter) and push that into finalArray
            finalArray.push(Tree);
        }else if(data[i] == 1) {//If the element is 1 growth cycle, then return the Tree (1 + 1) and push that into finalArray
            finalArray.push(Tree + 1);
            Tree = 1; //reset Tree to be 1 meter for the next test case
        }else if(data[i] > 1) {
            //loop through the Num of cycles and then if the cycle is odd, double the height, if its even add 1. 
            for(var j = 1; j <= data[i]; j++) {
                if(j == 1) {
                    Tree++;
                }else if(j > 1 && j % 2 != 0) {
                    Tree = Tree * 2;
                }else if(j > 1 && j % 2 == 0) {
                    Tree++; 
                }
            }
            finalArray.push(Tree);  //outside our loop, push our Tree height into our finalArray of outputs
            Tree = 1; //reset Tree to be 1 meter for the next test case
        }

       
    }
    var result = finalArray.join('\n');    
    console.log(result); 
    return result;

}

processData(contents);


//I am using a different file read method above
 
// process.stdin.resume();
// process.stdin.setEncoding("ascii");
// var _input = "";
// process.stdin.on("data", function (input) { _input += input; });
// process.stdin.on("end", function () { processData(_input); });