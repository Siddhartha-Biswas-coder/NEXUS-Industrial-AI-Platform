import mongoose, { InferSchemaType, HydratedDocument, Model } from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },

    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    sources: [
      {
        documentId: String,
        chunkIndex: Number,
        score: Number,
      },
    ],
  },
  {
    timestamps: true,
  },
);

messageSchema.index({
  chat: 1,
  createdAt: 1,
});

type Message = InferSchemaType<typeof messageSchema>;

export type MessageDocument = HydratedDocument<Message>;

type MessageModelType = Model<Message>;

const MessageModel = mongoose.model<Message, MessageModelType>(
  "Message",
  messageSchema,
);

export default MessageModel;
