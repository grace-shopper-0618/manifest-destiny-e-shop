const router = require('express').Router()
const { Review, Product, User } = require('../db/models')
module.exports = router

//GET all reviews
router.get('/', async (req, res, next) => {
    try {
        const reviews = await Review.findAll()
        if (!reviews) {
            const err = new Error('Unable to find any reviews.')
            err.sendStatus(404)
        }
        res.status(200).json(reviews)
    } catch (err) {
        next(err)
    }
})

//GET reviews for a single user -- should we move this to the user routes???
router.get('/:userId', async (req, res, next) => {
    try {
        const userId = req.params.userId
        const reviews = await Review.findAll({
            where: {userId}
        })
        if (!reviews) {
            const err = new Error(`Unable to find any reviews by the user with ID ${userId}.`)
            err.sendStatus(404)
        }
        res.status(200).json(reviews)
    } catch (err) {
        next(err)
    }
})
