import mongoose, {
    InferSchemaType,
    HydratedDocument,
    Model,
} from "mongoose";

const conversationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: "New Conversation",
            trim: true,
            maxLength: 100,
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        lastMessageAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
)

conversationSchema.index({
    owner: 1,
    lastMessageAt: -1,
})

type Conversation = InferSchemaType<typeof conversationSchema>;

export type ConversationDocument = HydratedDocument<Conversation>;

type ConversationModelType = Model<Conversation>;

const ConversationModel = mongoose.model<Conversation, ConversationModelType>("Conversation", conversationSchema);

export default ConversationModel;
