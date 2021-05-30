const {Schema, model, Types } = require('mongoose');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //set up get
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
    },
    id: false
}
);

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        //default: new.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    }
})

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;