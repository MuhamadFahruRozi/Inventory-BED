const mongoose = require('mongoose')

const DataBarangSchema = new mongoose.Schema({
    slug:{
        type: String,
        required: true,
        unique: true
    },
    id_barang:{
        type: String,
        required: true,
        unique: true
    },
    nama_barang:{
        type: String,
        required: true,
    },
    harga_beli:{
        type: Number,
        required: true,
    },
    harga_jual:{
        type: Number,
        required: true,
    },
    jumlah_dibeli:{
        type: Number,
        required: true,
    },
    total_dibeli_seluruh:{
        type: Number,
        required: true,
    },
    jumlah_dijual:{
        type: Number,
        required: true,
    },
    total_dijual_seluruh:{
        type: Number,
        required: true,
    },
    createdAt:{
        type:Date,
        required: true,
    },
    createdAt:{
        type:Date,
        required: true,
    },
    updatedAt:{
        type:Date,
        required:false,
    }
},{timestamp:true}
)

module.exports = mongoose.model('data_barang', DataBarangSchema, 'data_barang')