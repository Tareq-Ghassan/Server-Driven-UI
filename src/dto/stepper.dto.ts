import { IsNotEmpty, IsNumber, Min } from "class-validator";


export class SetStepperDto {
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    numberOfSteppes: number;
}
