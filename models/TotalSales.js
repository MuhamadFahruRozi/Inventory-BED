const mongoose = require('mongoose')

const TotalSalesSchema = new mongoose.Schema({
    slug:{
        type: String,
        required: true,
        unique: true
    },
    no_transaksi_jual:{
        type: String,
        required: true,
        unique: true
    },
    total_terjual:{
        type: Number,
        required: true,
    },
    createdAt:{
        type:Date,
        required: true,
    }
},{timestamp:true}
)

module.exports = mongoose.model('total_sales', TotalSalesSchema, 'total_sales')