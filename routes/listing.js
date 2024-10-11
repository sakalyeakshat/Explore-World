const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema,reviewSchema} = require('../schema.js');
const Listing=require("../models/listing.js");
const {isLoggedIn}=require('../middleware.js');
const listingController=require("../controllers/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });



const validateListing=(req,res,next)=>{
    let {error} =   listingSchema.validate(req.body);
    if(error){
        let errMsg =error.details.map((el)=>el.message).join(",");
       throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};



router.
route("/")
.get(wrapAsync(listingController.index))
//.post(
  //  validateListing,
  //  wrapAsync(listingController.createListing)
   
//);
.post(upload.single('avatar'),(req,res)=>{
  res.send(req.file);
});

//New Route
router.get("/new",listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,validateListing,
    wrapAsync(listingController.updateListing))
.delete(isLoggedIn, wrapAsync(listingController.destroyListing));






//Edit Route
router.get("/:id/edit",wrapAsync(listingController.renderEditForm));

module.exports=router;