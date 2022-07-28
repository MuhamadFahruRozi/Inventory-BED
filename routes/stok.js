const express = require('express')
const router = express.Router();
const upload = require('../utils/multer')
const Stok = require('../models/Stok')
const Barang = require('../models/DataBarang')

//create
router.post('/', upload.single() ,async (req, res) => {
    try{
        const slug = "INVENTORY-"+Math.floor(Math.random() * 1000 + 1)
        +"-"+Math.floor(Math.random() * 1000 + 1)
        +"-"+Math.floor(Math.random() * 1000 + 1);
        const newStok = new Stok({
            slug: slug,
            id_barang: req.body.idbar,
            jumlah_barang: 0,
            total_harga_stok: 0,
            total_potensi_jual: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        newStok.save()
        res.status(200).json(newStok)
    }catch(err){
        res.status(500).json(err)
    }
})

//updateInventoryAfterRestock
router.put('/restock/:idbar', upload.single() ,async (req, res) => {
    try{
        const data = await Stok.findOne({ id_barang : req.params.idbar })
        const updateStok = await Stok.findOneAndUpdate(
            { id_barang: req.params.idbar },
            {
                jumlah_barang: Math.floor(data.jumlah_barang*1 + req.body.jumbel*1),
                total_harga_stok: Math.round(data.total_harga_stok*100 + req.body.tobel*100)/100,
                total_potensi_jual: Math.round(data.total_potensi_jual*100 + req.body.tojul*100)/100,
                updatedAt: new Date()
            })
        res.status(200).json(updateStok)
    }catch(err){
        res.status(500).json(err)
    }
})

//updateInventoryAfterSales
router.put('/sales/:idbar', upload.single() ,async (req, res) => {
    try{
        const data = await Stok.findOne({ id_barang : req.params.idbar })
        const updateStok = await Stok.findOneAndUpdate(
            { id_barang : req.params.idbar },
            {
                jumlah_barang: Math.floor(data.jumlah_barang*1 - req.body.jumjul*1),
                total_harga_stok: Math.round(data.total_harga_stok*100 - req.body.tobel*100)/100,
                total_potensi_jual: Math.round(data.total_potensi_jual*100 - req.body.tojul*100)/100,
                updatedAt: new Date()
            })
        res.status(200).json(updateStok)
    }catch(err){
        res.status(500).json(err)
    }
})

//getStok
router.get('/', async (req, res) => {
    try{
        // const dataStok = await Stok.find()
        // const dataBarang = await Barang.find()

        const stok = await Stok.aggregate([{
            $lookup: {
                from: 'data_barang',
                localField: 'id_barang',
                foreignField: 'id_barang',
                as: 'Stok_Barang'
            }
        }])

        res.status(200).json(stok)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;