const Userschema = require("../db/UserSchema");
const bcrypt = require('bcrypt');
const CreatePass = async (req, res, next) => {
    try {
        const { pass, token } = req.body;
        const HashedPass = await bcrypt.hash(pass, 12);
        if (HashedPass) {
            const FindUser = await Userschema.findOneAndUpdate({ token: token }, { $set: { password: HashedPass } }, { new: true });
            if (FindUser) {
                res.json({ success: true, status: 200 , FindUser });
            }
        } else {
            res.json({ success: false, status: 401 });
        }
       
      
    } catch (error) {
        console.log(error);
    }
};
const Authuser = async (req, res, next) => {
    try {
        const { pass, token , email } = req.body;
        if (pass && email) {
            const FindPass = await Userschema.findOne({ email: email });
            if (FindPass) {
                const Decode = await bcrypt.compare(pass, FindPass.password);
                if (Decode === true) {
                    res.json({ success: true, status: 200 });
                } else {
                    res.json({ success: false, status: 401 });
    
                }
            }
        } else if (pass && token && email) {
            const FindPass2 = await Userschema.findOne({ token: token , email : email});
            if (FindPass2) {
                const Decode2 = await bcrypt.compare(pass, FindPass2.password);
                if (Decode2 === true) {
                    res.json({ success: true, status: 200 });
                } else {
                    res.json({ success: false, status: 401 });
    
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports = { CreatePass , Authuser };