import { Request, Response } from "express";
import User from "../Models/User.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Register User
const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            //@ts-ignore
            return res.status(400).json({
                status: 400,
                message: "All fields (username, email, password) are required.",
            });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            //@ts-ignore
            return res.status(409).json({
                status: 409,
                message: "Username or email already exists.",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the user
        const user = new User({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        await user.save();

        // Send the response
        res.status(201).json({
            status: 201,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            message: "User registered successfully.",
        });
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({
            status: 500,
            message: "An error occurred during registration.",
        });
    }
};

// Login User
const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if ((!username && !email) || !password) {
            //@ts-ignore
            return res.status(400).json({
                status: 400,
                message: "Either username or email, and password are required.",
            });
        }

        // Find the user by username or email
        const user = await User.findOne({
            $or: [{ username: username?.toLowerCase() }, { email: email?.toLowerCase() }],
        });
        if (!user) {
            //@ts-ignore
            return res.status(404).json({
                status: 404,
                message: "User not found.",
            });
        }

        // Check if the password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            //@ts-ignore
            return res.status(401).json({
                status: 401,
                message: "Invalid credentials.",
            });
        }

        // Generate JWT access token
        const accessToken = jwt.sign(
            {
                userId: user._id,
                username: user.username,
            },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        );

        // Exclude the password field from the user object
        const loggedInUser = await User.findById(user._id).select("-password");

        // Send the response
        res.status(200).json({
            status: 200,
            user: loggedInUser,
            accessToken,
            message: "User logged in successfully.",
        });
    } catch (error) {
        console.error("Error during user login:", error);
        res.status(500).json({
            status: 500,
            message: "An error occurred during login.",
        });
    }
};

export { registerUser, loginUser };
