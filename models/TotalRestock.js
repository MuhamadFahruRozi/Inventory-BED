const mongoose = require('mongoose')

const TotalRestockSchema = new mongoose.Schema({
    slug:{
        type: String,
        required: true,
        unique: true
    },
    no_transaksi_beli:{
        type: String,
        required: true,
        unique: true
    },
    total_dibeli:{
        type: Number,
        required: true,
    },
    createdAt:{
        type:Date,
        required: true,
    }
},{timestamp:true}
)

module.exports = mongoose.model('total_testock', TotalRestockSchema, 'total_restock')