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
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Roles } from '../decorators/Roles.decorator';
import { Role } from '../enums/Role.enum';

@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
export class UserController {
    constructor() {}

    @Get('validate')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.User)
    @ApiOperation({
        summary: 'Validate user',
        description:
            'Checks if the user trying to access this endpoint is valid.'
    })
    @ApiResponse({ status: HttpStatus.OK, description: 'User is valid' })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'User is not valid and must reauthenticate'
    })
    async validate(): Promise<boolean> {
        return true;
    }
}
