const {
  signupService,
  loginService,
  findUserByEmail, 
  findUserByToken}
  = require("../services/user.service");
const { generateToken } = require("../utils/token");
const {  sendMailWithGmail } = require("../utils/email");
// get all product
const bcrypt = require('bcryptjs');
module.exports.signup = async (req, res) => {
  try {
    //    console.log(req.body);
    const user = await signupService(req.body);
     
    const token = user.generateConfirmationToken();
    console.log(token);
    await user.save({validateBeforeSave:false});
    const mailData = {
      to:[user.email],
      subject:"veryfy your token",
      text:`thank u for confirm account : ${
        req.protocol
      }://${req.get("host")}${req.originalUrl}/confirmation/${token}`
    }
    await sendMailWithGmail(mailData)
    res.status(200).json({
      status: "succesfful",
      message: "get user data",
      result: user
    });
  }
  catch (error) {
    res.status(500).json({
      status: "authentiacation failed",
      message: "signup is failed",
      result: error.message
    })
  }
}
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        error: "Please provide your credentials",
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "No user found. Please create an account",
      });
    }

    const isPasswordValid = user.comparePassword(password, user.password);
    console.log(isPasswordValid)
    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail",
        error: "Password is not correct",
      });
    }

    if (user.status != "active") {
      return res.status(401).json({
        status: "fail",
        error: "Your account is not active yet.",
      });
    }

    const token = generateToken(user);

    const { password: pwd, ...others } = user.toObject();

    res.status(200).json({
      status: "success",
      message: "Successfully logged in",
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      
    });
  }
};

module.exports.getMe= async (req, res) => {
  try {
    //    console.log(req.body);
    const result = await findUserByEmail(req.user?.email);
    const {password:pwd,...others} = result.toObject();
    res.status(200).json({
      status: "succesfful",
      message: "get user data",
      result: others
    });
  }
  catch (error) {
    res.status(500).json({
      status: "authentiacation failed",
      message: "signup is failed",
      result: error.message
    })
  }
}
exports.confirmationAccount = async (req,res)=>{
      try{
         const {token} = req.params;
         const user =await findUserByToken(token);
   
         if(!user){
          return res.status(403).json({
            status:"fail getting user",
             error:"invalid user"
          })
         }
         console.log(new Date(), " = = " ,new Date(user.confirmationTokenExpires))
         const expired = new Date()>new Date(user.confirmationTokenExpires);
        if(expired){
          return res.status(403).json({
            status:"fail",
             error:"token expired"
          })
        }
        user.status = "active",
        user.confirmationToken = undefined,
        user.confirmationTokenExpires=undefined,
         user.save({validateBeforeSave:false});
        console.log(user);
        res.status(200).json({
          status:"active account successfully",
          message: "congrats",
          result: user
        });
        }
      catch(error){
        console.log(error)
        res.status(500).json({
          status:"fail",
          error
        })
      }
}