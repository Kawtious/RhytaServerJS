/*
 * MIT License
 *
 * Copyright (c) 2023 Kawtious, Zeferito
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { IsDateAfter } from '../decorators/IsDateAfter.decorator';
import { IsDateBefore } from '../decorators/IsDateBefore.decorator';

export class ProfessorEventDto {
    @IsOptional()
    @IsNumber()
    @ApiProperty({
        name: 'version',
        description: 'The version of the resource',
        nullable: false,
        type: Number
    })
    version?: number;

    @IsNotEmpty()
    @ApiProperty({
        name: 'title',
        description: 'The title of the event',
        nullable: false,
        type: String
    })
    title!: string;

    @IsOptional()
    @ApiPropertyOptional({
        name: 'description',
        description: 'The description of the Event',
        nullable: true,
        type: String
    })
    description?: string;

    @IsDate()
    @IsDateBefore('endDate')
    @ApiProperty({
        name: 'startDate',
        description: 'The starting date of the Event',
        nullable: false,
        type: Date
    })
    @Type(() => Date)
    startDate!: Date;

    @IsDate()
    @IsDateAfter('startDate')
    @ApiProperty({
        name: 'endDate',
        description: 'The ending date of the Event',
        nullable: false,
        type: Date
    })
    @Type(() => Date)
    endDate!: Date;
}
