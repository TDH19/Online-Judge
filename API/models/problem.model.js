import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  title : {
    type : String,
    required : true,
  },
  description : {
    type : String,
    required : true,
  },
  sampleInput : {
    type : String,
    required : true,
  },
  sampleOutput : {
    type : String,
    required : true,
  },
  category : {
    type : String,
    required : true,
  },
  difficulty : {
    type : String,
    required : true,
  },
  userRef : {
    type : String,
    required : true,
  },
  
},{timestamps : true});

export const Problem = mongoose.model('Problem',problemSchema);