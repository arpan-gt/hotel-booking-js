import { validateHotelData } from "../utils/validation";

export const createHotel = async (req, res) => {
  try {
    const {
      name,
      address,
      city,
      state,
      country,
      pincode,
      totalRooms,
      pricePerNight,
      description,
      amenities,
      guestsPerRoom,
      rating,
      checkInTime,
      checkOutTime,
    } = req.body;

    validateHotelData(req.body);
    
  } catch (err) {}
};

export const fetchHotels = async (req, res) => {};

export const fetchHotelById = async (req, res) => {};

export const updateHotel = async (req, res) => {};

export const deleteHotel = async (req, res) => {};
