import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
      index: true,
    },

    roomNumber: {
      type: Number,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },s
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

roomSchema.index({ hotel: 1, roomNumber: 1 }, { unique: true });

const Room = mongoose.model("Room", roomSchema);

export default Room;
