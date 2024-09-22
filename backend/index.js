const express = require('express');
const { PythonShell } = require('python-shell')
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json())
app.post('/', (req,res) => {
    let output=""
    code = req.body.code
    PythonShell.runString(code,null).then(messages => {
        
        messages.forEach(message => {
            output += message + '\n'
        });
        res.json({output : output })
        
    }).catch( err => {
        res.json({output : err.toString() })
        
    })
   
})




app.listen(8000)