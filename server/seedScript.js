import { buses, generateSeats, locations } from "./seedData.js";
import { Bus } from "./src/models/bus.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const generateRandomTime = (baseDate) => {
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);

  const dateTime = new Date(baseDate);
  dateTime.setHours(hours, minutes, 0, 0);

  return dateTime;
};

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Bus.deleteMany({});

    const busesToInsert = [];

    for (let i = 0; i < locations.length; i++) {
      for (let j = i + 1; j < locations.length; j++) {
        const from = locations[i];
        const to = locations[j];

        const baseDate = new Date();

        for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
          const travelDate = new Date(baseDate);
          travelDate.setDate(travelDate.getDate() + dayOffset);

          const returnDate = new Date(travelDate);
          returnDate.setDate(returnDate.getDate() + 1);

          buses.forEach((bus) => {
            const departureTime = generateRandomTime(travelDate);
            const arrivalTime = generateRandomTime(travelDate);

            busesToInsert.push({
              busId: `${bus.busId}_${from}_${to}_${dayOffset}`,
              from,
              to,
              departureTime,
              arrivalTime,
              duration: "9h 30m",
              availableSeats: 28,
              price: bus.price,
              originalPrice: bus.originalPrice,
              company: bus.company,
              busType: bus.busType,
              rating: bus.rating,
              totalReviews: bus.totalReviews,
              badges: bus.badges,
              seats: generateSeats(),
            });
          });
        }
      }
    }

    await Bus.insertMany(busesToInsert);

    console.log("Data seeded successfully");
  } catch (error) {
    console.error("Error seeding data: ", error);
  } finally {
    mongoose.connection.close();
  }
}

seedData();
