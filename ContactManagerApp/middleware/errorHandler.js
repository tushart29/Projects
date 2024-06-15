const { CONSTANTS } = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case CONSTANTS.VALIDATION_ERROR:
            res.status(statusCode).json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case CONSTANTS.NOT_FOUND:
            res.status(statusCode).json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case CONSTANTS.UNAUTHORIZED:
            res.status(statusCode).json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case CONSTANTS.FORBIDDEN:
            res.status(statusCode).json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case CONSTANTS.SERVER_ERROR:
            res.status(statusCode).json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;

    }
};

module.exports = errorHandler;
