const nodemailer = require('nodemailer');

const action_mail = (req, res, next) => {
// config สำหรับของ outlook
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pu.venine2021@gmail.com', // your email
      pass: 'puvenine2021' // your email password
    }
  });

  let mailOptions = {
    from: 'pu.venine2021@gmail.com',                // sender
    to: 'aph549@gmail.com',                // list of receivers
    subject: 'Product request',              // Mail subject
    html: '<b>Do you receive this mail?</b>'   // HTML body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
   });
  

  let mailOptions_two = {
    from: 'pu.venine2021@gmail.com',                // sender
    to: 'siracha5781@gmail.com',                // list of receivers
    subject: 'Product request',              // Mail subject
    html: '<b>Do you receive this mail?</b>'   // HTML body
  };
  transporter.sendMail(mailOptions_two, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
  });

  
  let mailOptions_three = {
    from: 'pu.venine2021@gmail.com',                // sender
    to: 'treekasem_s@veninecable.com',                // list of receivers
    subject: 'Product request',              // Mail subject
    html: '<b>Do you receive this mail?</b>'   // HTML body
  };
  transporter.sendMail(mailOptions_three, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
  });
}
module.exports = action_mail;
