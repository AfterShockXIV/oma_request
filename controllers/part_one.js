const nodemailer = require('nodemailer');
const email_pu_one = "aph549@gmail.com"
const email_pu_two = "siracha5781@gmail.com"
const email_pu_three = "treekasem_s@veninecable.com"
const email_pu_four = ""
const server = "http://localhost:3020/run_process_product/"

const part_one = (req, res, next) => {
  let email_mg = req.body.email_mg
  let name_tp = req.body.name_tp;
  let name_n = req.body.name_n;
  let surname_s = req.body.surname_s;
  let d_department = req.body.d_department;
  let datepartone =  req.body.datepartone;
  let type = req.body.type;
  let option_one = req.body.option_one;
  let Requirements = req.body.Requirements;
  // let comment = req.body.comment;
  // let status = req.body.status;
  // let sigpart1 = req.body.sig_staff_takeout

  let target_day = ""
  if(option_one === 'New'){
    target_day = 5
  }else if(option_one === 'Existing'){
    target_day = 3
  }

  let status_main = "partone_sig_wait" ; 
  let partone_img = "";  
  let partone_pdf = "";
  if(!req.files){
  console.log("ไม่มี files")
 
  }else if (!req.files.partone_pdf){ //ไม่อัพ pdf 
    let uploadedFile = req.files.partone_img; 
    partone_img = uploadedFile.name;
    let fileExtension = uploadedFile.mimetype.split('/')[1];
    partone_img = 'partone_img'+name_tp+Requirements+ datepartone +'.' + fileExtension; 
    if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif'|| uploadedFile.mimetype === 'application/pdf') {
        // upload the file to the /public/assets/img directory
        uploadedFile.mv(`public/assets/file_partone/${partone_img}`, (err) => {
            if (err) {
  
            }
        });
    }

  }else if (!req.files.partone_img){ // ไม่อัพ IMG
    let uploadedFile = req.files.partone_pdf; 
    partone_pdf = uploadedFile.name;
    let fileExtension = uploadedFile.mimetype.split('/')[1];
    partone_pdf = 'partone_pdf'+name_tp+type+Requirements+datepartone + '.' + fileExtension; 
    if ( uploadedFile.mimetype === 'application/pdf') {
        // upload the file to the /public/assets/img directory
        uploadedFile.mv(`public/assets/file_partone/${partone_pdf}`, (err) => {
            if (err) {
  
            }
        });
    }

  }else{
    let uploadedFile_pdf = req.files.partone_pdf; 
    partone_pdf = uploadedFile_pdf.name;
    let fileExtension_pdf = uploadedFile_pdf.mimetype.split('/')[1];
    partone_pdf = 'partone_pdf'+name_tp+type+Requirements+datepartone + '.' + fileExtension_pdf; 
    if ( uploadedFile_pdf.mimetype === 'application/pdf') {
        // upload the file to the /public/assets/img directory
        uploadedFile_pdf.mv(`public/assets/file_partone/${partone_pdf}`, (err) => {
            if (err) {
  
            }
        });
    }

    let uploadedFile = req.files.partone_img; 
    partone_img = uploadedFile.name;
    let fileExtension = uploadedFile.mimetype.split('/')[1];
    partone_img = 'partone_img'+name_tp+Requirements+ datepartone +'.' + fileExtension; 
    if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif'|| uploadedFile.mimetype === 'application/pdf') {
        // upload the file to the /public/assets/img directory
        uploadedFile.mv(`public/assets/file_partone/${partone_img}`, (err) => {
            if (err) {
  
            }
        });
    }
  }


  let insert_part_one = "insert into part_one (email_mg,name_n,surname_s,d_department,type,option_one,Requirements,partone_img,partone_pdf,datepartone,target_day) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
  let array_part_one =[email_mg,name_n,surname_s,d_department,type,option_one,Requirements,partone_img,partone_pdf,datepartone,target_day]
  let insert_part_two = "insert into part_two (N_officer) VALUES('wait')";
  let insert_part_three = "insert into part_three (o_confirmed) VALUES('wait')";
  let insert_part_four = "insert into part_four (Person) VALUES('wait')";
 


  db.query(insert_part_four, (err, result) => {
    if (err) { 
      console.log(err);
      res.redirect("/");
    }
    let partfour_id = result.insertId ; 
  db.query(insert_part_three, (err, result) => {
    if (err) { 
      console.log(err);
      res.redirect("/");
    }
    let partthree_id = result.insertId ; 
  db.query(insert_part_two, (err, result) => {
    if (err) { 
      console.log(err);
      res.redirect("/");
    }
    let parttwo_id = result.insertId ; 
  db.query(insert_part_one,array_part_one, (err, result) => {
    if (err) { 
      console.log(err);
      res.redirect("/");
    }
    let partone_id = result.insertId ; 
    let insert_main = "insert into request_main (partone_id,parttwo_id,partthree_id,partfour_id,status_main,name_tp,ZZPROJECT,date_start) VALUES (?,?,?,?,?,?,'wait',NOW())"
    let array_main = [partone_id,parttwo_id,partthree_id,partfour_id,status_main,name_tp]

  db.query(insert_main,array_main , (err, result) => {
    if (err) { 
      console.log(err);
      res.redirect("/");
      }

      let request_id = result.insertId ; 
      let header_mail = "Product request" + name_tp ; 
      let send = "</p>Requestor : " + name_n + "</p><p>type : "+type+"</p><p>Option : "+option_one+"</p>"+"<p>URL : http://localhost:3020/run_process_product/"+request_id
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

      res.redirect("/report");
})
});
});
});
});


};
module.exports.part_one = part_one;

const part_one_sig = (req, res, next) => {
  
}
module.exports.part_one_sig = part_one_sig;

