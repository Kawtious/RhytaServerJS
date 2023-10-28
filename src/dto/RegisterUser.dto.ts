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
import { Role } from '../enums/Role.enum';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
    @IsNotEmpty()
    @ApiProperty({
        name: 'username',
        description: 'The username of the User',
        nullable: false,
        type: String
    })
    username!: string;

    @IsEmail()
    @ApiProperty({
        name: 'email',
        description: 'The email of the User',
        nullable: false,
        type: String
    })
    email!: string;

    @IsNotEmpty()
    @ApiProperty({
        name: 'password',
        description: 'The password of the User',
        nullable: false,
        type: String
    })
    password!: string;

    @IsNotEmpty()
    @ApiProperty({
        name: 'roles',
        description: 'The roles of the User',
        nullable: false,
        type: [Role],
        enum: ['User', 'Professor', 'Admin']
    })
    roles!: Role[];
}