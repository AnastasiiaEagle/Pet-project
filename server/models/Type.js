const db = require('../database/conection.js')
module.exports = class Type{
    constructor(typeID, name){
        this.typeID = typeID
        this.name = name
    }

    static save(inf, callback){
        db.query('INSERT INTO type(type) VALUE(?)',
        [inf.name], (err)=>{
            if(err){
                console.log(err)
                callback(err)
            }else{
                callback(null)
            }
        })
    }

    static show(callback){
        db.query('SELECT * FROM type', (err, data)=>{
            if(err){
                callback(err, null)
            }else if(data.length == 0){
                return callback(null, 'null')
            }else{
                callback(null, data)
            }
        })
    }

    static update(inf, callback){
        db.query('UPDATE type SET type = ? WHERE id_type = ?',
        [inf.name, inf.typeID], (err)=>{
            if(err){
                callback(err)
            }else{
                callback(null)
            }
        })
    }

    static delete(inf, callback){
        db.query('DELETE FROM type WHERE id_type = ?',
        [inf.typeID], (err)=>{
            if(err){
                console.log(err)
                callback(err)
            }else{
                callback(null)
            }
        })
    }
}
