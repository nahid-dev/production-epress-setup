import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    //get user details from frontend

    //validation-not empty

    //check if user already exist: username, email

    //check for images, check for avatar

    //upload them cloudinary, avatar

    //create user object - create entry in db

    //remove password and refresh token field from response

    //check for user creation

    //returns res

    const { fullName, password, email, username } = req.body;
    console.log("email : ", email);

    if (
        [fullName, password, email, username].some(
            (field) => field.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existUser = User.findOne({
        $or: [{ username }, { email }],
    });

    if (existUser) {
        throw new ApiError(409, "User with email or username already exist.");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadCloudinary(avatarLocalPath);
    const coverImage = await uploadCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required");
    }

    const user = await User.create({
        fullName,
        avatar: avatar?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    });

    const createUser = await User.findById(user._id).selected(
        "-password -refreshToken"
    );

    if (!createUser) {
        throw new ApiError(500, "Something went wrong wile register the user.");
    }

    return res
        .status(201)
        .json(new ApiResponse(200, createUser, "User register successfully."));
});

export { registerUser };
