import mongoose from "mongoose";
const Schema = mongoose.Schema;

// установка схемы
const sceneSchema = new Schema({
  title: String,
  picture: String,
  tags: [String],
  questionIds: [Schema.Types.ObjectId],
});

export default mongoose.model("scene", sceneSchema);
