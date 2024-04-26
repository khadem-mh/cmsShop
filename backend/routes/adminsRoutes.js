const express = require("express");
const SabzLearnShopDB = require("./../db/SabzLearnShop");

const adminsRouter = express.Router();

// routes

adminsRouter.get("/getAdmins", (req, res) => {
  let selectMainAdminQuery = `SELECT * FROM Admins WHERE isMainAdmin = 0`;

  SabzLearnShopDB.query(selectMainAdminQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});


adminsRouter.get("/", (req, res) => {
  let adminPass = req.headers.adminpassword;
  let adminName = req.headers.adminname;
  let selectMainAdminQuery = `SELECT * FROM Admins WHERE username = "${adminName}" AND password = "${adminPass}"`;

  SabzLearnShopDB.query(selectMainAdminQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

adminsRouter.post("/", (req, res) => {
  let body = req.body;
  let addNewAdminQuery = `INSERT INTO Admins VALUES (NULL, "${body.firstname}", "${body.lastname}", "${body.username}", "${body.password}", "${body.task}", "${body.img}", ${false})`;

  SabzLearnShopDB.query(addNewAdminQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

adminsRouter.put("/:adminID", (req, res) => {
  let body = req.body;
  let adminID = req.params.adminID;

  let updateAdminQuery = `UPDATE Admins SET firstname = "${body.firstname}", lastname = "${body.lastname}", username = "${body.username}", password = "${body.password}", task = "${body.task}", img = "${body.img}" WHERE id = ${adminID}`;
  
  SabzLearnShopDB.query(updateAdminQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

adminsRouter.delete("/:adminID", (req, res) => {
  let adminID = req.params.adminID;

  let deleteAdminQuery = `DELETE FROM Admins WHERE id = ${adminID}`;

  SabzLearnShopDB.query(deleteAdminQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

module.exports = adminsRouter;
