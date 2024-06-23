import mongoose from 'mongoose';

const trackSch = new mongoose.Schema({
    page: { type: String, required: true, unique: true },
    views: { type: Number },
});


const trackModel = mongoose.model("trackDefex", trackSch);
export default trackModel;