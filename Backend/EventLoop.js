const fs= require('fs')
fs.writeFile("newFile.txt",'Added First', 'utf8',(err)=>{
       if(err) console.log(err)
       else{
       console.log('This will go into the stack and execute')
       }
});
setTimeout(()=>{fs.appendFile("newFile.txt"," Added last", 'utf8',(err)=>{
    if(err) console.log(err)
    else{
    console.log('This statement will wait 5 seconds and than enter callback queue finally entering stack and execute')
    }
})},5000);
fs.appendFile("newFile.txt"," Added Second", 'utf8',(err)=>{
    if(err) console.log(err)
    else{
   console.log('This statement will be executed 2nd will directly enter the stack and execute')
    }
})