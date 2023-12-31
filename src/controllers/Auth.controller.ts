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
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';

import { JwtAuthResponseDto } from '../dto/JwtAuthResponse.dto';
import { LoginRequestDto } from '../dto/LoginRequest.dto';
import { RegisterUserDto } from '../dto/RegisterUser.dto';
import { AuthService } from '../services/Auth.service';

@ApiTags('Authentication')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Register a new user',
        description: 'Register a new user with the provided data.'
    })
    @ApiConsumes('application/json')
    @ApiBody({ type: RegisterUserDto })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'User registered successfully'
    })
    @ApiResponse({
        status: HttpStatus.CONFLICT,
        description: 'A user already exists with the same username or email'
    })
    async register(@Body() registerUserDto: RegisterUserDto) {
        return await this.authService.register(registerUserDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'User login',
        description: 'Authenticate a user by providing valid credentials.'
    })
    @ApiConsumes('application/json')
    @ApiBody({ type: LoginRequestDto })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'User authenticated successfully'
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'User not found'
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid credentials'
    })
    async login(@Body() loginRequest: LoginRequestDto) {
        const token = await this.authService.login(loginRequest);

        return {
            accessToken: token,
            tokenType: 'Bearer'
        } as JwtAuthResponseDto;
    }
}
