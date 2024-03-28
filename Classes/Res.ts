class Res {
    status?: number;
    message: string;

    constructor(message: string, status?: number) {
        if (status) {
            this.status = status;
        }
        this.message = message;
    }
}

export default Res;