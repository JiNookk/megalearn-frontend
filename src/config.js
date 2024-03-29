// const baseUrl = 'http://localhost:8000';
const frontUrl = process.env.REACT_APP_FRONT_BASE_URL;
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const config = {
  cloudinaryName: process.env.CLOUDINARY_NAME,
  cloudinaryKey: process.env.CLOUDINARY_KEY,
  cloudinarySecret: process.env.CLOUDINARY_SECRET,
};

export default baseUrl;
