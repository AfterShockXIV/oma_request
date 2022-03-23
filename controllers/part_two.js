const nodemailer = require('nodemailer');
const email_pu_one = "aph549@gmail.com"
const email_pu_two = "siracha5781@gmail.com"
const email_pu_three = "treekasem_s@veninecable.com"
const email_pu_four = ""
const server = "http://localhost:3020/run_process_product/"


const part_two = (req, res, next) => {
  let N_officer = req.body.N_officer;
  let dateparttwo = req.body.dateparttwo;
  let S_officer = req.body.S_officer;
  let O_review = req.body.O_review;
  let parttwo_id = req.body.parttwo_id;
  let request_id = req.body.request_id;

  let parttwo_img = "";
  let parttwo_pdf = "";
  if (!req.files) {
    console.log("ไม่มี files");
  } else if (!req.files.parttwo_pdf) {
    //ไม่อัพ pdf
    let uploadedFile = req.files.parttwo_img; //รูปเครื่อง
    parttwo_img = uploadedFile.name;
    let fileExtension = uploadedFile.mimetype.split("/")[1];
    parttwo_img = "parttwo_img" + parttwo_id + request_id + "." + fileExtension;
    if (
      uploadedFile.mimetype === "image/png" ||
      uploadedFile.mimetype === "image/jpeg" ||
      uploadedFile.mimetype === "image/gif"
    ) {
      // upload the file to the /public/assets/img directory
      uploadedFile.mv(`public/assets/file_parttwo/${parttwo_img}`, (err) => {
        if (err) {
        }
      });
    }
  } else if (!req.files.parttwo_img) {
    // ไม่อัพ IMG
    let uploadedFile = req.files.parttwo_pdf; //รูปเครื่อง
    parttwo_pdf = uploadedFile.name;
    let fileExtension = uploadedFile.mimetype.split("/")[1];
    parttwo_pdf = "parttwo_pdf" + parttwo_id + request_id + "." + fileExtension;
    if (uploadedFile.mimetype === "application/pdf") {
      // upload the file to the /public/assets/img directory
      uploadedFile.mv(`public/assets/file_parttwo/${parttwo_pdf}`, (err) => {
        if (err) {
        }
      });
    }
  } else {
    let uploadedFile_pdf = req.files.parttwo_pdf; //รูปเครื่อง
    parttwo_pdf = uploadedFile_pdf.name;
    let fileExtension_pdf = uploadedFile_pdf.mimetype.split("/")[1];
    parttwo_pdf =
      "parttwo_pdf" + parttwo_id + request_id + "." + fileExtension_pdf;
    if (uploadedFile_pdf.mimetype === "application/pdf") {
      // upload the file to the /public/assets/img directory
      uploadedFile_pdf.mv(`public/assets/file_parttwo/${parttwo_pdf}`, (err) => {
        if (err) {
        }
      });
    }

    let uploadedFile = req.files.parttwo_img; //รูปเครื่อง
    parttwo_img = uploadedFile.name;
    let fileExtension = uploadedFile.mimetype.split("/")[1];
    parttwo_img = "parttwo_img" + parttwo_id + request_id + "." + fileExtension;
    if (
      uploadedFile.mimetype === "image/png" ||
      uploadedFile.mimetype === "image/jpeg" ||
      uploadedFile.mimetype === "image/gif"
    ) {
      // upload the file to the /public/assets/img directory
      uploadedFile.mv(`public/assets/file_parttwo/${parttwo_img}`, (err) => {
        if (err) {
        }
      });
    }
  }

  let update_parttwo =
    "UPDATE part_two set N_officer = '" +
    N_officer +
    "' , dateparttwo = '" +
    dateparttwo +
    "' , S_officer = '" +
    S_officer +
    "' ,O_review = '" +
    O_review +
    "'  , parttwo_img = '" +
    parttwo_img +
    "' , parttwo_pdf = '" +
    parttwo_pdf +
    "' where parttwo_id = '" +
    parttwo_id +
    "' ";
  let update_main =
    "UPDATE request_main set status_main = 'parttwo_sig_wait' where request_id = '" +
    request_id +
    "' ";

  db.query(update_main, (err, result) => {
    if (err) {
      console.log(err);
      res.redirect("/");
    }
    db.query(update_parttwo, (err, result) => {
      if (err) {
        console.log(err);
        res.redirect("/");
      }
      db.query(
        "SELECT * FROM request_main inner join part_one on (request_main.partone_id = part_one.partone_id) inner join part_two on (request_main.parttwo_id = part_two.parttwo_id) WHERE request_main.request_id = '" +
          request_id +
          "' ",
        (err, result) => {
          if (err) {
            res.redirect("/");
          }
          // ส่งเมล
          let email_mg = result[0].email_mg;
          
          let header_mail = "Product request" + result[0].name_tp ; 
          let send = "</p>Requestor : " + result[0].name_n + "</p><p>type : "+ result[0].type+"</p><p>Option : "+result[0].option_one+"</p>"+"<p>URL : "+server+result[0].request_id
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'pu.venine2021@gmail.com', // your email
              pass: 'puvenine2021' // your email password
            }
          });

          //=================================mail user==================================================
         let mailOptions_user = {
          from: 'pu.venine2021@gmail.com',                // sender
          to: email_mg,                // list of receivers
          subject: header_mail,              // Mail subject
          html: send   // HTML body
        };
        transporter.sendMail(mailOptions_user, function (err, info) {
          if(err){
            console.log(err)
          }
         });
      // //=================================mail one==================================================
      // let mailOptions = {
      //   from: 'pu.venine2021@gmail.com',                // sender
      //   to: email_pu_one,                // list of receivers
      //   subject: header_mail,              // Mail subject
      //   html: send   // HTML body
      // };
      // transporter.sendMail(mailOptions, function (err, info) {
      //   if(err){
      //     console.log(err)
      //   }
      //  });
           //=================================mail two==================================================
      let mailOptions_two = {
        from: 'pu.venine2021@gmail.com',                // sender
        to: email_pu_two,                // list of receivers
        subject: header_mail,              // Mail subject
        html:send   // HTML body
      };
      transporter.sendMail(mailOptions_two, function (err, info) {
        if(err){
          console.log(err)
        }
      });
         //=================================mail three==================================================
      let mailOptions_three = {
        from: 'pu.venine2021@gmail.com',                // sender
        to: email_pu_three,                // list of receivers
        subject: header_mail,              // Mail subject
        html: send   // HTML body
      };
      transporter.sendMail(mailOptions_three, function (err, info) {
        if(err){
          console.log(err)
        }
      });
     //=================================mail four==================================================

    //  let mailOptions_four = {
    //   from: 'pu.venine2021@gmail.com',                // sender
    //   to: email_pu_four,                // list of receivers
    //   subject: header_mail,              // Mail subject
    //   html: send   // HTML body
    // };
    // transporter.sendMail(mailOptions_four, function (err, info) {
    //   if(err){
    //     console.log(err)
    //   }
    // });
          //===================================================================================
        
          let data_partone = result[0];
          res.render("../views/index_runprocess", {
            data_partone: data_partone,
            class_font: {
              ms: "alert alert-success font_success",
              status_alert: "เพิ่มข้อมูลสำเร็จ",
            },
          });
        }
      );
    });
  });
};
module.exports.part_two = part_two;
