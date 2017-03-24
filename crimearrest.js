const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
 input: fs.createReadStream('crimedata.csv')
});

jsonobj = [];

rl.on('line', (line) => {
    var lin = line.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/);
    var obj = {};
    obj.year = lin[17];
    obj.arrested = 0;
    obj.notarrested = 0;
    var years=lin[17];
    var flag = 0;
    var arrest=lin[8];
    
    if(lin[5] === "ASSAULT" ) {
         for (var i = 0; i < jsonobj.length; i++) {
             if(jsonobj[i].year == years) {
                 if(arrest == "true") {
                     jsonobj[i].arrested = parseInt(jsonobj[i].arrested)+1;
                     flag++;

                }
                 else if(arrest == "false") {
                    jsonobj[i].notarrested = parseInt(jsonobj[i].notarrested)+1;        
                    flag++;            
                 }
             }
        };
        if(flag == 0) {
            if(arrest=="true"){
                obj.arrested=1;
                jsonobj.push(obj);
            }
                        if(arrest=="false"){
                obj.notarrested=1;
                jsonobj.push(obj);
            }
        }      
    }
});
rl.on('close', function() {

  console.log(jsonobj);
   fs.writeFileSync('crimearrest.json', JSON.stringify(jsonobj));
});