/**
 * Advanced Employee Management System - Backend API
 * Industry Standard Professional Code
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection Configuration
// Note: 'mongo-service' is the DNS name we will define in Kubernetes
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo-service:27017/employee_db';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log(' Success: Connected to MongoDB Database'))
.catch(err => {
    console.error(' Critical Error: Database connection failed!');
    console.error(err);
    process.exit(1); // Exit process if DB fails
});

// Employee Data Model
const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    department: { type: String, default: 'General' },
    createdAt: { type: Date, default: Date.now }
});

const Employee = mongoose.model('Employee', EmployeeSchema);

// API Endpoints
// Health Check (Very important for Kubernetes Liveness Probes)
app.get('/health', (req, res) => {
    res.status(200).send('API is Healthy');
});

// GET: Fetch all employees
app.get('/api/employees', async (req, res) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching records', error });
    }
});

// POST: Add new employee
app.post('/api/employees', async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (error) {
        res.status(400).json({ message: 'Error saving employee data', error });
    }
});

app.listen(PORT, () => {
    console.log(` Production Server is running on port ${PORT}`);
});