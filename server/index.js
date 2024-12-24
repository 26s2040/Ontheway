import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./Models/UserModel.js";
import PostModel from "./Models/PostModel.js";
import RequestModel from "./Models/RequestModel.js"; // Import the Request model
//import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Database connection
const connectString =
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.bkuba.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(connectString);
app.listen(process.env.PORT, () => {
  console.log("You are connected");
});

// Register User Route
app.post("/registerUser", async (req, res) => {
  const role = "user";
  try {
    const user = new UserModel({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      password: req.body.password,
      role: req.body.role,
    });

    await user.save();
    res.send({ user: user, msg: "Document saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

// Save Post Route
app.post("/savePost", async (req, res) => {
  try {
    const postMsg = req.body.postMsg;
    const email = req.body.email;

    const post = new PostModel({
      postMsg: postMsg,
      email: email,
    });

    await post.save();
    res.send({ post: post, msg: "Added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// Express route for login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      res.status(500).send({ msg: "Couldn't find the user" });
    } else if (user.password !== password) {
      res.status(500).json({ msg: "Password is incorrect" });
    } else {
      res.send({ user: user, msg: "Authentication is successful" });
    }
  } catch (error) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

// Logout Route
app.post("/logout", async (req, res) => {
  res.send({ msg: "Logout successful, Have a great day!" });
});

// Get Drivers Route
app.get("/drivers", async (req, res) => {
  try {
    const { address } = req.query;

    // Query to find drivers where role is 'driver' and address matches the city
    const drivers = await UserModel.find({ role: "driver", address: address });

    if (drivers.length > 0) {
      res.status(200).json({
        drivers: drivers,
        msg: `${drivers.length} driver(s) found in ${address}`,
      });
    } else {
      res.status(404).json({
        drivers: [],
        msg: `No drivers found in ${address}`,
      });
    }
  } catch (error) {
    console.error("Error fetching drivers:", error);
    res.status(500).json({
      drivers: [],
      msg: `Sorry, there is no driver in ${address}.`,
    });
  }
});

















// Request Route (added logic for handling requests)
const router = express.Router();

// Endpoint to create a new request
router.post('/request', async (req, res) => {
  try {
    const { userEmail, driverId, address } = req.body;

    // Create the request object
    const newRequest = new RequestModel({
      userEmail,
      driverId,
      address,
    });

    // Save the request to the database
    await newRequest.save();

    res.status(201).json({ message: 'Request created successfully', request: newRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error creating request', error: error.message });
  }
});


// Endpoint to get all requests
router.get('/requests', async (req, res) => {
  try {
    // Fetch all requests and populate the driver details
    const requests = await RequestModel.find()
      .populate('driverId', 'name email')  // Populate driver details
      .exec();

    // Return the requests with the user email and driver info
    res.status(200).json({
      requests: requests.map((request) => ({
        userEmail: request.userEmail,
        driver: {
          name: request.driverId.name,
          email: request.driverId.email,
        },
        address: request.address,
        status: request.status,
        createdAt: request.createdAt,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching requests', error: error.message });
  }
});


// Update User Information Route
app.put("/updateUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, address, phone } = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { name, email, address, phone },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ user: updatedUser, msg: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: "An error occurred", error });
  }
});


app.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find(); // Retrieve all users
    res.status(200).json({ users }); // Return an array of users
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ msg: 'An error occurred while fetching users.' });
  }
});



app.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ msg: 'User not found.' });
    }

    res.status(200).json({ msg: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ msg: 'An error occurred while deleting the user.' });
  }
});















app.post("/api/requests", async (req, res) => {
  try {
    const { userEmail, driverId, address } = req.body;

    if (!userEmail || !driverId || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRequest = new RequestModel({
      userEmail,
      driverId,
      address,
    });

    const savedRequest = await newRequest.save();
    res.status(201).json({ message: "Request sent successfully", data: savedRequest });
  } catch (error) {
    res.status(500).json({ message: "Error creating request", error: error.message });
  }
});

// Get all requests for a specific driver
app.get("/api/requests/driver/:driverId", async (req, res) => {
  try {
    const { driverId } = req.params;

    const requests = await RequestModel.find({ driverId });
    res.status(200).json({ message: "Requests retrieved successfully", data: requests });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving requests", error: error.message });
  }
});

// Update the status of a request (e.g., accepted, rejected)
app.patch("/api/requests/:requestId", async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    const updatedRequest = await RequestModel.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ message: "Request status updated", data: updatedRequest });
  } catch (error) {
    res.status(500).json({ message: "Error updating request", error: error.message });
  }
});











app.get("/api/requests/driver/:driverId", async (req, res) => {
  try {
    const { driverId } = req.params; // Get the driverId from the URL parameter

    // Find all requests for the specific driver
    const requests = await RequestModel.find({ driverId });

    if (requests.length > 0) {
      res.status(200).json({
        message: "Requests retrieved successfully",
        data: requests,
      });
    } else {
      res.status(404).json({
        message: `No requests found for driver with ID ${driverId}`,
        data: [],
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving requests",
      error: error.message,
    });
  }
});


