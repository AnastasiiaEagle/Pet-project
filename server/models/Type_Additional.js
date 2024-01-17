const db = require('../database/conection.js')
module.exports = class TypeAdditional{
    constructor(typeID, name){
        this.typeID = typeID
        this.name = name
    }

    static save(inf, callback){
        db.query('INSERT INTO type_additional(type_additional) VALUE(?)',
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
        db.query('SELECT * FROM type_additional', (err, data)=>{
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
        db.query('UPDATE type_additional SET type_additional = ? WHERE id_type_additional = ?',
        [inf.name, inf.typeID], (err)=>{
            if(err){
                console.log(err)
                callback(err)
            }else{
                callback(null)
            }
        })
    }

    static delete(inf, callback){
        db.query('DELETE FROM type_additional WHERE id_type_additional = ?',
        [inf.typeID], (err)=>{
            if(err){
                callback(err)
            }else{
                callback(null)
            }
        })
    }
}
