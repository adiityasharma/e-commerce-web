import mongoose, { model, Schema } from "mongoose";


const featureSchema = new Schema({
  image: String
}, { timestamps: true })


export const Feature = model("Feature", featureSchema)