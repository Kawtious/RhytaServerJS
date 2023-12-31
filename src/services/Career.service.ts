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
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { CareerDto } from '../dto/Career.dto';
import { Career } from '../entities/Career.entity';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { OptimisticLockingFailureError } from '../errors/OptimisticLockingFailureError';

@Injectable()
export class CareerService {
    constructor(
        @InjectRepository(Career, 'mySqlConnection')
        private readonly careerRepository: Repository<Career>
    ) {}

    async getAll(): Promise<Career[]> {
        return await this.careerRepository.find();
    }

    async getById(id: number): Promise<Career> {
        const career = await this.careerRepository.findOneBy({ id: id });

        if (!career) {
            throw new EntityNotFoundError('Career not found');
        }

        return career;
    }

    async insert(careerDto: CareerDto): Promise<Career> {
        const career = new Career();

        career.name = careerDto.name;

        if (careerDto.description != null) {
            career.description = careerDto.description;
        }

        return await this.careerRepository.save(career);
    }

    async update(id: number, careerDto: CareerDto): Promise<Career> {
        const existingCareer = await this.careerRepository.findOneBy({
            id: id
        });

        if (!existingCareer) {
            throw new EntityNotFoundError('Career not found');
        }

        if (careerDto.version == null) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingCareer.version,
                -1
            );
        }

        if (careerDto.version !== existingCareer.version) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingCareer.version,
                careerDto.version
            );
        }

        existingCareer.name = careerDto.name;

        if (careerDto.description != null) {
            existingCareer.description = careerDto.description;
        }

        return await this.careerRepository.save(existingCareer);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.careerRepository.delete(id);
    }
}
