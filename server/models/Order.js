const db = require('../database/conection')

module.exports = class Order{
    constructor(ID, name, phone, email, address, orders){
        this.ID=ID
        this.name=name
        this.phone=phone
        this.email=email
        this.address=address
        this.orders=orders
    }

    static save(inf, callback){
        let data = new Date()
        var yyyy = data.getFullYear();
        var mm = data.getMonth()+1;
        var dd = data.getDate();
        const dateNow = yyyy+"-"+mm+"-"+dd
        db.query("INSERT INTO customer(name_customer, phone_customer, email_customer, address_customer, data, status_customer) VALUES(?,?,?,?,?,'Нове замовлення')",
        [inf.name, inf.phone, inf.email, inf.address, dateNow], (err)=>{
            if(err){console.log(err)
                callback(err)}
        })
        db.query("SELECT LAST_INSERT_ID() INTO @customerID;")
        for(let i=0; i<inf.orders.length; i++){
            let order = inf.orders[i]
            db.query("INSERT INTO orders(id_customer, id_product, id_wood, id_color, id_additional, number, cost_order, status_order) VALUES(@customerID,?,?,?,?,?,?,'Чекає схвалення')",
            [order.id_product, order.id_wood, order.id_color, order.id_additional, order.number, order.cost], (err)=>{
                if(err){console.log(err)
                    callback(err)}
            })
            if(inf.orders.length-1==i){
                callback(null)
            }
        }
    }

    static show(callback){
        db.query("SELECT id_customer, name_customer, phone_customer, email_customer, data, address_customer, status_customer, COUNT(id_customer) as `col` FROM customer JOIN orders USING(id_customer) GROUP BY id_customer",
        (err, data)=>{
            if(err){callback(err, null)}
            else if(data.length==0){callback(null, "null")}
            else{callback(null, data)}
        })
    }

    static showID(inf, callback){
        let orders = []
        db.query("SELECT *, COUNT(id_customer) as `col` FROM customer JOIN orders USING(id_customer) WHERE id_customer=? GROUP BY id_customer",
        [inf.ID], (err, data)=>{
            if(err){callback(err)}
            else if(data.length==0){return callback(null, "null")}
            else{orders.push(data)}
        })
        db.query("SELECT id_order, id_product_inf, discount, id_product, size, model, number, cost_order, id_color, name_color, id_wood, name_wood, id_additional, name_additional FROM orders JOIN product USING(id_product) JOIN product_inf USING(id_product_inf) JOIN model USING(id_model) JOIN color USING(id_color) JOIN wood USING(id_wood) JOIN additional USING(id_additional) WHERE id_customer=?;",
        [inf.ID], (err, data)=>{
            if(err){callback(err)}
            else{
                orders.push(data)
                callback(null, orders)
            }
        })
    }

    static showOrderID(inf, callback){
        db.query("SELECT * FROM orders WHERE id_order=?",
        [inf.ID], (err, data)=>{
            if(err){callback(err, null)}
            else{
                callback(null, data)
            }
        })
    } 

    static update(inf, callback){
        db.query(`UPDATE orders SET id_product=?, id_wood=?, id_color=?, id_additional=?, number=?, cost_order=? WHERE id_order=?`,
        [inf.orders.product, inf.orders.wood, inf.orders.color, inf.orders.additional, inf.orders.number, inf.orders.cost, inf.ID], (err)=>{
            if(err){
                console.log(err)
                callback(err)
            }else{callback(null)}
        })
    }

    static updateStatusCustomer(inf, callback){
        db.query("UPDATE customer SET status_customer=? WHERE id_customer=?",
        [inf.name, inf.ID], (err)=>{
            if(err){
                console.log(err)
                callback(err)}
            else{callback(null)}
        })
    }

    static deleteOrder(inf, callback){
        db.query("DELETE FROM orders WHERE id_order=?", [inf.ID],
        (err)=>{
            if(err){console.log(err)
                callback(err)}
            else{callback(null)}
        })
    }

    static deleteCustomer(inf, callback){
        db.query("DELETE FROM orders WHERE id_customer=?",
        [inf.ID], (err)=>{
            if(err){console.log(err)
                callback(err)}
        })
        db.query("DELETE FROM customer WHERE id_customer=?",
        [inf.ID], (err)=>{
            if(err){console.log(err)
                callback(err)}
            else{callback(null)}
        })
    }
}
