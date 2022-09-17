const info = (...params) => {
    if(process.env.NODE_ENV !== 'test') console.log(params)
}
const error = (...params) => console.error(params)

const requestLogger = (req, res, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

module.exports = {info, error}