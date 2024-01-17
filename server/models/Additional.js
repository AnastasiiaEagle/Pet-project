const db = require('../database/conection.js')
const fs = require('fs')


module.exports = class Color{
    constructor(additionalID, type_additionalID, name, image, cost, presence){
        this.additionalID = additionalID
        this.type_additionalID = type_additionalID
        this.name = name
        this.image = image
        this.cost = cost
        this.presence = presence
    }

    static save(inf, callback){
        db.query('INSERT INTO additional(id_type_additional, name_additional, photo_additional, cost, presence) VALUES(?,?,?,?,?)',
        [inf.type_additionalID, inf.name, inf.image, inf.cost, inf.presence], (err)=>{
            if(err){
                callback(err)
            }else{callback(null)}
        })
    }

    static show(callback){
        db.query('SELECT * FROM additional JOIN type_additional USING(id_type_additional)', (err, data)=>{
            if(err){
                callback(err, null)
            }else if(data.length == 0){
                return callback(null, 'null')
            }else{
                callback(null, data)
            }
        })
    }

    static showID(inf, callback){
        db.query('SELECT * FROM additional JOIN type_additional USING(id_type_additional) WHERE id_type_additional = ?',
        [inf.additionalID], (err, data)=>{
            if(err){
                callback(err, null)
            }else if(data.length == 0){
                return callback(null, "null")
            }else{
                callback(null, data)
            }
        })
    }

    static update(inf, callback){
        let masInf = [], masObj = []
        if(inf.type_additionalID != undefined){
            masObj.push("id_type_additional = ?")
            masInf.push(inf.type_additionalID)
        }
        if(inf.name != undefined){
            masObj.push(" name_additional = ?")
            masInf.push(inf.name)
        }
        if(inf.cost != undefined){
            masObj.push(" cost = ?")
            masInf.push(inf.cost)
        }
        if(inf.image != undefined){
            masObj.push(" photo_additional = ?")
            masInf.push(inf.image)
            db.query('SELECT photo_additional FROM additional WHERE id_additional=?',
            [inf.additionalID], (err, data)=>{
                if(err){
                    console.log(err)
                    return callback(err)
                }else{
                    try {
                        fs.unlinkSync(data[0].photo_additional)
                    } catch (error) {
                        // console.log(error)
                    }
                }
            })
        }
        masInf.push(inf.additionalID)
        db.query(`UPDATE additional SET ${masObj} WHERE id_additional = ?`,
        masInf, (err)=>{
            if(err){
                console.log(err)
                return callback(err)
            }else{callback(null)}
        })
    }

    static delete(inf, callback){
        db.query('SELECT photo_additional FROM additional WHERE id_additional=?',
        [inf.additionalID], (err, data)=>{
            if(err){
                console.log(err)
                return callback(err)
            }else{
                try {
                    fs.unlinkSync(data[0].photo_additional)
                } catch (error) {
                    // console.log(error)
                }
            }
            })
        db.query('DELETE FROM additional WHERE id_additional = ?',
        [inf.additionalID], (err)=>{
            if(err){
                console.log(err)
                return callback(err)
            }else{
                callback(null)
            }
        })
    }
}