export interface Wallet {
    id:number;
    wallet_balance: number;
    rp_balance: number; //racepoints
    races_until_free_race: number;
    transaction_date: Date;
    ref_num:string;
    type:string;
    status:boolean;
    trans_amount:number;
}

