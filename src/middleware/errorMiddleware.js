exports.errorMiddleware = (error, req, res, next) => {
	console.log(error)

	const errorResponse = {
		statusCode: error.statusCode || 500,
		message: error.message,
	}

	if (error.name === 'CastError') {
		errorResponse.statusCode = 404
		errorResponse.message = 'The resource you are trying to access with the specified ID does not exist'
	}

	// prettier-ignore
	return res
		.status(errorResponse.statusCode)
		.json(errorResponse)
}
