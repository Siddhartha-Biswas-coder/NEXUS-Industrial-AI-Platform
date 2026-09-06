import mongoose, { InferSchemaType,HydratedDocument } from "mongoose";

const documentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },

    originalName: {
        type: String,
        required: true,
    },

    extractedText: {
        type: String,
        default: "",
    },

    pageCount: {
        type: Number,
        default: 0,
    },

    processedAt: {
        type: Date,
    },

    filePath: {
        type: String,
        required: true,
    },

    fileSize: {
        type: Number,
        required: true,
    },

    mimeType: {
        type: String,
        required: true,
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    status: {
        type: String,
        enum: ["uploaded", "processing", "indexed"],
        default: "uploaded",
    }
}, {
    timestamps: true,
})

export type Document = InferSchemaType<typeof documentSchema>
export type DocumentDocument = HydratedDocument<Document>;

const DocumentModel = mongoose.model("Document", documentSchema)

export default DocumentModel;