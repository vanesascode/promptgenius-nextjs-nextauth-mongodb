import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'email already exists'],
    required: [true, 'email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  username: {
    type: String,
    required: [true, 'username is required'],
    match: [/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/, 'username must be between 8 and 20 characters long and can only contain letters, numbers, and underscores']
  },
  image: {
    type: String,
  }
});

const User = models.User || model("User", UserSchema);

export default User;