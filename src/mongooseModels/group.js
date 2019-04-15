import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: String,
    picture: { type: String, default: "" },
    subscribers: [{type: Schema.Types.ObjectId, ref: 'User'}],
    createdAt: Date,
    updatedAt: Date

});

groupSchema.pre('save', function(next) {
    let currentDate = new Date();
    this.updatedAt = currentDate;
    if (!this.createdAt)
        this.createdAt = currentDate;
    next();
});

export default  db => { db.model('Group', groupSchema)}