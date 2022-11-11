exports.getProducts = (req,res,next)=>{
    res.status(200).json({
        success:true,
        message:'This route will show you all products in database.',
    })
}