import { IsNumberString, Min, Max, IsNotEmpty} from "class-validator";


export class TransactionLogModel {
    id: String;
    activity: String;
    data: String;
    user: String;
}