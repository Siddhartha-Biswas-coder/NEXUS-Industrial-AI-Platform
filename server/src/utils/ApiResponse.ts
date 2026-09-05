class ApiResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
    constructor(statusCode: number, data: T, message: string = "success") {
        this.statusCode = statusCode;
        this.success = true;
        this.message = message;
        this.data = data;
    }
}

export default ApiResponse