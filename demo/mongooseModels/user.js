import mongoose from 'mongoose';
const Schema = mongoose.Schema;


let userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    contacts: {type: [ {type: Schema.Types.ObjectId, ref: 'User', unique: true}] },
    chatRooms: [ {type: Schema.Types.ObjectId, ref: 'ChatRoom', unique: true}],
    picture: { type: String, default: "" },
    admin: { type: Boolean, default: false, required: true },
    createdAt: Date,
    updatedAt: Date
});


userSchema.pre('save', function(next) {
    let currentDate = new Date();
    this.updatedAt = currentDate;
    if (!this.createdAt)
        this.createdAt = currentDate;
    next();
});


export default db => { db.model("User", userSchema)}
