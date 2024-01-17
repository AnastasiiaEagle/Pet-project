const db = require('../database/conection.js')
const fs = require('fs')


module.exports = class Wood{
    constructor(woodID, name, cost, image){
        this.woodID = woodID
        this.name = name
        this.cost = cost
        this.image = image
    }

    static save(inf, callback){
        db.query('INSERT INTO wood(name_wood, photo_wood, cost) VALUES(?,?,?)',
        [inf.name, inf.image, inf.cost], (err)=>{
            if(err){
                console.log(err)
                callback(err)
            }else{callback(null)}
        })
    }

    static show(callback){
        db.query('SELECT * FROM wood', (err, data)=>{
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
        db.query('SELECT * FROM wood WHERE id_wood = ?',[inf.woodID], (err, data)=>{
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
            masObj.push("name_wood = ?")
            masInf.push(inf.name)
        }
        if(inf.cost != undefined){
            masObj.push(" cost = ?")
            masInf.push(inf.cost)
        }
        if(inf.image != undefined){
            masObj.push(" photo_wood = ?")
            masInf.push(inf.image)

            db.query('SELECT photo_wood FROM wood WHERE id_wood=?',
            [inf.woodID], (err, data)=>{
                if(err){
                    console.log(err)
                    return callback(err)
                }else{
                    try {
                        fs.unlinkSync(data[0].photo_wood)
                    } catch (error) {
                        // console.log(error)
                    }
                }
            })
        }
        masInf.push(inf.woodID)
        db.query(`UPDATE wood SET ${masObj} WHERE id_wood = ?`,
        masInf, (err)=>{
            if(err){
                console.log(err)
                return callback(err)
            }else{callback(null)}
        })
    }

    static delete(inf, callback){
        db.query('SELECT photo_wood FROM wood WHERE id_wood=?',
        [inf.woodID], (err, data)=>{
            if(err){
                return callback(err, null)
            }else{
                try {
                    fs.unlinkSync(data[0].photo_wood)
                } catch (error) {
                    console.log(error)
                }
            }
            })
        db.query('DELETE FROM wood WHERE id_wood = ?',
        [inf.woodID], (err)=>{
            if(err){
                callback(err)
            }else{
                callback(null)
            }
        })
    }

}