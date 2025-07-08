const mongoose = require('mongoose');
const dotenv= require('dotenv')
const jwt = require("jsonwebtoken");


const  UserSchema  =  new  mongoose.Schema ( { 
  nom:{type: String, required : true},
  email:{type: String, required : true, unique: true},
  password:{type:String, required: true},
},
{timestamps: true} // Crée createdAt et updatedAt automatiquement
 ) ;

 UserSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, email: this.email, isAdmin: this.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "90d" } // Expire après 90 jours
  );
};

 module.exports = mongoose.model('user',UserSchema)