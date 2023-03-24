const DanceLesson = require('../models/danceLesson')
const { NotFoundError, BadRequestError } = require('../utils/errors')
const { lessonStatus } = require('../../src/constants/lesson')

exports.getAllDanceLessons = async (req, res) => {
	try {
		const danceLessons = await DanceLesson.find()
		if (!danceLessons) throw new NotFoundError('Could not find any dance lessons')
		return res.json(danceLessons)
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error: 'Server error' })
	}
}

exports.getDanceLessonsByStatus = async (req, res) => {
	const status = req.params.lessonsStatus

	try {
		let danceLessons = []

		if (status === 'ACTIVE') {
			danceLessons = await DanceLesson.find({ lessonStatus: 'ACTIVE' })
		} else if (status === 'INACTIVE') {
			danceLessons = await DanceLesson.find({ lessonStatus: 'INACTIVE' })
		} else {
			return res.status(400).json({ message: 'Invalid lesson status' })
		}

		res.status(200).json(danceLessons)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Could not find any lessons' })
	}
}
