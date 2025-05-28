//VSCODE GREAT ICONS
import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },

    role: {
      type: String,
      enum: ["customer"],
      default: "customer",
    },
  },
  { timestamps: true } //to add createdAt and updatedAt fields
);

const User = mongoose.model("User", userSchema);
// First character is Uppercase, because it is a model
// and it is a convention to use Uppercase for models
// and lowercase for collections
// mongoose automatically creates a collection with the name of the model in lowercase and plural form
export default User;
