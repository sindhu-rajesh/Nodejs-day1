import express from "express";
import cors from "cors";
import fs from "fs"; // File handling
import { format } from "date-fns"; // Date formatting

const app = express();
const PORT = 6000; // New port number

app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Homepage route
app.get('/', (req, res) => {
  res.send(`
    <div style="height:100vh; display:flex; flex-direction:column; justify-content:center; align-items:center; background-color:rgba(0,0,0,.4); padding: 20px;">
      <h1 style="color: #ffffff; font-family: Poppins;">Welcome to the File Handling API!</h1>
      <p style="color: #ffffff; font-family: Poppins; text-align: center;">
        <strong>Endpoint to write a file with timestamp:</strong> /writefile<br>
        <strong>Endpoint to read all files in the folder:</strong> /readallfiles
      </p>
    </div>
  `);
});

// Route to write a file with timestamp
app.get('/writefile', (req, res) => {
  const currentTime = new Date();
  const formattedTime = format(currentTime, "dd-MM-yyyy-HH-mm-ss");
  const directoryPath = 'timestamps';
  const filePath = `${directoryPath}/${formattedTime}.txt`;

  // Check if the directory exists, if not create it
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }

  fs.writeFileSync(filePath, `${currentTime}`, 'utf8');
  res.send(`File ${formattedTime}.txt created at ${currentTime}`);
});

// Route to read all files in the directory
app.get('/readallfiles', (req, res) => {
  const directoryPath = "timestamps";
  if (!fs.existsSync(directoryPath)) {
    return res.send("No files found.");
  }

  const files = fs.readdirSync(directoryPath);
  res.json(files); // Send the array of file names as JSON
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});