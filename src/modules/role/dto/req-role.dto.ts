export namespace ReqRoleDTO {
    export class createRole {
        name: string
        description: string
    }
    export class updateRole {
        id: number
    }
    export class removeRole {
        id: number
    }
    export class findById {
        id: number
    }
    export class findName {
        name: string
    }
}