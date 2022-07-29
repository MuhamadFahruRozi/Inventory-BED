require('dotenv').config();
const express = require('express');
const app = express();
const barangRoutes = require('./routes/dataBarang')
const restockRoutes = require('./routes/restock')
const inventoryRoutes = require('./routes/stok')
const salesRoutes = require('./routes/sales')
const totalRoutes = require('./routes/totalPerTransaksi')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose');
const PORT = 8000;

//connect MongoDB
mongoose.connect("mongodb://mufaro:mewmewnyaa11@portofolio-shard-00-00.txfzk.mongodb.net:27017,portofolio-shard-00-01.txfzk.mongodb.net:27017,portofolio-shard-00-02.txfzk.mongodb.net:27017/invent?ssl=true&replicaSet=atlas-6836hm-shard-0&authSource=admin&retryWrites=true&w=majority").then(() => {
    console.log('conn MongoDB');
}).catch((error) => {
    console.log(error);
});

app.use(express.json())
const cors = require("cors");
app.use(cors({origin: true, credentials: true}));

app.listen(PORT || 8000, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`)
});

//Routes
app.use("/api/barang", barangRoutes);
app.use("/api/restock", restockRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/total", totalRoutes);
app.use("/api/user", userRoutes);
