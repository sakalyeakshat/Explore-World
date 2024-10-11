const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review.js");


const ImageSchema = new mongoose.Schema({
  filename: String,
  url: String,
});

const listingSchema = new Schema({
  title: {
    type: String,
    required:true
  },
  description: String,
  image: {
    url: { type: String, required:true, },
    filename: { type: String }
  },
  price: Number,
  location: String,
  country: String,
  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref:"Review",
    },
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  },
});

listingSchema.post("findOneandDelete",async(listing)=>{
  if (listing){
    await Review.deleteMany({_id:{$in:listing.reviews}});
  }
  
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;