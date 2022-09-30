const express = require('express');
const router = express.Router();
const User = require('../models/User')
const upload = require('../utils/multer')
const cloudinary = require('../utils/cloudinary')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

//newUser
router.post("/", upload.single('propic'), async (req, res) => {
    try{
        if(!req.file){
            const slug = "USER-"+Math.floor(Math.random() * 10000 + 1)    
                    +"-"+Math.floor(Math.random() * 10000 + 1)
                    +"-"+Math.floor(Math.random() * 10000 + 1);
            const user_id = "ID-USR-INV"+Math.floor(Math.random() * 10000 + 1)    
                    +"-"+Math.floor(Math.random() * 10000 + 1)
                    +"-"+Math.floor(Math.random() * 10000 + 1)
                    +"-"+Math.floor(Math.random() * 10000 + 1);
            const newUser = new User({
                slug: slug,
                user_id: user_id,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                status: req.body.status,
                pic_id: "",
                pic_url: "",
                createdAt: new Date(),
                updatedAt: new Date()
            });
            await newUser.save();
            res.status(200).json(newUser)
        } else {
            const slug = "USER-"+Math.floor(Math.random() * 10000 + 1)    
                    +"-"+Math.floor(Math.random() * 10000 + 1)
                    +"-"+Math.floor(Math.random() * 10000 + 1);
            const user_id = "ID-USR-INV"+Math.floor(Math.random() * 10000 + 1)    
                    +"-"+Math.floor(Math.random() * 10000 + 1)
                    +"-"+Math.floor(Math.random() * 10000 + 1)
                    +"-"+Math.floor(Math.random() * 10000 + 1);
            const uploadup = await cloudinary.uploader.upload(req.file.path);
            const newUser = new User({
                slug: slug,
                user_id: user_id,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                status: req.body.status,
                pic_id:uploadup.public_id,
                pic_url:uploadup.secure_url,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            await newUser.save();
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(500).json(err)
    }
})

//updateProfile
router.put('/:slug', upload.single('propic') ,async (req, res) => {
    try{
        if(!req.file){
            const updateUser = await User.findOneAndUpdate(
            { slug: req.params.slug },
            {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                status: req.body.status,
                updatedAt: new Date()
            })
            res.status(200).json(updateUser)
        }else{
            const uploadPic = await cloudinary.uploader.upload(req.file.path)
            const updateUser = await User.findOneAndUpdate(
            { slug: req.params.slug },
            {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                status: req.body.status,
                pic_url: uploadPic.secure_url,
                pic_id: uploadPic.public_id,
                updatedAt: new Date()
            })
            res.status(200).json(updateUser)
        }
    }catch(err){
        res.status(500).json(err)
    }
})

const generateAccessToken = (user) => {
    return jwt.sign({user_id: user.user_id ,username: user.username, status: user.status }
        , 'myKeyWryyyyyy', { expiresIn: '5s' } )
}

const generateRefreshToken = (user) => {
    return jwt.sign({user_id: user.user_id ,username: user.username, status: user.status }
        , 'myResfreshKeyWryyyyyy')
}

//loginAttemp
router.get('/tryLogin', upload.single(), async (req, res) => {
    try{
        const users = await User.find()
        let namePassLogin = []

        users.forEach(user => {
            const mew = jwt.sign({username: user.username, password: user.password}
                , 'myKeyLoginAttempWryyyyyy')
            namePassLogin.push(mew)    
        });
        
        res.status(200).json(namePassLogin)
        
        // res.status(200).json(namePassLogin)
    }catch(err){
        res.status(500).json(err)
    }
})

//login
router.post('/login', upload.single(), async (req, res) => {
    try{
        const {username, password} = req.body

        const user = await User.findOne({username, password})

        if (user) {
            const accessToken = generateAccessToken(user)
            const refreshToken = generateRefreshToken(user)
            refreshTokens.push(refreshToken)
            res.status(200).json({
                slug: user.slug,
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                pic_url: user.pic_url,
                status: user.status,
                accessToken,
                refreshToken
            })
        } else {
            res.status(400).json('Username or Password incorrect!')
        }

        // const salt = await bcrypt.genSalt(10)
        // const passby = await bcrypt.hash(user.password, salt)

        // if(user && password === user.password){
            // res.status(200).json(passby)
        // }else{
        //     res.status(200).json('user not found')
        // }
    }catch(err){
        res.status(500).json(err)
    }
})

let refreshTokens = []

router.post('/tokenRefresh', upload.single(), (req, res) => {
    const token = req.body.token

    if(!token) return res.status(401).json('You are not authenticated!')
    if(!refreshTokens.includes(token)) {
        return res.status(403).json('Refresh token is not valid!')
    }

    jwt.verify(token , 'myResfreshKeyWryyyyyy', (err, user)=> {
        err && console.log(err)
        refreshTokens = refreshTokens.filter((tok)=> tok !== token)

        const newAccessToken = generateAccessToken(user)
        const newRefreshToken = generateRefreshToken(user)

        refreshTokens.push(newRefreshToken)

        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        })
    })
})

const verify = (req, res, next) => {
    const authHeader = req.headers.authorization
    
    if(authHeader) {
        // const token = authHeader.split(' ')[1];

        //wrong in token, raw token authHeader is right
        jwt.verify(authHeader, 'myKeyWryyyyyy', (err, user) => {
            if(err) {
                return res.status(403).json('Token is not valid')
            }

            req.user = user;
            next()
        })
    } else {
        res.status(401).json('You are not auntheticated!')
    }
}


router.delete('/delete/:userId', upload.single(), async (req, res) => {
// router.delete('/delete/:userId', upload.single(), verify, async (req, res) => {
    try{
        if(req.params.user_id === req.params.userId || req.body.status === 'admin' ) {
        // if(req.user.user_id === req.params.userId || req.user.status === 'admin' ) {
            res.status(200).json('User has been deleted.')
        } else {
            res.status(403).json('You are not allowed to delete this user!')
        }
    }catch(err){
        res.status(500).json(err)
    }
})

router.post('/delete/:userId', upload.single(), async (req, res) => {
    // router.delete('/delete/:userId', upload.single(), verify, async (req, res) => {
        try{
            if(req.params.user_id === req.params.userId || req.body.status === 'admin' ) {
            // if(req.user.user_id === req.params.userId || req.user.status === 'admin' ) {
                res.status(200).json('User has been deleted.')
            } else {
                res.status(403).json('You are not allowed to delete this user!')
            }
        }catch(err){
            res.status(500).json(err)
        }
    })

//logout
router.post('/logout', upload.single(), verify, async (req, res) => {
    try{
        const refreshToken = req.body.token
        refreshTokens = refreshTokens.filter((tok) => tok !== refreshToken )
        res.status(200).json('User logged out successfully.')
    }catch(err){
        res.status(500).json(err)
    }
})

//userData
// router.get('/profile/:slug', upload.single() , async (req, res) => {
//     try{
//         const user = await User.findOne({ slug: req.params.slug})
//         res.status(200).json(user)
//     }catch(err){
//         res.status(500).json(err)
//     }
// })

// userData
router.get('/profile/:slug', upload.single() , async (req, res) => {
    try{
        const user = await User.findOne({ slug: req.params.slug})
        if (user) {
            const accessToken = generateAccessToken(user)
            const refreshToken = generateRefreshToken(user)
            refreshTokens.push(refreshToken)
            res.status(200).json({
                slug: user.slug,
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                pic_url: user.pic_url,
                status: user.status,
                accessToken,
                refreshToken
            })
        } else {
            res.status(400).json('Request Rejected!')
        }
        // res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
})

//getAll
router.get('/', async (req, res) => {
    try{
        const users = await User.find()
        res.status(200).json(users)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;