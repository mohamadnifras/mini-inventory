import CustomError from "../utils/customError.js";

const isAdmin = (req,res,next)=>{
    if(req.user&&req.user.role === 'admin'){
        next()
    }else{
        throw new CustomError('Access denied. Only Admin Access.',403);
    }
}

export default isAdmin