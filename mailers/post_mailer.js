const modemailer = require('../config/nodemailer');
// new method to export a method
exports.newPost = (post)=>{
    let htmlString = modemailer.renderTemplate({post:post},'/posts/new_post.ejs');

    modemailer.transporter.sendMail({
        from:"goyalayush782@gmail.com",
        to: post.user.email,
        subject:"New Post Published!",
        html: htmlString
    },(err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        //console.log('message sent',info);
        return;
    });
}