import { IsNumberString, IsNotEmpty, IsOptional, IsNumber, IsPositive } from "class-validator";

export class CreateSptDto {
    @IsNotEmpty()
    readonly idSpt: string;

    @IsNotEmpty()
    readonly masaPajak: string;

    @IsNotEmpty()
    @IsNumber()
    readonly tahunPajak: number;

    @IsNotEmpty()
    readonly npwpPemotong: string;

    @IsOptional()
    readonly namaPemotong?: string;

    @IsNotEmpty()
    readonly npwpPenerima: string;

    @IsOptional()
    readonly namaPenerima?: string;

    @IsOptional()
    readonly alamatPenerima?: string;

    @IsOptional()
    readonly jabatanPenerima?: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly penghasilanSetahun?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly ptkp?: number;

    @IsOptional()
    @IsNumber()
    readonly pengurangan?: number;

    @IsOptional()
    @IsNumber()
    readonly netto?: number;

    @IsOptional()
    @IsNumber()
    readonly pph?: number;

    @IsOptional()
    readonly fileDokLampiran?: string;
}
