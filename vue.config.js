//连接数据库
const express = require('express');
const app = express()
const mysql = require('mysql2');
const bodyParser = require('body-parser')

app.use(bodyParser);

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123',
    database:'todo'
})

connection.connect();

module.exports = {
    devServer:{
        before:function(app){
            app.get('/api/tasks',(req,res) => {
                connection.query('SELECT * FROM tasks ORDER BY created DESC', (error, results) => {
                    if (error) return res.json({
                        error: error
                    });
            
                    res.json(results);
                })
            })
        }
    }
}

//本地模拟数据

// const express = require('express');
// const app = express();

// var appData = require('./data.json');
// var books = appData.books

// var apiRouters = express.Router();
// app.use('./api',apiRouters);

// module.exports = {
//     devServer:{
//         before:function(app){
//             app.get('/api/books',(req,res) =>{
//                 res.json({
//                     error:0,
//                     data:books
//                 })
//             })
//         }
//     }
// }