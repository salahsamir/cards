const express=require('express')
const cors=require('cors')
const mysql=require('mysql2')
const app=express()
app.use(express.json(),cors())
const sql =mysql.createConnection({
    host:'localhost',
    user:"root",
    database:"cards"
})
app.get('/cards',(req,res,next)=>{
    const query=`select * from cards`;
    sql.execute(query,(error,result,fields)=>{
        if(error){
            return res.json({message:"error"})
        }
        return res.json({message:'Done',result})
    })
})
app.post('/cards',(req,res,next)=>{
    const{name,email,age}=req.body
    console.log({name,email,age});
    const query=`insert into cards(name,email,age) values('${name}','${email}',${age})`;
    sql.execute(query,(error,result)=>{
        if(error){
            return res.json({message:"error"})
        }
        return res.json({message:"done",result})

    })
})
app.delete('/cards',(req,res,next)=>{
    const{id}=req.query
    console.log(id);
    
    const query=`delete from cards  where id=${id}`;
    sql.execute(query,(error,result)=>{
        if(error){
            return res.json({message:"error"})
        }
        return result.affectedRows? res.json({message:"done",result}):  res.json({message:"error"})

    })
})
app.put('/cards/:id',(req,res,next)=>{
    const{id}=req.params
    const{name,email,age}=req.body
    const query=`UPDATE cards
    SET name = '${name}', email = '${email}',age= ${age}
    WHERE id= ${id}`;
    sql.execute(query,(error,result)=>{
        if(error){
            return res.json({message:"error",error})
        }
        return result.affectedRows? res.json({message:"done",result}):  res.json({message:"error"})

    })
})
app.post('/card',(req,res,next)=>{
    const{name}=req.body
    console.log({name});
    const query=`select * from cards where name like'%${name}%'`;
    sql.execute(query,(error,result)=>{
        if(error){
            return res.json({message:"error"})
        }
        return res.json({message:"done",result})

    })
})

app.listen(5000)