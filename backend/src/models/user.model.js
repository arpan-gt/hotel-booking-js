import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["USER", "EMPLOYEE", "EMPLOYER", "SUPER_ADMIN"],
      default: "USER",
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address");
        }
      },
    },

    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a stronger password");
        }
      },
    },

    dateOfBirth: {
      type: Date,
      required: true,
      validate(value) {
        const today = new Date();

        if (value > today) {
          throw new Error("Date of birth cannot be in future");
        }

        let age = today.getFullYear() - value.getFullYear();
        const monthDiff = today.getMonth() - value.getMonth();

        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < value.getDate())
        ) {
          age--;
        }

        if (age < 18) {
          throw new Error("User must be at least 18 years old");
        }
      },
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.verifyPassword = async (password) => {
  return bcrypt.compare(password, this.password);
};
const User = mongoose.model("User", userSchema);

export default User;
