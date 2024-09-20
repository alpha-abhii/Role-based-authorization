import express from 'express'
import verifyToken from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleMiddleware.js';

const router = express.Router();

//only admin can access this router
router.get("/admin",verifyToken,authorizeRoles("admin"),(req,res)=>{
    return res.json({
        msg: "welcome admin"
    })
})

//both admin and manager can access this router
router.get("/manager",verifyToken,authorizeRoles("admin","manager"),(req,res)=>{
    return res.json({
        msg: "welcome Manager"
    })
})
//All can access this router
router.get("/user",verifyToken,authorizeRoles("admin","manager","user"),(req,res)=>{
    return res.json({
        msg: "welcome user"
    })
})

export default router