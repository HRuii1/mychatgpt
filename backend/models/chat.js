import mongoose from "mongoose"

const chatSchema = new mongoose.Schema({
    userID: {
        type: String,
        require: true,
    },
    history:[
        {
            role:{
                type: String,
                enum: ["user" , "model"],
                require: true,
            },
            parts:[
                {
                    text:{
                        type: String,
                        require: true,
                    },
                },
            ],
            img:{
                type: String,
                require:false,
            }

        }
    ]
}, 
{timestamps: true}

)
// if chat is in the database, just use it; otherwise create a new chatSchoema
export default mongoose.models.chat || mongoose.model("chat", chatSchema);