import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    subscribers: [{type: Schema.Types.ObjectId, ref: 'User'}],
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],
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