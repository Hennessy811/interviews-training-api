import mongoose from "mongoose";
const Schema = mongoose.Schema;

// установка схемы
const userSchema = new Schema({
  name: String,
  picture: String,
  email: String,
  familyName: String,
  givenName: String,
  googleId: String,
  imageUrl: String,
});

export default mongoose.model("User", userSchema);
