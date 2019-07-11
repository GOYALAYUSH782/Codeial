const queue= require('../config/kue');

const postMailer = require('../mailers/post_mailer');
 
queue.process('post_email',(job,done)=>{
    console.log('email worker is processing a job',job.data);

    postMailer.newPost(job.data);
})