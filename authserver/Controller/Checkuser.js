const Userschema = require("../db/UserSchema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CheckUser = async (req, res, next) => {
    try {
        const { userid } = req.body;
        if (userid) {
            const CompaireId = await Userschema.findOne({ _id: userid });
            res.json({ userdata: CompaireId });
        }
    } catch (error) {
        console.log(error);
    }
};
const Adduser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body.data;
        const AlreadyUser = await Userschema.findOne({ email: email });
        if (AlreadyUser) {
            res.json({ success: false, status: 401 });
        } else {
            const HashedPass = await bcrypt.hash(password, 12);
            if (HashedPass) {
                const Add = new Userschema({
                    username: username,
                    email: email,
                    password: HashedPass
                });
                const adduser = await Add.save();
                if (adduser) {
                    res.json({ success: true, status: 201, userid: adduser._id });
                }
            }
        }
      
    } catch (error) {
        console.log(error);
    }
}
//-----------------------
const Signin = async (req , res , next) => {
    try {
        const { email, pass } = req.body;
        const Verifyemail = await Userschema.findOne({ email: email });
        if (Verifyemail) {
            const Decode = await bcrypt.compare(pass, Verifyemail.password);
            if (Decode == true) {
                const token = jwt.sign({ id: Verifyemail._id }, process.env.Seckey);
                if (token) {
                    res.json({ success: true, status: 200, token });
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports = {CheckUser , Adduser , Signin};