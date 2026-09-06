import mongoose, { InferSchemaType, HydratedDocument } from "mongoose";

const chunkSchema = new mongoose.Schema(
    {
        document: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Document",
            required: true,
            index: true,
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        chunkIndex: {
            type: Number,
            required: true,
        },

        content: {
            type: String,
            required: true,
        },

        characterCount: {
            type: Number,
            required: true,
        },
        pageNumber: {
            type: Number,
            required: true,
        }
    }, {
    timestamps: true,
}
)

chunkSchema.index({ document: 1, chunkIndex: 1 })

export type Chunk = InferSchemaType<typeof chunkSchema>
export type ChunkDocument = HydratedDocument<Chunk>
const ChunkModel = mongoose.model("Chunk", chunkSchema);

export default ChunkModel


