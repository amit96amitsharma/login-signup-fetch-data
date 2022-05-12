export class Register {
    email: string;
    password: string;

    constructor(obj?: any) {

        if (!obj) {
            return;
        }

        this.email = obj.email;
        this.password = obj.password;
    }
}
