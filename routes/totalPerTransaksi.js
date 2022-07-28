const express = require('express');
const router = express.Router();
const TotalBeli = require('../models/TotalRestock')
const TotalJual = require('../models/TotalSales')
const upload = require('../utils/multer')

//createTotalPerRestock
router.post('/restock',upload.single() ,async (req, res) => {
    try {
        const slug = "TOTAL-PURCHASE-"+Math.floor(Math.random() * 1000 + 1)
        +"-"+Math.floor(Math.random() * 1000 + 1)
        +"-"+Math.floor(Math.random() * 1000 + 1);
        const newTotalBeli = new TotalBeli({
            slug: slug,
            no_transaksi_beli: req.body.notrabel,
            total_dibeli: req.body.tobelall,
            createdAt: new Date()
        });
        await newTotalBeli.save();
        res.status(200).json(newTotalBeli)
        // res.status(200).json('Total Buy Recorded!')
    }catch(err){
        res.status(500).json(err)
    }
})

//createTotalPerSales
router.post('/sales',upload.single() ,async (req, res) => {
    try {
        const slug = "TOTAL-SALES-"+Math.floor(Math.random() * 1000 + 1)
        +"-"+Math.floor(Math.random() * 1000 + 1)
        +"-"+Math.floor(Math.random() * 1000 + 1);
        const newTotalJual = new TotalJual({
            slug: slug,
            no_transaksi_jual: req.body.notrajul,
            total_terjual: req.body.tojulall,
            createdAt: new Date()
        });
        await newTotalJual.save();
        res.status(200).json(newTotalJual)
        // res.status(200).json('Total Sales Recorded!')
    }catch(err){
        res.status(500).json(err)
    }
})

//getAll
router.get('/', async (req, res) => {
    try{
        const dataTotalBuy = await TotalBeli.find()
        const dataTotalSales = await TotalJual.find()
        res.status(200).json({dataTotalBuy, dataTotalSales})
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;