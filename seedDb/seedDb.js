require('dotenv').config()
const mongoose = require('mongoose')
// @ts-ignore
const springTermMockData = require('./mockdata/springTerm2023.js')
// @ts-ignore
const fallTermMockData = require('./mockdata/fallTerm2023.js')
const DanceLesson = require('../src/models/danceLesson')

const seedDanceSchoolMockDataDb = async (connectionString) => {
	let conn
	try {
		mongoose.set('strictQuery', false)
		conn = await mongoose.connect(connectionString)

		await DanceLesson.deleteMany()

		await DanceLesson.create(fallTermMockData.fallTerm)
		await DanceLesson.create(springTermMockData.springTerm)

		console.log(springTermMockData)
		console.log(fallTermMockData)
	} catch (error) {
		console.error(error)
	} finally {
		if (conn) conn.disconnect()
		process.exit(0)
	}
}

seedDanceSchoolMockDataDb(process.env.MONGO_URI)
