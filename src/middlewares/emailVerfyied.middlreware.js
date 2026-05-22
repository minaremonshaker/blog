

const emailVerfyied = (req, res, next) => {
    const user = req.user;
    if(!user || user === undefined) return res.status(400).json({ sucess: false, message: "unauthenticated" }); 
    if(!user.isVerifyed) return res.status(400).json({sucess: false, message: "verfy email "})
    next()
}

export default emailVerfyied