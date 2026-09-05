import mongoose, { InferSchemaType, HydratedDocument, Model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        role: {
            type: String,
            enum: ['user', 'admin'],
            default: "user",
        }
    },
    {
        timestamps: true,
    }
)

// Infer document fields
type User = InferSchemaType<typeof userSchema>;

// Custom instance methods
interface UserMethods {
    comparePassword(candidatePassword: string): Promise<boolean>;
}

// Full document type
export type UserDocument = HydratedDocument<User, UserMethods>;

// Tell Mongoose the model has these methods
type UserModelType = Model<User, {}, UserMethods>;

userSchema.pre("save", async function (this: UserDocument) {
    if (!this.isModified("password")) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = function (
    this: UserDocument,
    candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
}

const UserModel = mongoose.model<User, UserModelType>("User", userSchema);

export default UserModel;

