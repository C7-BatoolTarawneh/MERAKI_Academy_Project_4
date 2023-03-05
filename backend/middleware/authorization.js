//check the permission that was written in a string format in role schema
const authorization = (string) => {
  return (req, res, next) => {
    //check if the token contains the permissions property in the role object
    if (!req.token.role.permissions.includes(string)) {
      return res
        .status(403)
        .json({
            success:false,
          message:
            " Unauthorized!! You do not have permission to perform this action",
        });
    }
    next();
  };
};

module.exports = authorization;
