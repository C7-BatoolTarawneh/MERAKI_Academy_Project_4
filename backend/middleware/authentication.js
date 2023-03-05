//import the middleware that check if the user is authenticated
const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  try {
    //check if the auth.header is exisit in the coming request or not
    if (!req.headers.authorization) {
        //if it doesn't exist
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
//take the token from header and verify it using jwt.verify
    const token = req.headers.authorization.split(" ").pop()
        jwt.verify(token,process.env.SECRET,(err,result)=>{
       if (err)
       { res.status(403).json({ success: false, message: "The token is invalid or expired" })}
       else{
      
       req.token=result 
       next()
       }
    })
  } catch (error) {
    res.status(500).json({ success: false, message:"server error",error: error.message})
  }
};

module.exports = authentication;