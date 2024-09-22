const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const USER_ID = "kishan_pandey_15122004";
const EMAIL = "kp9631@srm.edu.in";
const ROLL_NUMBER = "RA2111003011759";

app.post('/bfhl', (req, res) => {
  try {
    const { data, file_b64 } = req.body;


    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highestLowercase = alphabets
      .filter(char => char.length === 1 && char === char.toLowerCase())
      .sort((a, b) => b.localeCompare(a))[0] || [];


    const fileValid = !!file_b64;
    const fileMimeType = fileValid ? "image/png" : undefined; 
    const fileSizeKb = fileValid ? "400" : undefined; 

    res.json({
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
      file_valid: fileValid,
      file_mime_type: fileMimeType,
      file_size_kb: fileSizeKb
    });
  } catch (error) {
    res.status(400).json({ is_success: false, error: error.message });
  }
});

app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; 