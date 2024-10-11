const User=require("../models/user");
module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser= new User({email,username});
       const registeredUser=await User.register(newUser,password);
       console.log(registeredUser);

       req.flash("success","Welcome to Wanderlust!");
      return  res.redirect("/listings");
}catch(e){
req.flash("error",e.message);
res.redirect("/listings");
}
};

module.exports.renderLoginform=(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login= async(req,res)=>{
    req.flash("success","Welcome back to wanderlust");
 res.redirect("res.locals.redirectUrl");

};
module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","you are logged out now!");
        res.redirect("/listings");
    });
};