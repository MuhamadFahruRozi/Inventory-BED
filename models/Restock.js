const mongoose = require('mongoose')

const RestockSchema = new mongoose.Schema({
    slug:{
        type: String,
        required: true,
        unique: true
    },
    no_transaksi_beli:{
        type: String,
        required: true,
    },
    id_barang:{
        type: String,
        required: true,
    },
    jumlah_dibeli:{
        type: Number,
        required: true,
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

module.exports = mongoose.model('restock', RestockSchema, 'restock')