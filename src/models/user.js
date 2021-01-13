const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;
const userSchema = Schema(
  {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
      },

    password: {
        type: String,
        trim: true,
        minlength: 7,
        validate(value) {
          if (value.toLowerCase().includes('password')) {
            throw new Error('Password should not contain word: password');
          }
        },
      },

    firstname: {
        type: String,
        required: true,
        trim: true,
      },

    lastname: {
          type: String,
          required: true,
          trim: true,
        },
    
    birthdate: {
            type :Date,
            required: true,
        },

    gender: {
        type:String,
        required: true,
        default: 'female',
        enum: ['female', 'male']
    },
    
    city: {
        type:String,
        required: true,
    },
    address: {
        type:String,
        required: false,
    },
  

    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('email is invalid');
        }
      },
    },
    role: {
        type: String,
        default: 'guest',
        enum: ['guest', 'fan','manager', 'siteAdmin'],
    },
    authorized:{
      type: Boolean ,
      default: false
    }
  }
);

// userSchema.methods.toJSON = function() {
//   const user = this;
//   const userObject = user.toObject();
//   if (!userObject.role === 'siteAdmin') {
//     delete userObject.updatedAt;
//     delete userObject.__v;
//   }
//   delete userObject.password;
//   delete userObject.tokens;

//   return userObject;
// };
// userSchema.methods.VerificationToken = async function () {
//     const user = this;
//     const token = jwt.sign({ _id: user._id.toString() }, "mySecret");
//     return token;
//   };

// userSchema.methods.generateAuthToken = async function() {
//   const user = this;
//   const token = jwt.sign({ _id: user._id.toString()}, 'mySecret');
//   user.tokens = user.tokens.concat({ token });
//   await user.save();
//   return token;
// };

// userSchema.statics.findByCredentials = async (username, password) => {
//   const user = await User.findOne({ username });
//   if (!user) throw new Error('Unable to login');

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) throw new Error('Unable to login');

//   return user;
// };

// // Hash the plain text password before save
// userSchema.pre('save', async function(next) {
//   const user = this;
//   if (user.isModified('password')) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   next();
// });

const User = mongoose.model('User', userSchema);

module.exports = User;