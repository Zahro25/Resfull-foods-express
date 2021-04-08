const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
app.use(express.urlencoded({extended : true}));

const koneksiDB = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "week1"
})

koneksiDB.connect((err)=>{
    if(err){
        console.log("database not connect");
    }else{
        console.log("database terhubung");
    }
})

app.get("/api/foods", (req, res)=>{
    let sql = "select * from foods";
    koneksiDB.query(sql, (err, results)=>{
        if(err){
            res.send({
                msg:"failed get data",
                status : 500,
                err,
            })
        }else{
            res.send({
                msg: "get data success",
                status: 200,
                data:results,
            })
        }
    })
});

app.get("/api/foods/:id", (req, res)=>{
    let {id} = req.params;
    let sql = ` select * from foods where id = ${id}`;
    koneksiDB.query(sql, (err, results)=>{
        if (err) {
            res.send({
                msg : "GET DATA ID ERROR",
                status : 500,
                err,
            })
        }else{
            res.send({
                msg : "GET DATA ID SUCCESS",
                status: 200,
                data : results,
            })
        }
    })
})

app.post("/api/foods",(req,res)=>{
    let {body} = req;
    let sql = "insert into foods set ?";
    koneksiDB.query(sql, body, (err, results)=>{
        if (err){
            res.send({
                msg : "add data error",
                status : 500,
                err,
            })
        }else{
            let newBody = {
                id : results.insertId,
                ...body,
            };
            res.send({
                msg: "add data success",
                status: 200,
                data : newBody,
            })
        }
    })
})

app.put("/api/foods/:id", (req, res) =>{
    let {id} = req.params;
    let {body} = req;
    let sql = `update foods set ? where id =${id}`
    koneksiDB.query(sql, body, (err, result) =>{
        if(err){
            res.send({
                msg: " update data err",
                status: 500,
                err,
            })
        }else{
            let newBody = {
                id: result.id,
                ...body,
            }
            console.log(newBody);
            res.send({
                msg: "update data success",
                status: 200,
                data: newBody,
            })
        }
    })
})

app.delete("/api/foods/:id", (req, res)=>{
    let {id} = req.params;
    let sql = ` delete from foods where id = ${id}`;
    koneksiDB.query(sql, (err, results)=>{
        if (err) {
            res.send({
                msg : "Delete Foods Error",
                status : 500,
                err,
            })
        }else{
            res.send({
                msg : "Delete Foods Succes",
                status: 200,
                data : results,
            })
        }
    })
})
app.listen(port, ()=>{
    console.log("server jalan di port"+port);
})