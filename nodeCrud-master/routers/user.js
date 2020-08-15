const express = require('express');
const mysql = require('mysql');
const router =  express.Router();

// test endpoint  
router.get('/',(req,res) => {
    res.send('hello world');
   });

// db connectivity
   const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"nodeCrud"
   }); 

   const data =  db.connect((err)=>{
    if(err){
        throw "data base connection error ......";
    }
    console.log('database conected........');
  });




// fetch all data from database 

router.get('/user/',(req,res)=>{
    const usersql= "SELECT * FROM restapi";
    db.query(usersql,(err,rows,fields)=>{
        if(err){
            console.log("faield sql query"+err);
            res.status(409);
        }
    res.status(200).json(rows);
    });
});




// ftech  single data from database 

router.get('/user/:id',(req,res)=>{
    const userid = req.params.id;
    const usersql= "SELECT * FROM restapi WHERE id = ?"
    db.query(usersql,[userid],(err,rows,fields)=>{
        if(err){
            console.log("faield sql query"+err);
            res.status(409);
        }
    console.log("fetch id"+req.params.id);
    res.status(200).json(rows);
    });
});




// inserted data into database 

router.post('/create_user',(req,res)=>{
    console.log('this is the post request');
    console.log(req.body);
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    sqluser="INSERT INTO restapi(firstname,lastname) VALUES (?,?)";
    db.query(sqluser,[firstname,lastname],(err,results,fields)=>{
     if(err)
     {
         console.log("mysql error" + err);
         res.status(406).send({inserted:false});
     }
     res.status(201).send({inserted:true});
    });
   
});

   


//delete single record form database

router.delete('/del_user/:id',(req,res)=>{
    console.log('this is the delete request');
    sqluserdel  ="DELETE FROM restapi where id = ?";
    db.query(sqluserdel,[req.params.id],(err,results,fields)=>{
     if(err)
     {
         console.log("mysql error" + err);
         res.status(406).send({deleted:false});
     }
     console.log("data deleted");
     res.status(204).send({deleted:true});
    });
 });



  //Edit a record from db
  
   router.put('/edit_user/:id',(req,res)=>{
    console.log('this is the edit request');
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    sqluser="UPDATE restapi set firstname = ? , lastname = ? where id = ?";
    db.query(sqluser,[firstname,lastname,req.params.id],(err,results,fields)=>{
     if(!err)
     {
        console.log("data updated");
        res.status(201).send({updated:true});
     }
     else{
        res.status(406).send({updated:false});
        console.log("mysql error" + err);
     }
     

    });
   
   });


   module.exports= router;