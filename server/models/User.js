const db = require('../database/conection.js')

module.exports = class User{
    constructor(login, password){
        this.login = login
        this.password = password
    }

    static save(inf, callback){
        db.query("INSERT INTO user(login, password, role) VALUES(?,?,'manager')",
        [inf.login, inf.password], (err)=>{
            if(err){
                return callback(err)
            }else{
                callback(null)
            }
        })
    }

    static findUsers(callback){
        db.query("SELECT id_user, login FROM user WHERE role='manager'", (err, data)=>{
            if(err){
                return callback(err, null)
            }else{
                callback(null, data)
            }
        })
    }

    static find(inf, callback){
        db.query("SELECT id_user, login, password, role FROM user WHERE login = ?",
        [inf.login], (err, data)=>{
            if(err){
                return callback(err, null)
            }else{
                callback(null, data)
            }
        })
    }

    static findID(inf, callback){
        db.query("SELECT id_user, login, role FROM user WHERE id_user = ?",
        [inf.login], (err, data)=>{
            if(err){
                return callback(err, null)
            }else{
                callback(null, data)
            }
        })
    }

    static delete(inf, callback){
        db.query("DELETE FROM user WHERE id_user = ?",
        [inf.login], (err)=>{
            if(err){
                return callback(err)
            }else{
                callback(null)
            }
        })
    }
}