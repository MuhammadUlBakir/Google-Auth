const session = require('express-session');
const storage = require('node-persist');

//----------------------------
const Success = async (req, res, next) => {
    try {
        const Email = await storage.getItem("useremail")
        res.redirect(`http://localhost:5173/priv1/${JSON.parse(Email)}`);
    } catch (error) {
        console.log(error);
    }
};
//----------------------------
const Failure = async (req, res, next) => {
    try {
        res.redirect("http://localhost:5173/signin")
    } catch (error) {
        console.log(error);
    }
}
//----------------------------
const Userdata = async (req, res) => {
    try {
       
    } catch (error) {
        console.log(error);
    }
};
//-------------------------------
const Logout = async (req, res, next) => {
    try {
        req.logout((err) => {
            if (!err) {
                req.session.destroy()
                res.json({ success: true, status: 200 });
            } else {
                console.log(err);
           }
       })
    } catch (error) {
        console.log(error);
    }
};  
//----------------------------------
module.exports = { Success, Failure, Logout, Userdata };
