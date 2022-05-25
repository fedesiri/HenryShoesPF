export const isUserAuthenticated = (req, res, next) => {
    if(req.user){
        next();
    } else{
        res.send("you are not authenticated");
    }
}