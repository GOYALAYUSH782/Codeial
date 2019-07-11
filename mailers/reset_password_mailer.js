const nodemailer = require('../config/nodemailer');
// new method to export a method
exports.reset_pass = (Token)=>{
    let htmlString = nodemailer.renderTemplate({Token:Token},'/password_reset/new_password');

    nodemailer.transporter.sendMail({
        from:"goyalayush782@gmail.com",
        to: Token.user,
        subject:"Password Reset",
        html: htmlString,
    },(err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        //console.log('message sent',info);
        return;
    });
}