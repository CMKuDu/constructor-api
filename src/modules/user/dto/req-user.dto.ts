import { Expose } from "class-transformer"


export namespace ReqUser {
    export class createUser {
        userName: string
        email: string
        password: string
        firstName: string
        lastName: string
        @Expose()
        roleId: number
    }
    export class findById {
        id: number
    }
    export class findByEmail {
        email: string
    }
    export class updateUser {
        id: number

    }
    export class deleteUser {
        id: number
    }
    // static CreateUser = class {

    // }
    // static FindById = class {
    //     id: number;
    // };

    // static FindByEmail = class {
    //     email: string;
    // };
}