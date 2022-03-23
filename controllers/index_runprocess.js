
const nodemailer = require('nodemailer');
const email_pu_one = "aph549@gmail.com"
const email_pu_two = "siracha5781@gmail.com"
const email_pu_three = "treekasem_s@veninecable.com"
const email_pu_four = ""
const server = "http://localhost:3020/run_process_product/"

const index_runprocess = (req, res, next) => {
    let request_id = req.params.request_id
    db.query("SELECT * FROM request_main inner join part_one on (request_main.partone_id = part_one.partone_id) inner join part_two on (request_main.parttwo_id = part_two.parttwo_id)    inner join part_three on (request_main.partthree_id = part_three.partthree_id) inner join part_four on (request_main.partfour_id = part_four.partfour_id)  WHERE request_main.request_id = '"+request_id+"' ", (err, result) => {
        if (err) {
            res.redirect('/');
        }

        let data_partone = result[0];
        res.render("../views/index_runprocess", {
            data_partone: data_partone,
            class_font: {
                ms: "",
                status_alert: ""
            }
        })
    });
}
module.exports.index_runprocess = index_runprocess;

const post_sig_partone = (req, res, next) => {
    let partone_id = req.body.partone_id ; 
    let status = req.body.status ; 
    let sig_partone = req.body.sig_partone ; 
    let request_id = req.body.request_id ; 
    let comment = req.body.comment ; 
    let update  = "UPDATE part_one set sig_date = NOW() ,  status = '"+status+"' , comment = '"+comment+"' , sigpart1 = '"+sig_partone+"' where partone_id = '"+partone_id+"' "
    let update_main  = "UPDATE request_main set status_main = 'partone_sig_success' where request_id = '"+request_id+"' " ; 

    db.query(update_main , (err, result) => {
        if (err) {
            res.redirect('/');
        }
    db.query(update, (err, result) => {
        if (err) {
            res.redirect('/');
        }
        db.query("SELECT * FROM request_main inner join part_one on (request_main.partone_id = part_one.partone_id) inner join part_two on (request_main.parttwo_id = part_two.parttwo_id)    inner join part_three on (request_main.partthree_id = part_three.partthree_id) inner join part_four on (request_main.partfour_id = part_four.partfour_id)  WHERE request_main.request_id = '"+request_id+"' ", (err, result) => {
            if (err) {
                res.redirect('/');
            }

            //===========================================

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

      //=============================

            let data_partone = result[0];
            res.render("../views/index_runprocess", {
                data_partone: data_partone , 
                class_font: {
                    ms:  "alert alert-success font_success",
                    status_alert: "เพิ่มข้อมูลสำเร็จ"
                }
            })
        });
    });
});
}
module.exports.post_sig_partone = post_sig_partone;


const post_sig_parttwo = (req, res, next) => {
    let parttwo_id = req.body.parttwo_id ; 
    let status_two = req.body.status ; 
    let sigpart2 = req.body.sigpart2 ; 
    let request_id = req.body.request_id ; 
    let comment_two = req.body.comment ; 
    let update  = "UPDATE part_two set  sig_date = NOW() , status2 = '"+status_two+"' , comment_two = '"+comment_two+"' , sigpart2 = '"+sigpart2+"' where parttwo_id = '"+parttwo_id+"' "
    let update_main  = "UPDATE request_main set status_main = 'parttwo_sig_success' where request_id = '"+request_id+"' " ; 

    db.query(update_main , (err, result) => {
        if (err) {
            res.redirect('/');
        }
    db.query(update, (err, result) => {
        if (err) {
            res.redirect('/');
        }
        db.query("SELECT * FROM request_main inner join part_one on (request_main.partone_id = part_one.partone_id) inner join part_two on (request_main.parttwo_id = part_two.parttwo_id)    inner join part_three on (request_main.partthree_id = part_three.partthree_id) inner join part_four on (request_main.partfour_id = part_four.partfour_id)  WHERE request_main.request_id = '"+request_id+"' ", (err, result) => {
            if (err) {
                res.redirect('/');
            }


            //===========================================

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

      //=============================
            let data_partone = result[0];
            res.render("../views/index_runprocess", {
                data_partone: data_partone , 
                class_font: {
                    ms:  "alert alert-success font_success",
                    status_alert: "เพิ่มข้อมูลสำเร็จ"
                }
            })
        });
    });
});
}
module.exports.post_sig_parttwo = post_sig_parttwo;


