export namespace ReqBidItem {
    export class Create {
        bidId: number;
        materialId: number;
        orderNumber: number;
        biddingProductName: string;
        biddingUnit: string;
        quantity: number;
        bidPrice: number;
        totalAmount: number;
        manufacturer?: string;
        countryOfOrigin?: string;
        notes?: string;
    }
    export class GetById {
        id: number
    }
    export class GetByName {
        name: string
    }
    export class Update {
        id: number
    }
    export class Remove {
        id: number
    }

}