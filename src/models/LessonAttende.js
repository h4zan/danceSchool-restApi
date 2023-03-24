const mongoose = require('mongoose')
const { attendePaymentStatus, attendeRole } = require('../constants/attende')

const LessonAttendeSchema = new mongoose.Schema(
	{
		attendeName: {
			type: String,
		},

		attendeContactInfo: {
			type: String,
		},

		attendeePaymentStatus: {
			type: String,
			enum: Object.values(attendePaymentStatus),
			default: attendePaymentStatus.PENDING,
		},

		attendeRoles: {
			type: String,
			enum: Object.values(attendeRole),
		},

		lessonId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'lessonId',
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('LessonAttende', LessonAttendeSchema)
