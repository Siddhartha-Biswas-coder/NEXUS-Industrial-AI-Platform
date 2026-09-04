import ApiError from "../errors/ApiError.ts";
import UserModel from "../models/user.model.ts";
import { generateToken } from "../utils/jwt.ts";


interface SignupData {
    name: string,
    email: string,
    password: string
}

export const signUpService = async ({ name, email, password }: SignupData) => {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        throw new ApiError(409, "Email already exists")
    }

    const user = await UserModel.create({
        name, email, password
    })

    const token = generateToken(user.id, user.role);

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        }, token
    }
}