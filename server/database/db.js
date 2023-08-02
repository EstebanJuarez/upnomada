import { Sequelize } from "sequelize";

const db = new Sequelize('upnomada_bd','root','',{
    host:'localhost',
    dialect:'mysql'
})

export default db