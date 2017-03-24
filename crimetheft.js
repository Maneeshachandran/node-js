 
const readline =  require('readline');
const fs = require('fs');

const rl = readline.createInterface({
 input: fs.createReadStream('crimedata.csv')
});

jsonobj = [];

var countt = 0,countf = 0;
rl.on('line', (line) => {
    var lin = line.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/);
    var obj = {};
    obj.year = lin[17];
    var description = ["OVER $500","$500 AND UNDER"];
    //obj.description =0;
    obj.overfive = 0;
    obj.underfive = 0;
    var years=lin[17];
    var flag = 0;
    var value=lin[6];
    if(description.indexOf(value) != -1) {
        
        for (var i = 0; i < jsonobj.length; i++) {
             if(jsonobj[i].year == years) {
                 if(value == description[0]) {
                     jsonobj[i].overfive = parseInt(jsonobj[i].overfive)+1;
                     flag++;

                 }
                 else if(value == description[1]) {
                    jsonobj[i].underfive = parseInt(jsonobj[i].underfive)+1;         
                    flag++;            
                 }
             }
        }; 
        if(flag == 0) {
            if(value==description[0]){
                obj.overfive=1;
               jsonobj.push(obj); 
            }

            if(value==description[1]){
                obj.underfive=1;
               jsonobj.push(obj); 
            }
        
        
        }      
    }
});

rl.on('close', function() {

   console.log(jsonobj);
    fs.writeFileSync('crimetheft.json', JSON.stringify(jsonobj));
});

