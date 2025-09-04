import { IsNotEmpty, IsString } from "class-validator";

export class GetUIDto {
    @IsString()
    @IsNotEmpty()
    screenKey: string;
}


