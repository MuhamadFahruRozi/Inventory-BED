const express = require('express')
const router = express.Router();
const Restock = require('../models/Restock')
const upload = require('../utils/multer')

//createRestock
router.post('/',upload.single() ,async (req, res) => {
    try {
        const slug = "PURC-"+Math.floor(Math.random() * 1000 + 1)
        +"-"+Math.floor(Math.random() * 1000 + 1)
        +"-"+Math.floor(Math.random() * 1000 + 1);
        const newRS = new Restock({
            slug: slug,
            no_transaksi_beli: req.body.notrabel,
            id_barang: req.body.idbar,
            jumlah_dibeli: req.body.jumbel,
            total_dibeli: req.body.tobel,
            createdAt: new Date()
        })
        await newRS.save()
        res.status(200).json('Purchase Recorded!')
    }catch(err){
        res.status(500).json(err)
    }
})


//getAll
router.get('/', async (req, res) => {
    try{
        const data = await Restock.aggregate([{
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