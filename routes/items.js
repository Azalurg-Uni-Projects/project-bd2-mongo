const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../config/db");
const ObjectId = require("mongodb").ObjectId;

const db = "lab07"
const collection = "items"


//127.0.0.1:3000/items?filter={"unit":"t"}&sort={"price":-1}

recordRoutes.route("/").get(function(req, res) {
    let db_connect = dbo.getDb(db);
    let query = req.query;
    let sort = {};
    let filter = {};

    if (query.hasOwnProperty("sort")) {
        sort = JSON.parse(query.sort);
    }

    if (query.hasOwnProperty("filter")) {
        filter = JSON.parse(query.filter);
    }

    db_connect.collection(collection).find(filter).sort(sort).toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});

// generate rapport 

recordRoutes.route("/rapport").get(function(req, res) {
    let db_connect = dbo.getDb(db);
    db_connect.collection(collection).aggregate([
        {
            $project: {
                _id: 0,
                name: 1,
                price: 1,
                amount: 1,
                value: { $multiply: ["$price", "$amount"] }
            }
        },
        {
            $group: {
                _id: null,
                total_value: { $sum: "$value" },
                items: { $push: "$$ROOT" }
            }
        },
        {
            $project: {
                _id: 0,
                total_value: 1,
                items: 1
            }
        },
        {
            $sort: { "items.value": -1 }
        }
    ]).toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});

recordRoutes.route("/:id").get(function(req, res) {
    let db_connect = dbo.getDb(db);
    let query = {_id: ObjectId(req.params.id)};
    db_connect.collection(collection).findOne(query, function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});

recordRoutes.route("/").post(function(req, response){
    let db_connect = dbo.getDb(db);
    let item = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        amount: req.body.amount,
        unit: req.body.unit
    };
    db_connect.collection(collection).insertOne(item, function(err, res){
        if (err) throw err;
        response.json(res);
    });
});

recordRoutes.route("/:id").put(function(req, response){
    let db_connect = dbo.getDb(db);
    let query = {_id: ObjectId(req.params.id)};
    let newValues = {
        $set: {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            amount: req.body.amount,
            unit: req.body.unit
        },
    };
    db_connect.collection(collection).updateOne(query, newValues, function(err, res){
        if (err) throw err;
        console.log("1 document updated successfully");
        response.json(res);
    });
});

recordRoutes.route("/:id").delete(function (req, res) {
    let db_connect = dbo.getDb(db);
    let query = {_id: ObjectId(req.params.id)};
    db_connect.collection(collection).deleteOne(query, function(err, obj){
        if (err) throw err;
        console.log("1 document deleted");
        res.json(obj);
    });
})




module.exports = recordRoutes;