import mongoose from "mongoose"

const userChatsSchema = new mongoose.Schema({
    userID: {
        type: String,
        require: true,
    },
    chats:[
        {
            _id:{
                type: String,
                require: true,
            },
            title:{
                type: String,
                require: true,
            },
            createdAt:{
                type: Date,
                default:Date.now(),
                require: true,
            },
            
        }
    ]
}, 
{timestamps: true}

)
// if chat is in the database, just use it; otherwise create a new chatSchoema
export default mongoose.models.userchats || mongoose.model("userchats", userChatsSchema);