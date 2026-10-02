import UserModel from '../models/userModel.js'

export const admin = async(req, res, next) => {
  try {
    const userId = req.userId

    console.log('user id', userId);
    const user = await UserModel.findById(userId)

    if(user.role !== 'ADMIN'){
        return res.status(400).json({
            message : 'Permission denail',
            error : true,
            success : false
        })
    }

    next()
    
  } catch (error) {
    return res.status(500).json({
      message: "Permission denial" || error,
      error: true,
      success: false,
    });
  }
};
