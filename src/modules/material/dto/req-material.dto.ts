export namespace ReqMaterial {
    export class Create {
        code: string;
        name: string;
        unit?: string;
        manufacturer?: string;
        countryOfOrigin?: string;
        content?: string;
        unitPrice?: number;
        healthInsurance?: string;
        groupCode?: string;
        categoryCode?: string;
    }
    export class Update {
        id: number
    }
    export class GetById {
        id: number
    }
    export class GetByName {
        name: string
    }
    export class Delete {
        id: number
    }
}