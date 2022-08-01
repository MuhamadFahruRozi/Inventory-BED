const express = require('express')
const router = express.Router();
const Sales = require('../models/Sales')
const upload = require('../utils/multer')

//createSales
router.post('/',upload.single() ,async (req, res) => {
    try {
        const slug = "SALE-"+Math.floor(Math.random() * 1000 + 1)
        +"-"+Math.floor(Math.random() * 1000 + 1)
        +"-"+Math.floor(Math.random() * 1000 + 1);
        const newSLS = new Sales({
            slug: slug,
            no_transaksi_jual: req.body.notrajul,
            id_barang: req.body.idbar,
            jumlah_dijual: req.body.jumjul,
            total_dijual: req.body.tojul,
            createdAt: new Date()
        })
        await newSLS.save()
        res.status(200).json(newSLS)
        // res.status(200).json('Sales Recorded!')
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/', async (req, res) => {
    try{
        const data = await Sales.aggregate([{
            $lookup: {
                from: 'data_barang',
                localField: 'id_barang',
                foreignField: 'id_barang',
                as: 'detail_barang'
            }
        }]).sort({
            createdAt: 'desc'
        })

        res.status(200).json(data)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;