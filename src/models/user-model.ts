import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "O campo username é obrigatório!"],
    unique: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    match:
      /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_'+\-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
    required: [true, "O campo email é obrigatório!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "O campo password é obrigatório!"],
  },
  
});

export default mongoose.model("User", userSchema);
