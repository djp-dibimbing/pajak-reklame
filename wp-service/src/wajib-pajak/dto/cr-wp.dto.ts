import { IsNumberString, Min, Max, IsNotEmpty} from "class-validator";

export class CreateWpDto {
    @IsNotEmpty()
    @IsNumberString()
    readonly npwp: string;

    @IsNotEmpty()
    readonly nama: string;

    @IsNotEmpty()
    readonly alamat: string;

    @IsNotEmpty()
    readonly jnsKelamin: string;

    @IsNotEmpty()
    readonly jnsWp: string;

    @IsNotEmpty()
    password: string;
}