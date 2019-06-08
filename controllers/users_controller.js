module.exports.profile = (req,res)=>{
    return res.render('users',{
        title:"Users",
    });
}

module.exports.comment=(req,res)=>{
    return res.send('<h1>Comment section</h1>');
}