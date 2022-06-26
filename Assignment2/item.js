let dbparams = {
  host: "localhost",
  user: "root",
  password: "cdac",
  database: "wptass2",
  port: 3306,
};
const mysql = require("mysql2");
const con = mysql.createConnection(dbparams);

const express = require("express");
const app = express();

app.use(express.static("html"));

app.listen(900, function () {
  console.log("server listening at port 900...");
});

app.get("/getAllItems", (req, resp) => {
  con.query("select * from item", [], (error, rows) => {
    console.log(rows);
    resp.send(rows);
    //resp.send(output);
  });
});

app.get("/getItem", (req, resp) => {
  let itemno = req.query.itemno;
  console.log("Input " + itemno);
  let output = {
    status: false,
    itemDetails: { itemno: "", itemname: "", price: "", category: "" },
  };
  con.query(
    "select * from item where itemno=?",
    [itemno],
    (error, rows) => {
      console.log(rows);
      if (error) {
        console.log(error);
      } else if (rows.length > 0) {
        output.status = true;
        output.itemDetails = rows[0];
      }
      console.log(output);
      resp.send(output);
    }
  );
});

app.get("/addItem", (req, resp) => {
  let input = {
    itemno: req.query.itemno,
    itemname: req.query.itemname,
    price: req.query.price,
    category: req.query.category,
  };

  let output = false;
  con.query(
    "Insert into item(itemno,itemname,price,category) values(?,?,?,?)",
    [input.itemno, input.itemname, input.price, input.category],
    (error, rows) => {
      console.log(rows);
      if (error) {
        console.log(error);
      } else if (rows.affectedRows > 0) {
        output = true;
      }
      console.log(output);
      resp.send(output);
    }
  );
});

app.get("/updateItem", (req, resp) => {
  let input = {
    itemno: req.query.itemno,
    itemname: req.query.itemname,
    price: req.query.price,
    category: req.query.category,
  };

  let output = false;
  con.query(
    "Update item set itemname=?,price=?,category=? where itemno = ?",
    [input.itemname, input.price, input.category, input.itemno],
    (error, rows) => {
      console.log(rows);
      if (error) {
        console.log(error);
      } else if (rows.affectedRows > 0) {
        output = true;
      }
      console.log(output);
      resp.send(output);
    }
  );
});

app.get("/deleteItem", (req, resp) => {
  let itemno = req.query.itemno;
  console.log("Input " + itemno);
  let output = false;
  con.query(
    "delete from item where itemno=?;",
    [itemno],
    (error, rows) => {
      console.log(rows);
      if (error) {
        console.log(error);
      } else if (rows.affectedRows > 0) {
        output = true;
      }
      console.log(output);
      resp.send(output);
    }
  );
});
