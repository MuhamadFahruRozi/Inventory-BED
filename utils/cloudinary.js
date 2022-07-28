const dotenv = require('dotenv');
dotenv.config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'aserehearehe', 
  api_key: '366992497442631', 
  api_secret: 'E_k3mlOhp3dBgX5aYXhbTrxUEeg'
});

module.exports = cloudinary;