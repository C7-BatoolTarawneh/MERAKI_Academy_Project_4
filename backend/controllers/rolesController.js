//import the role model
const RoleModel = require('../models/roles');

//create a new role
const createNewRole =(req, res) =>{
    //take role and permissions from request.body
    const {role,permissions}=req.body
    //create instance of role
    const newRole = new RoleModel({role,permissions});
    //save it in database
    newRole.save()
  .then((result)=>{
    res.status(201).json({sucess:true,message:'Role created successfully',role:result})
  })
.catch((err)=>{
    res.status(500).json({sucess:false,message:'Server Error',err:err.message})
  })
}

module.exports = {createNewRole}