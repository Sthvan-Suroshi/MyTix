import { Bus } from "../models/bus.js";
import { Ticket } from "../models/ticket.js";
import { User } from "../models/user.js";
import { v4 as uuidv4 } from "uuid";

export const getUserTicket = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const tickets = Ticket.find({ user: userId })
      .populate("bus", "busId from to busType company departureTime arrivalTime price")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: tickets || [] });
  } catch (error) {
    console.error("Error fetching user ticket: ", error);
    return res.status(500).json({ error: "Error fetching user ticket" });
  }
};

export const bookTicekt = async (req, res) => {
  try {
    const { busId, date, seatNumbers } = req.body;
    const userId = req.userId;

    if (!busId || !date || !seatNumbers) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const bus = await Bus.findOne({ busId });

    if (!bus) {
      return res.status(404).json({ error: "Bus not found" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const unavailableSeats = seatNumbers.filter((seatNum) =>
      bus.seats?.find((row) => row.some((seat) => seat.seat_id === seatNum && seat.booked))
    );

    if (unavailableSeats.length > 0) {
      return res.status(400).json({ error: `Seats ${unavailableSeats} are already booked` });
    }

    const total_fare = bus.price * seatNumbers.length;

    const newTicket = new Ticket({
      user: userId,
      bus: busId,
      date,
      seatNumbers,
      total_fare,
      pnr: uuidv4().slice(0, 10).toUpperCase(),
    });

    await newTicket.save();

    bus.seats.forEach((row) => {
      row.forEach((seat) => {
        if (seatNumbers.includes(seat.seat_id)) {
          seat.booked = true;
        }
      });
    });

    await bus.save();

    return res.status(200).json({ success: true, data: newTicket });
  } catch (error) {
    console.error("Error booking ticket: ", error);
    return res.status(500).json({ error: "Error booking ticket" });
  }
};
