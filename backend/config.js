require("dotenv").config()

const config = {
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.REDIRECT_URI,
    client_secret: process.env.CLIENT_SECRET,
};

module.exports = config