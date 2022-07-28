const mongoose = require('mongoose')

const SalesSchema = new mongoose.Schema({
    slug:{
        type: String,
        required: true,
        unique: true
    },
    no_transaksi_jual:{
        type: String,
        required: true,
    },
    id_barang:{
        type: String,
        // type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    jumlah_dijual:{
        type: Number,
        required: true,
    },
    total_dijual:{
        type: Number,
        required: true,
    },
    createdAt:{
        type:Date,
        required: true,
    }
},{timestamp:true}
)

module.exports = mongoose.model('sales', SalesSchema, 'sales')