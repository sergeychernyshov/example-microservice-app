import { ApiProperty } from "@nestjs/swagger";
import {IsNumber, IsOptional, IsString, isString} from "class-validator";

export default class GetUserFilterDto{
    @ApiProperty({
        description: '',
        type: [String],
        required: false,
        example: ['*****-****-****-****-*******']
    })
    @IsOptional()
    @IsString({each: true, message: 'Поля в массиве "clientIds" должны быть строки'})
    readonly userIds?: string[];

    @ApiProperty({
        description: '',
        type: [String],
        required: false,
        example: ['79775002046']
    })
    @IsOptional()
    @IsString({each: true, message: 'Поля в массиве "userIds" должны быть строки'})
    readonly phones?: string[];

    @ApiProperty({
        description: '',
        type: Number,
        required: false,
        example: 20
    })
    @IsOptional()
    @IsNumber()
    readonly take?: number;

    @ApiProperty({
        description: '',
        type: Number,
        required: false,
        example: 20
    })
    @IsOptional()
    @IsNumber()
    readonly skip?: number;
}