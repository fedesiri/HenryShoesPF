export const isUserAuthenticated = (req, res, next) => {
    console.log(req.user)
    if(req.user){
        next();
    } else{
        res.send(null);
    }
}