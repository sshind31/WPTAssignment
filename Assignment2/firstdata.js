let dbparams=
{
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'jsexercise',
	port:3306
};
const mysql=require('mysql2');
const express=require('express');
const con=mysql.createConnection(dbparams);
const app=express();
app.use(express.static('html'));
app.get('/pincodedata',(req,res)=>{
    let input=req.query.emid;
    let output={status:false,row:{}}
    con.query('select ename from emp where empid=?',[input],(err,rows)=>{
        if (err){
            console.log('mar padegi abhi');
            output.status=false;
            output.row={};
        }else{
            console.log('chalo sab thik hai',rows.length);
            if(rows.length>0){
                output.status=true;
                console.log(rows[0]);
                output.row=rows[0];
            }
        }
        res.send(output);
    })
})
app.listen(100,console.log('running'));