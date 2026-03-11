import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: Number,
      required: true,
    },

    totalRooms: {
      type: Number,
      required: true,
    },

    availableRooms: {
      type: Number,
      required: true,
    },

    pricePerNight: {
      type: Number,
      required: true,
    },

    images: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      trim: true,
    },

    amenities: {
      type: [String],
      required: true,
      validate(value) {
        if (value.length === 0) {
          throw new Error("Amenities must be provided");
        }

        const uniqueAmenities = new Set(value);

        if (uniqueAmenities.size !== value.length) {
          throw new Error("Amenities must be unique");
        }
      },
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    guestsPerRoom: {
      type: Number,
      required: true,
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    checkInTime: {
      type: String,
      default: "10:00",
    },

    checkOutTime: {
      type: String,
      default: "11:00",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

hotelSchema.index({ city: 1, pricePerNight: 1 });

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;
  