import { IsNotEmpty, IsString } from "class-validator";


export class GetFormDto {
    @IsString()
    @IsNotEmpty()
    formKey: string;
}
