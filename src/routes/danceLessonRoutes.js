const express = require('express')

const router = express.Router()

const { getAllDanceLessons, getDanceLessonsByStatus } = require('../controllers/DanceLessonController')

//api/v1/danceLessons
router.get('/', getAllDanceLessons)

//api/v1/danceLessons/:lessonsStatus
router.get('/:lessonsStatus', getDanceLessonsByStatus)

module.exports = router
