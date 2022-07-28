const express = require('express');
const router = express.Router();
const Barang = require('../models/DataBarang')
const upload = require('../utils/multer')

//createBarang
router.post('/',upload.single() ,async (req, res) => {
    try {
        const slug = "BRG-"+Math.floor(Math.random() * 1000 + 1)
        +"-"+Math.floor(Math.random() * 1000 + 1)
        +"-"+Math.floor(Math.random() * 1000 + 1);
        const newBRG = new Barang({
            slug: slug,
            id_barang: req.body.idbar,
            nama_barang: req.body.nambar,
            harga_beli: req.body.harbel,
            harga_jual: req.body.harjul,
            jumlah_dibeli: 0,
            total_dibeli_seluruh: 0,
            jumlah_dijual: 0,
            total_dijual_seluruh: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        await newBRG.save();
        res.status(200).json('New Item Added!')
    }catch(err){
        res.status(500).json(err)
    }
})

//updateItemAfterRestock
router.put('/restock/:idbar', upload.single(), async (req, res) => {
    try{
        const data = await Barang.findOne({ id_barang: req.params.idbar })
        const updatedBarang = await Barang.findOneAndUpdate(
            {id_barang: req.params.idbar},
            {
                jumlah_dibeli: Math.floor( data.jumlah_dibeli*1 + req.body.jumbel*1),
                total_dibeli_seluruh: Math.round( data.total_dibeli_seluruh*100 + req.body.tobel*100)/100,
                updatedAt: new Date()
            },
            {new: true}
            );
        res.status(200).json(updatedBarang)
        // res.status(200).json("Inventory Restock Recorded!")
        // res.status(200).json(data.jumlah_dibeli)
    }catch(err){
        res.status(500).json(err)
    }
})

//updateItemAfterSales
router.put('/sales/:idbar', upload.single(), async (req, res) => {
    try{
        const data = await Barang.findOne({ id_barang: req.params.idbar })
        const updatedBarang = await Barang.findOneAndUpdate(
            {id_barang: req.params.idbar},
            {
                jumlah_dijual: Math.floor( data.jumlah_dijual*1 + req.body.jumjul*1),
                total_dijual_seluruh: Math.round( data.total_dijual_seluruh*100 + req.body.tojul*100)/100,
                updatedAt: new Date()
            },
            {new: true}
            );

        res.status(200).json(updatedBarang)
        // res.status(200).json("Inventory Sales Recorded!")
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/', async (req, res) => {
    try {
        const getBRG = await Barang.find()
        res.status(200).json(getBRG)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;