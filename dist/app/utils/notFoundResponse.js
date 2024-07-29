"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFoundResponse = (res) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'No Data Found',
        data: [],
    });
};
exports.default = notFoundResponse;
