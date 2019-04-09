import mongoose from 'mongoose';
const Schema = mongoose.Schema;


// create a schema
let userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    contacts: {type: [ {type: Schema.Types.ObjectId, ref: 'User', default: [] }] },
    chatRooms: [ {type: Schema.Types.ObjectId, ref: 'ChatRoom',  default: [] }],
    picture: { type: String, default: "" },
    admin: { type: Boolean, default: false, required: true },
    online: { type: Boolean, default: false },
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
