const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const app = express();
const port = 3020;
const authRoute = require("./routes/auth");

app.set("port", process.env.port || port); // set express to use this port
app.set("views", __dirname + "/views"); // set express to look in this folder to render our view
app.set("view engine", "ejs"); // configure template engine
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, "public"))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload
app.use(express.urlencoded({ extended: false }));

app.use(authRoute);
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "product_request",
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});
global.db = db;

app.get('/auto' , (req,res) => {
  db.query("SELECT * FROM run_zzproject order by run_id DESC",
  (err, result) => {
    if (err) {
      console.log(err);
    }
   let data = result[0]
      let date_y = new Date().getFullYear();
      let date_yy = date_y - 2000;
      let date_m = new Date().getMonth() + 1;
      let date_d = new Date().getDate() +10
      let day = ""
      let number_sql = data.run_number.slice(1);
      let number = +number_sql + 1;
      console.log(number);
      let date_run = 0;
      let date_sql = data.date_zzproject.slice(2, 4);
      let date_current = new Date().getMonth() + 1;
      let DateDiff = date_sql - date_current;
      console.log("วันที่ใน Database : " + +date_sql);
      console.log("วันที่ปัจจุบัน : " + +date_current);
      console.log("หักลบ : " + +DateDiff);
      console.log("===============");
      if (number < 10 && number > 0) {
        if (DateDiff === 0) {
          date_run = "-00" + +number;
        } else {
          date_run = "-001";
        }
      } else if (number >= 10) {
        if (DateDiff === 0) {
          date_run = "-0" + +number;
        } else {
          date_run = "-001";
        }
      }

      if (date_d < 10 && date_d >0 ){
        day = "0"+ +date_d
      }else{
        day = date_d
      }
      console.log("date_d :"+date_d)
      console.log("day :"+day)
      let date_zzproject = date_yy + "" + date_m + "" + day;
      let run_number = date_run;
      let ZZPROJECT = date_zzproject + "" + run_number;
      console.log("date_zzproject : " + date_zzproject);
      console.log("run_number : " + run_number);
      console.log("ZZPROJECT : " + ZZPROJECT);
    })
} )
app.get("/download_pdf_one/:pdf_name", (req, res) => {
  let pdf_name = req.params.pdf_name;
  const file = `./public/assets/file_partone/` + pdf_name;
  res.download(file); // Set disposition and send it.
});

app.get("/download_pdf_two/:pdf_name", (req, res) => {
  let pdf_name = req.params.pdf_name;
  const file = `./public/assets/file_parttwo/` + pdf_name;
  res.download(file); // Set disposition and send it.
});

app.get("/download_pdf_three/:pdf_name", (req, res) => {
  let pdf_name = req.params.pdf_name;
  const file = `./public/assets/file_partthree/` + pdf_name;
  res.download(file); // Set disposition and send it.
});

app.get("/download_pdf_four/:pdf_name", (req, res) => {
  let pdf_name = req.params.pdf_name;
  const file = `./public/assets/file_partfour/` + pdf_name;
  res.download(file); // Set disposition and send it.
});
