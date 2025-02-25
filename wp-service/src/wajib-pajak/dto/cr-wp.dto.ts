import { IsNumberString, Min, Max, IsNotEmpty} from "class-validator";

export class CreateWpDto {
    @IsNotEmpty()
    @IsNumberString()
    @Max(16)
    @Min(16)
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