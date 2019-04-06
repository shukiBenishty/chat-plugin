import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true, index: true},
    data: {type: Object, required: true},
    dateSended: {type: Date, default: Date.now, required: true}, 
    received: {type: Boolean, default: false ,required: true},
    readed: {type: Boolean, default: false ,required: true},
    destination: {type: Schema.Types.ObjectId, required: true,  refPath: 'destinationModel', index: true},
    destinationModel: {
        type: String,
        enum: ['User', 'ChatRoom']
    },
    createdAt: Date,
    updatedAt: Date,
    isDeleted:  {type: Boolean, default: false ,required: true},
});

messageSchema.pre('save', function(next) {
    let currentDate = new Date();
    this.updatedAt = currentDate;
    if (!this.createdAt)
        this.createdAt = currentDate;
    next();
});

export default  db => { db.model('Message', messageSchema)}
