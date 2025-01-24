import { Request, Response } from 'express';
import User from "../Models/User.model";



// Register User
const registerUser = async (req: Request, res: Response): Promise<Response> => {
    const { username, email, password } = req.body;

    // Validation - Check for empty fields
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }


    // Check if user already exists by username or email
    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists with this email or username" });
        }


        // Create new user
        const user = new User({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password,
        });

        await user.save();

        // Return created user excluding password
        const createdUser = await User.findById(user._id).select("-password -refreshToken");

        // Successful registration
        return res.status(201).json({
            status: 200,
            user: createdUser,
            message: "User registered successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong while registering the user" });
    }
};



// Login User
const loginUser = async (req: Request, res: Response): Promise<Response> => {
    const { username, email, password } = req.body;

    // Validation - Check if either username or email is provided
    if (!username && !email) {
        return res.status(400).json({ message: "Username or email is required" });
    }

    try {
        // Find user by username or email
        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        // Verify password
        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate access and refresh tokens
        const { accessToken} = await generateAccessTokens(user._id);

        // Remove sensitive fields from response
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        // Set cookies with tokens and return response
        const options = { httpOnly: true, secure: true };
        return res.status(200)
            .cookie("accessToken", accessToken, options)
            // .cookie("refreshToken", refreshToken, options)
            .json({
                status: 200,
                user: loggedInUser,
                accessToken,
                // refreshToken,
                message: "User logged in successfully",
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong during login" });
    }
};

// Logout User
const logoutUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Clear refreshToken in the database
        await User.findByIdAndUpdate(req.user._id, { $set: { refreshToken: undefined } });

        // Clear cookies and return response
        const options = { httpOnly: true, secure: true };
        return res.status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({
                status: 200,
                message: "User logged out successfully",
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong during logout" });
    }
};

export { registerUser, loginUser, logoutUser };
