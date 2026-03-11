import validator, { trim } from "validator";

// {signup vlaidation}
export const validateSignup = (req) => {
  const { fullName, email, password, gender, dateOfBirth } = req;

  if (!fullName || !email || !password || !gender || !dateOfBirth) {
    throw new Error("All fields are required");
  }

  const trimmedEmail = email.trim().toLowerCase();

  if (!validator.isEmail(trimmedEmail)) {
    throw new Error("Enter valid lowercase email");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password must be strong");
  }

  if (!["Male", "Female"].includes(gender)) {
    throw new Error("Gender can be either 'Male' or 'Female' ");
  }

  if (isNaN(Date.parse(dateOfBirth))) {
    throw new Error("Enter valid date of birth");
  }
};

// {login validation}
export const validateLogin = (req) => {
  const { email, password } = req;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  const trimmedEmail = email.trim();
  if (!validator.isEmail(trimmedEmail)) {
    throw new Error("Enter valid email");
  }
};

//  {create hotel validation}
export const validateHotelData = (req) => {
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
    images,
  } = req;

  if (
    !name ||
    !address ||
    !city ||
    !state ||
    !country ||
    !pincode ||
    !totalRooms ||
    !pricePerNight ||
    !description ||
    !amenities ||
    !guestsPerRoom ||
    !rating ||
    !checkInTime ||
    !checkOutTime ||
    !images
  ) {
    throw new Error("All fields are required to create hotel");
  }

  if (!Array.isArray(amenities || amenities.length === 0)) {
    throw new Error("amenities muste be a non-empty array ");
  }

  if (totalRooms <= 0 || pricePerNight <= 0 || guestsPerRoom <= 0) {
    throw new Error("Numeric fields must be greater than 0");
  }

  if (rating !== undefined && (rating < 0 || rating > 5)) {
    throw new Error("Rating must be between 0 and 5");
  }
};