const post_sig_partthree = (req, res, next) => {
    let partthree_id = req.body.partthree_id ; 
    let status3 = req.body.status ; 
    let sigpart3 = req.body.sigpart3 ; 
    let request_id = req.body.request_id ; 
    let comment_three = req.body.comment ; 

    let update  = "UPDATE part_three set sig_date = NOW() , status3 = '"+status3+"' , comment_three = '"+comment_three+"' , sigpart3 = '"+sigpart3+"' where partthree_id = '"+partthree_id+"' "
    let update_main  = "UPDATE request_main set status_main = 'partthree_sig_success' where request_id = '"+request_id+"' " ; 

    db.query(update_main , (err, result) => {
        if (err) {
            res.redirect('/');
        }
    db.query(update, (err, result) => {
        if (err) {
            res.redirect('/');
        }
        db.query("SELECT * FROM request_main inner join part_one on (request_main.partone_id = part_one.partone_id) inner join part_two on (request_main.parttwo_id = part_two.parttwo_id)    inner join part_three on (request_main.partthree_id = part_three.partthree_id) inner join part_four on (request_main.partfour_id = part_four.partfour_id)  WHERE request_main.request_id = '"+request_id+"' ", (err, result) => {
            if (err) {
                res.redirect('/');
            }

             //===========================================

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
 
       //=============================

            
            let data_partone = result[0];
            res.render("../views/index_runprocess", {
                data_partone: data_partone , 
                class_font: {
                    ms:  "alert alert-success font_success",
                    status_alert: "เพิ่มข้อมูลสำเร็จ"
                }
            })
        });
    });
});
}
module.exports.post_sig_partthree = post_sig_partthree;


const post_sig_partfour_mg = (req, res, next) => {
    
    let partfour_id = req.body.partfour_id ; 
    let request_id = req.body.request_id ; 
    let status_mg = req.body.status_r ; 
    let sig_four_mg = req.body.sig_four_mg ; 
    let comment_mg = req.body.comment_mg ; 
    
    console.log(comment_mg)
    let update  = "UPDATE part_four set status_all_sig = 'mg_sig_success' ,  sig_date_mg = NOW() , status_mg = '"+status_mg+"' , sigpart_mg = '"+sig_four_mg+"' ,comment_four = '"+comment_mg+"' where partfour_id = '"+partfour_id+"' "
    // let update_main  = "UPDATE request_main set status_main = 'partthree_sig_success' where request_id = '"+request_id+"' " ; 
    // db.query(update_main , (err, result) => {
    //     if (err) {
    //         res.redirect('/');
    //     }
    db.query(update, (err, result) => {
        if (err) {
            console.log(err)
        }
        db.query("SELECT * FROM request_main inner join part_one on (request_main.partone_id = part_one.partone_id) inner join part_two on (request_main.parttwo_id = part_two.parttwo_id)    inner join part_three on (request_main.partthree_id = part_three.partthree_id) inner join part_four on (request_main.partfour_id = part_four.partfour_id)  WHERE request_main.request_id = '"+request_id+"' ", (err, result) => {
            if (err) {
                res.redirect('/');
            }

                //===========================================

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
    
          //=============================
            let data_partone = result[0];
            res.render("../views/index_runprocess", {
                data_partone: data_partone , 
                class_font: {
                    ms:  "alert alert-success font_success",
                    status_alert: "เพิ่มข้อมูลสำเร็จ"
                }
            })
        });
    // });
});
}
module.exports.post_sig_partfour_mg = post_sig_partfour_mg;

