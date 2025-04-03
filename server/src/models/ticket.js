import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    seatNumbers: [
      {
        type: Number,
        required: true,
      },
    ],

    total_fare: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enumm: ["Upcoming", "Cancelled", "Completed"],
      default: "Upcoming",
    },

    bookedAt: {
      type: Date,
      default: Date.now,
    },

    pnr: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Ticket = mongoose.model("Ticket", ticketSchema);
