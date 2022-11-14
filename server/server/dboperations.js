var config = require('./dbconfig');
const sql = require("mssql/msnodesqlv8");

async function addTable(table) {
    var Name = table.Name;
    var Email = table.Email;
    var Number = table.Number
    var Password = table.Password;
    var Role = table.Role;
    try {
        let pool = await sql.connect(config);
        let insertDetail = await pool.request()
            .query`INSERT INTO dbo.mytable (Name,Email,Number,Password,Role) 
        OUTPUT Inserted.* 
        VALUES (${Name},${Email},${Number},${Password},${Role})`;
        return insertDetail.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function login(res, credentials) {
    var Email = credentials.Email;
    var Password = credentials.Password;

    if(Email && Password) {
        let pool = await sql.connect(config);
        let loginDetail = await pool.request()
            .query`SELECT * from dbo.mytable where Email = ${Email} and Password = ${Password}`;
        if (loginDetail.recordset.length > 0) {
            return loginDetail
        } else {
            res.send('Username and/or Password not found');
        }
    } else {
        res.send('Please enter Username and Password');
    }
}

module.exports = {
    addTable: addTable,
    login: login
}