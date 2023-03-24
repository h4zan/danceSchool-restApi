const path = require('path')
const { NotFoundError } = require('../utils/errors')

exports.notFoundMiddleware = (req, res) => {
	const apiPath = req.path.startsWith('/api/')

	if (apiPath) throw new NotFoundError('The requested endpoint is not available')

	return res.status(404).sendFile(path.join(__dirname, '../views/notFound.html'))
}
