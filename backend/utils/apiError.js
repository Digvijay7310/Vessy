class apiError extends error {
    constructor(statusCode, message="something went wrong"){
        super(message);
        this.statusCode =statusCode;
        this.success = false;
    }
}

export default apiError