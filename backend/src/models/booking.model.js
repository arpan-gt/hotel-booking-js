import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
      index: true,
    },

    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],

    noOfGuests: {
      type: Number,
      required: true,
      min: 1,
    },

    noOfRooms: {
      type: Number,
      required: true,
      min: 1,
      validate(value) {
        if (this.rooms && value !== this.rooms.length) {
          throw new Error("noOfRooms must match rooms selected");
        }
      },
    },

    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
      validate(value) {
        if (value <= this.checkIn) {
          throw new Error("Check-out must be after check-in");
        }
      },
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

bookingSchema.index({ user: 1 });
bookingSchema.index({ hotel: 1 });
bookingSchema.index({ checkIn: 1, checkOut: 1 });
bookingSchema.index({ hotel: 1, checkIn: 1, checkOut: 1 });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
