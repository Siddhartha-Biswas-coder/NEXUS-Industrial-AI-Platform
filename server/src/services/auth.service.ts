import ApiError from "../errors/ApiError.ts";
import UserModel from "../models/user.model.ts";
import { generateToken } from "../utils/jwt.ts";
import type {UserDocument} from "../models/user.model.ts"

interface SignupData {
    name: string,
    email: string,
    password: string
}

interface LoginData {
    email: string,
    password: string,
}

const sanitizeUser = (user: UserDocument) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
})

export const signUpService = async ({ name, email, password }: SignupData) => {

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await UserModel.findOne({ email:  normalizedEmail });

    if (existingUser) {
        throw new ApiError(409, "Email already exists")
    }

    const user = await UserModel.create({
        name, email : normalizedEmail, password
    })

    const token = generateToken(user.id, user.role);

    return {
        user: sanitizeUser(user),
        token
    }
}

export const loginService = async ({ email, password }: LoginData) => {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await UserModel.findOne({ email: normalizedEmail })

    if (!user) {
        throw new ApiError(401, "Invalid email or password")
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password");
    }

    const token = generateToken(user.id, user.role);

    return {
        user: sanitizeUser(user),
        token
    }
}