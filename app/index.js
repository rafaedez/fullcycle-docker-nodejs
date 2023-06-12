const express = require('express')
const app = express()
const mysql = require('mysql')
const port = 3000
const configDB = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const connection = mysql.createConnection(configDB)
const sqlDelete = `DELETE FROM PEOPLE`
connection.query(sqlDelete)
const valuesToInsert = [['JONAS GUILHERME'],['JOAQUIM GUSTAVO'],['SERGIO CARVALHO'],['MARIA JOAQUINA'],['MARIO FONSECA'],['PAULA SOUZA'],['LUIZ AUGUSTO']]
const sqlInsert = `INSERT INTO PEOPLE (NAME) VALUES ?`
connection.query(sqlInsert, [valuesToInsert])
connection.end()

const listPeople = (connection) => {
    let sqlPeople = `SELECT NAME FROM PEOPLE`
    return new Promise((resolve,reject) =>  {
        const handle = connection.query(sqlPeople, (err, result) =>{
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    })
}

const renderlistPeople = (rows) => {
    return '<ul>'+rows.reduce((rowsRendered, row)=>rowsRendered+'<li>'+row.NAME+'</li>','')+'</ul>'
}

app.get('/', async (req, res) => {
    const connection = mysql.createConnection(configDB)
    let result = await listPeople(connection)
    connection.end()
    res.send('<h1>Full Cycle Rocks!</h1><br>'+'<h2>'+result.length+' pessoas encontradas</h2><br>'+renderlistPeople(result))
})

app.listen(port, () => {
    console.log('Rodando na porta '+port)
})
