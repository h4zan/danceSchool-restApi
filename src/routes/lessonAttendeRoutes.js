const express = require('express')

const router = express.Router()

const {
	addAttendees,
	getAttendeById,
	getAllAttendees,
	updateAttende,
	deleteAttendeFromLesson,
} = require('../controllers/lessonAttendeController')

//api/v1/lessonAttendees/:lessonId
router.post('/:lessonId', addAttendees)

//api/v1/lessonAttendees/:attendeId
router.get('/:attendeId', getAttendeById)

//api/v1/lessonAttendees
router.get('/', getAllAttendees)

//api/v1/lessonAttendees/:attendeId
router.put('/:attendeId', updateAttende)

//api/v1/lessonAttendees/:attendeId/:lessonId
router.delete('/:attendeId/:lessonId', deleteAttendeFromLesson)

module.exports = router
