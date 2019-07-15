const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'goyalayush782@gmail.com',
            pass: '9569492211'
        }
    },
    goggle_client_id:"172591078325-3piv8fh1ioddser1fh2v5ff6iuek3oet.apps.googleusercontent.com",
    goggle_clientSecret:"k8qKHaG5vIS1V_t9DCkUnn1N",
    google_callbackURL:"http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'secret',
    
}
const production = {
    name: 'production',
}
module.exports = development;