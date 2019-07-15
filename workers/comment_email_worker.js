const queue = require('../config/kue');

const commentMailer= require('../mailers/comment_mailer');

queue.process('comment_email',(job,done)=>{
    console.log('email worker is processing a job',job.data);

    //commentMailer.newComment(job.data);
})