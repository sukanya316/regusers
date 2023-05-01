const express=require('express');
const mysql=require('mysql')
const cors = require('cors')

const app = express()
app.use(express.json());
app.use(cors())


var mysql_pool  = mysql.createPool({
    connectionLimit : 100,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'reactprojects'
  });

app.get('/',(re,res)=>{
// return res.json('From Backend Side');
    mysql_pool.getConnection(function(err,connection){
        if(err){
            connection.release();
                console.log(' Error getting mysql_pool connection: ' + err);
                throw err;
        }
        return res.json('From Backend Side');
    })
})

app.get('/users',(req,res)=>{
    // const sql='SELECT * FROM users';
    // db.query(sql,(err,data)=>{
    //     if(err) return res.json(err)
    //     return res.json(data)
    // })

    mysql_pool.getConnection(function(err,connection){
        if(err){
            connection.release();
                console.log(' Error getting mysql_pool connection: ' + err);
                throw err;
        }
        else{
            const sql='SELECT * FROM regusers';
            connection.query(sql,(err,data)=>{
            if(err) return res.json(err)
                return res.json(data)
            })
        }
    })
})

app.post('/users',(req,res)=>{
//     const {id,name,age,sex}=req.body
//     db.query('INSERT INTO users(id,name,age,sex) VALUES(?, ?, ?, ?)',[id,name,age,sex],function(err,result){
//         if(err){
//             return console.log(err)
//         }
//         console.log('Data Added',result);
//         db.end()
//     })
//    db.end()
mysql_pool.getConnection(function(err,connection){
    if(err){
        connection.release();
            console.log(' Error getting mysql_pool connection: ' + err);
            throw err;
    }
    else{
        const {name,dob,sex,mobile,govtId,address,guardian,guardianName,nationality}=req.body
        const ageSex=`${dob}Yrs/${sex}`
        const guardianData=`${guardian}: ${guardianName}`
            connection.query('INSERT INTO regusers(name,ageOrSex,mobile,address,govtId,guardianDetails,nationality) VALUES(?, ?, ?, ?, ?, ?,?)',[name,ageSex,mobile,address,govtId,guardianData,nationality],function(err,result){
                if(err){
                    return console.log(err)
                }
                console.log('Data Added',result);
                console.log(' mysql_pool.release()');
			    connection.release();
                return res.status(200).send({message:"done"});
                
            })
          }
})

})

app.listen(8081,()=>{
    console.log('listening')
})