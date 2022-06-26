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
app.get('/itemdata',(req,res)=>{
    let checker=req.query.op;
    let input=req.query.iid;
    let input1=req.query.iname;
    let input2=req.query.iprice;
    let output={status:false,result:{}}
    console.log(checker);
    if(checker==2){
        //con.query('update iteminfo set itemname=?, itemcost=? where itemid=?',[input1,input2,input],(err,rows)=>
        con.query('insert into iteminfo values(?,?,?)',[input,input1,input2],(err,rows)=>
        { 
                if(err){
                    console.log('error aa gya1')
                    output.status=false;
                    output.result={}
                }
                else{
                    if(rows.affectedRows>0){
                        output.result={comment:'ho gaya'}
                        output.status=true;
                        console.log(rows);
                    }
                }res.send(output);
            })
    }
    else{
        con.query('select * from iteminfo where itemid=?',[input],(err,rows)=>{
                if(err){
                    console.log('error aa gya2')
                    output.status=false;
                    output.result={}
                }
                else{
                    if(rows.length>0){
                        output.result=rows[0]
                        output.status=true;
                        console.log(output.status);
                        console.log(output.result);
                    }
                }res.send(output);
            })
    }
})
app.listen(800,console.log('running'));
