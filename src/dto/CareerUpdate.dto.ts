import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CareerUpdateDto {
    @IsNumber()
    version!: number;

    @IsOptional()
    @IsNotEmpty()
    careerKey?: string;

    @IsOptional()
    @IsNotEmpty()
    subjectKey?: string;

    @IsOptional()
    @IsNumber()
    pathStartKey?: number;

    @IsOptional()
    @IsNumber()
    pathEndKey?: number;
}