const post_sig_partfour_pu = (req, res, next) => {
    
    let partfour_id = req.body.partfour_id ; 
    let request_id = req.body.request_id ; 
    let status_pu = req.body.status_m ; 
    let sig_four_pu = req.body.sig_four_pu ; 
   

    let update  = "UPDATE part_four set status_all_sig = 'pu_sig_success' ,  sig_date_mg = NOW() , status_pu  = '"+status_pu+"' , sigpart_pu = '"+sig_four_pu+"' where partfour_id = '"+partfour_id+"' "
    // let update_main  = "UPDATE request_main set status_main = 'partthree_sig_success' where request_id = '"+request_id+"' " ; 
    // db.query(update_main , (err, result) => {
    //     if (err) {
    //         res.redirect('/');
    //     }
    db.query(update, (err, result) => {
        if (err) {
            console.log(err)
        }
        db.query("SELECT * FROM request_main inner join part_one on (request_main.partone_id = part_one.partone_id) inner join part_two on (request_main.parttwo_id = part_two.parttwo_id)    inner join part_three on (request_main.partthree_id = part_three.partthree_id) inner join part_four on (request_main.partfour_id = part_four.partfour_id)  WHERE request_main.request_id = '"+request_id+"' ", (err, result) => {
            if (err) {
                res.redirect('/');
            }
                  //===========================================

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
 
       //=============================
            let data_partone = result[0];
            res.render("../views/index_runprocess", {
                data_partone: data_partone , 
                class_font: {
                    ms:  "alert alert-success font_success",
                    status_alert: "เพิ่มข้อมูลสำเร็จ"
                }
            })
        });
    // });
});
}
module.exports.post_sig_partfour_pu = post_sig_partfour_pu;


const post_sig_partfour_dr = (req, res, next) => {
    
    let partfour_id = req.body.partfour_id ; 
    let request_id = req.body.request_id ; 
    let status_dr = req.body.status_dr ; 
    let sig_four_dr = req.body.sig_four_dr ; 
   
    db.query("SELECT * FROM run_zzproject order by run_id DESC",
      (err, result) => {
        if (err) {
          console.log(err);
        }
       let data = result[0]
          let date_y = new Date().getFullYear();
          let date_yy = date_y - 2000;
          let date_m = new Date().getMonth() + 1;
          let date_d = new Date().getDate();
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

          let date_zzproject = date_yy + "" + date_m + "" + day;
          let run_number = date_run;
          let ZZPROJECT = date_zzproject + "" + run_number;
          console.log("date_zzproject : " + date_zzproject);
          console.log("run_number : " + run_number);
          console.log("ZZPROJECT : " + ZZPROJECT);

          let update  = "UPDATE request_main set date_end = NOW() , ZZPROJECT = '"+ZZPROJECT+"'  where request_id = '"+request_id+"'" ; 
          db.query(update,(err, result) => {
              if (err) {
                console.log(err);
              }
          });
          
          let insert_runzzproject =  "insert into run_zzproject (date_zzproject,run_number,ZZPROJECT) VALUES(?,?,?)";
          let array_zzproject = [date_zzproject,run_number,ZZPROJECT]
          db.query(insert_runzzproject,array_zzproject ,(err, result) => {
            if (err) {
              console.log(err);
            }
        });
      }
    );
    //END RUN NUMBER =======================================================



    let update  = "UPDATE part_four set status_all_sig = 'dr_sig_success' ,  sig_date_dr = NOW() , status_dr  = '"+status_dr+"' , sigpart_dr = '"+sig_four_dr+"' where partfour_id = '"+partfour_id+"' "
    // let update_main  = "UPDATE request_main set status_main = 'partthree_sig_success' where request_id = '"+request_id+"' " ; 
    // db.query(update_main , (err, result) => {
    //     if (err) {
    //         res.redirect('/');
    //     }
    db.query(update, (err, result) => {
        if (err) {
            console.log(err)
        }
        db.query("SELECT * FROM request_main inner join part_one on (request_main.partone_id = part_one.partone_id) inner join part_two on (request_main.parttwo_id = part_two.parttwo_id)    inner join part_three on (request_main.partthree_id = part_three.partthree_id) inner join part_four on (request_main.partfour_id = part_four.partfour_id)  WHERE request_main.request_id = '"+request_id+"' ", (err, result) => {
            if (err) {
                res.redirect('/');
            }

                //===========================================

                let email_mg = result[0].email_mg;
                let header_mail = "Product request" + result[0].name_tp ; 
                let send = "</p>Requestor : " + result[0].name_n + "</p><p>type : "+ result[0].type+"</p><p>Option : "+result[0].option_one+"</p>"+"<p>URL : "+server+result[0].request_id+"</p>"+"<p>Project Number : "+result[0].ZZPROJECT+"</p>"
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
    
          //=============================
            let data_partone = result[0];
            res.render("../views/index_runprocess", {
                data_partone: data_partone , 
                class_font: {
                    ms:  "alert alert-success font_success",
                    status_alert: "เพิ่มข้อมูลสำเร็จ"
                }
            })
        });
    // });
});
}
module.exports.post_sig_partfour_dr = post_sig_partfour_dr;