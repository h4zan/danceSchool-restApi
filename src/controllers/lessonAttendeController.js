const LessonAttende = require('../models/LessonAttende')
const { NotFoundError, BadRequestError } = require('../utils/errors')
const { attendePaymentStatus, attendeRole } = require('../constants/attende')
const DanceLesson = require('../models/danceLesson')

exports.addAttendees = async (req, res) => {
	const { attendeName, attendeContactInfo, attendeePaymentStatus, attendeRoles } = req.body

	try {
		if (!attendeName || !attendeContactInfo || !attendeRoles) {
			throw new BadRequestError('You must provide a name, contact information and choose a role')
		}
		const lessonId = req.params.lessonId

		const attendeeCount = await LessonAttende.countDocuments({ lessonId })
		if (attendeeCount >= 20) {
			return res.status(400).json({ error: 'Lesson is full' })
		}

		const leadCount = await LessonAttende.countDocuments({
			lessonId,
			attendeRoles: attendeRole.LEAD,
		})
		const followerCount = await LessonAttende.countDocuments({
			lessonId,
			attendeRoles: attendeRole.FOLLOWER,
		})

		if (!attendeRoles) {
			return res.status(400).json({ error: 'You need to add a attende' })
		}

		if (attendeRoles !== attendeRole.LEAD && attendeRoles !== attendeRole.FOLLOWER) {
			return res.status(400).json({ error: 'Attende role is invalid' })
		}

		if (attendeRoles === attendeRole.LEAD && leadCount >= 10) {
			return res.status(400).json({ error: 'Can not add more lead attendees' })
		}

		if (attendeRoles === attendeRole.FOLLOWER && followerCount >= 10) {
			return res.status(400).json({ error: 'Cann ot add more follower attendees' })
		}

		if (leadCount >= 10 && followerCount >= 10) {
			return res.status(400).json({ error: 'Can not add more attendees' })
		}

		const newAttendee = await LessonAttende.create({
			attendeName: attendeName,
			attendeContactInfo: attendeContactInfo,
			attendeePaymentStatus: attendeePaymentStatus.PENDING,
			attendeRoles: attendeRoles,
			lessonId: lessonId,
		})

		const savedAttendee = await newAttendee.save()

		return res.status(201).json(savedAttendee)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Server error' })
	}
}

exports.getAttendeById = async (req, res) => {
	try {
		const attendeID = req.params.attendeId
		const attende = await LessonAttende.findById(attendeID)
		if (!attende) throw new NotFoundError('That attendee does not exist')
		return res.json(attende)
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error: 'Server error' })
	}
}

exports.getAllAttendees = async (req, res) => {
	try {
		const allLessonAttendees = await LessonAttende.find()

		if (!allLessonAttendees) {
			throw new NotFoundError('Could not found any attendees')
		}
		return res.json(allLessonAttendees)
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error: 'Server error' })
	}
}

exports.updateAttende = async (req, res) => {
	try {
		const newContactInfo = req.body.attendeContactInfo
		const newPaymentStatus = req.body.attendeePaymentStatus
		const newRole = req.body.attendeRoles
		const newLesson = req.body.lessonId

		const attendeId = req.params.attendeId
		const attende = await LessonAttende.findById(attendeId)
		if (!attende) throw new Error('Attende not found')

		if (newContactInfo) attende.attendeContactInfo = newContactInfo
		if (newPaymentStatus) attende.attendeePaymentStatus = newPaymentStatus
		if (newRole) attende.attendeRoles = newRole
		if (newLesson) attende.lessonId = newLesson

		const updateAttende = await attende.save()
		return res.status(200).json(updateAttende)
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error: 'Server error' })
	}
}

exports.deleteAttendeFromLesson = async (req, res) => {
	try {
		const lessonId = req.params.lessonId
		const lesson = await DanceLesson.findById(lessonId)
		if (!lesson) throw new Error('Lesson not found')

		const attendeId = req.params.attendeId
		const attende = await LessonAttende.findById(attendeId)
		if (!attende) throw new Error('Attende not found')

		await attende.delete()
		return res.status(200).json({ message: 'Attende deleted successfully' })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error: 'Server error' })
	}
}
