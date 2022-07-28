const mongoose = require('mongoose')

const StokSchema = new mongoose.Schema({
    slug:{
        type: String,
        required: true,
        unique: true
    },
    id_barang:{
        type: String,
        required: true,
    },
    jumlah_barang:{
        type: Number,
        required: true,
    },
    total_harga_stok:{
        type: Number,
        required: true,
    },
    total_potensi_jual:{
        type: Number,
        required: true,
    },
    createdAt:{
        type:Date,
        required: true,
    },
    updatedAt:{
        type:Date,
        required: true,
    }
},{timestamp:true}
)

module.exports = mongoose.model('stok', StokSchema, 'stok')