export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    constructor(obj?: any) {

        if (!obj) {
            return;
        }

        this.id = obj.id;
        this.email = obj.email;
        this.firstName = obj.first_name;
        this.lastName = obj.last_name;
    }
}
