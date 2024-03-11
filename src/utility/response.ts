export const httpStatus = require('http-status');

export function getResponse(status = 200, data: any = null, message: any = null, success: boolean = true) {
    const result: any = {
        status: status,
        message: message ? message.toString() : 'Request Success.',
        data: data !== null ? data : {},
        success: success
    };

    if (status >= 400) {
        result.success = false;
    }
    return result;
}

export function getErrorResponse(status = 500, message: any = null) {
    const result: any = {
        status: status,
        message: message ? message.toString() : 'Internal server error.',
        success: false
    };

    return result;
}
