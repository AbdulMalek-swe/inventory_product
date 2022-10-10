 
const User = require("../model/User")

exports.signupService =async (userData)=>{
    const user = await User.create(userData);
   
    return user;
}
exports.findUserByEmail =async (email)=>{
   return await User.findOne({email})
}
exports.findUserByToken =async (token)=>{
   
  const result = await User.findOne({confirmationToken:token})
 
  return result;
 }
 