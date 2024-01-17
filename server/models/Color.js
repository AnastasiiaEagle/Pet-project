const db = require('../database/conection.js')
const fs = require('fs')


module.exports = class Color{
    constructor(colorID, name, cost, image){
        this.colorID = colorID
        this.name = name
        this.cost = cost
        this.image = image
    }

    static save(inf, callback){
        db.query('INSERT INTO color(name_color, photo_color, cost) VALUES(?,?,?)',
        [inf.name, inf.image, inf.cost], (err)=>{
            if(err){
                callback(err)
            }else{callback(null)}
        })
    }

    static show(callback){
        db.query('SELECT * FROM color', (err, data)=>{
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
        db.query('SELECT * FROM color WHERE id_color = ?',[inf.colorID], (err, data)=>{
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
        let masInf = [], masObj = []
        if(inf.name != undefined){
            masObj.push("name_color = ?")
            masInf.push(inf.name)
        }
        if(inf.cost != undefined){
            masObj.push(" cost = ?")
            masInf.push(inf.cost)
        }
        if(inf.image != undefined){
            masObj.push(" photo_color = ?")
            masInf.push(inf.image)

            db.query('SELECT photo_color FROM color WHERE id_color=?',
            [inf.colorID], (err, data)=>{
                if(err){
                    console.log(err)
                    return callback(err)
                }else{
                    try {
                        fs.unlinkSync(data[0].photo_color)
                    } catch (error) {
                        // console.log(error)
                    }
                }
            })
        }
        masInf.push(inf.colorID)
        db.query(`UPDATE color SET ${masObj} WHERE id_color = ?`,
        masInf, (err)=>{
            if(err){
                console.log(err)
                return callback(err)
            }else{callback(null)}
        })
    }

    static delete(inf, callback){
        db.query('SELECT photo_color FROM color WHERE id_color=?',
        [inf.colorID], (err, data)=>{
            if(err){
                console.log(err)
                return callback(err)
            }else{
                try {
                    fs.unlinkSync(data[0].photo_color)
                } catch (error) {
                    // console.log(error)
                }
            }
            })
        db.query('DELETE FROM color WHERE id_color = ?',
        [inf.colorID], (err)=>{
            if(err){
                console.log(err)
                return callback(err)
            }else{
                callback(null)
            }
        })
    }
}