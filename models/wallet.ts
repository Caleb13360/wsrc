export interface Wallet {
    id:number;
    wallet_balance: number;
    rp_balance: number; //racepoints
    transaction_date: Date;
    ref_num:string;
    type:string;
    status:boolean;
    trans_amount:number;
    
}

