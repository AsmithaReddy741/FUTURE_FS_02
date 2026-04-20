const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/crm")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const LeadSchema = new mongoose.Schema({
  name: String,
  email: String,
  source: String,
  status: { type: String, default: "New" },
  notes: { type: String, default: "" }
});

const Lead = mongoose.model("Lead", LeadSchema);

// Routes

// Add Lead
app.post("/add", async (req, res) => {
  const lead = new Lead(req.body);
  await lead.save();
  res.send("Lead Added");
});

// Get Leads
app.get("/leads", async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
});

// Update Lead
app.put("/update/:id", async (req, res) => {
  await Lead.findByIdAndUpdate(req.params.id, req.body);
  res.send("Updated");
});

// Delete Lead
app.delete("/delete/:id", async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

// Server
app.listen(5000, () => console.log("Server running on port 5000"));