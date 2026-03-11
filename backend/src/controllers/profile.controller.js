import User from "../models/user.model";

//  {get user profile}
export const fetchMyProfile = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const user = await User.findById({ _id: loggedInUser._id }).select(
      "-password",
    );
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Profile fetched",
      success: true,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: error,
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {};
