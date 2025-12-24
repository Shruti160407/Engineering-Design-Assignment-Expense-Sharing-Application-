const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect("mongodb+srv://shrutichourasia1607:expense1616@expensemanager.hzfp7dg.mongodb.net/?appName=expenseManager");
        console.log("MongoDB Atlas Connected");
    }catch(error){
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;