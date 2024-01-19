const pg=require("pg")
const dotenv=require("dotenv")
dotenv.config()
const db=new pg.Pool({
host:process.env.LOCALHOST,
user:process.env.USER,
port:process.env.DB_PORT,
password:process.env.PASSWORD,
database:process.env.DATABASE
})
module.exports={db}