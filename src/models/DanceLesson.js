const mongoose = require('mongoose')
const { lessonStatus } = require('../constants/lesson')

const DanceLessonSchema = new mongoose.Schema(
	{
		lessonName: {
			type: String,
			required: true,
		},

		danceGenre: {
			type: String,
		},

		startDate: {
			type: String,
			required: true,
		},

		endDate: {
			type: String,
			required: true,
		},

		lessonTime: {
			type: String,
		},

		lessonDuration: {
			type: String,
		},

		lessonFee: {
			type: Number,
		},

		lessonLeads: [
			{
				type: String,
			},
		],

		lessonStatus: [
			{
				type: String,
				enum: Object.values(lessonStatus),
			},
		],
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('DanceLesson', DanceLessonSchema)
