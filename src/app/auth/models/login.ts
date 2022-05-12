export class Login {
    email: string;
    password: string;
    token: string;

    constructor(obj?: any) {

        if (!obj) {
            return;
        }

        this.email = obj.email;
        this.password = obj.password;
        this.token = obj.token;
    }
}
