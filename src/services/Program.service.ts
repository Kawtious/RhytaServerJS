import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { ProgramInsertDto } from '../dto/ProgramInsert.dto';
import { ProgramUpdateDto } from '../dto/ProgramUpdate.dto';
import { Program } from '../entities/Program.entity';
import { ProgramType } from '../entities/ProgramType.entity';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { OptimisticLockingFailureError } from '../errors/OptimisticLockingFailureError';

@Injectable()
export class ProgramService {
    constructor(
        @InjectRepository(Program, 'mySqlConnection')
        private readonly programRepository: Repository<Program>,
        @InjectRepository(ProgramType, 'mySqlConnection')
        private readonly programTypeRepository: Repository<ProgramType>
    ) {}

    async getAll(): Promise<Program[]> {
        return await this.programRepository.find();
    }

    async getById(id: number): Promise<Program> {
        const program = await this.programRepository.findOneBy({ id: id });

        if (!program) {
            throw new EntityNotFoundError('Program not found');
        }

        return program;
    }

    async insert(programInsertDto: ProgramInsertDto): Promise<Program> {
        const program = new Program();

        program.typeKey = programInsertDto.typeKey;
        program.offsetKey = programInsertDto.offsetKey;

        const programType = await this.programTypeRepository.findOneBy({
            id: programInsertDto.programTypeId
        });

        if (!programType) {
            throw new EntityNotFoundError('ProgramType not found');
        }

        program.programType = programType;

        return await this.programRepository.save(program);
    }

    async update(
        id: number,
        programUpdateDto: ProgramUpdateDto
    ): Promise<Program> {
        const existingProgram = await this.programRepository.findOneBy({
            id: id
        });

        if (!existingProgram) {
            throw new EntityNotFoundError('Program not found');
        }

        if (programUpdateDto.version == null) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingProgram.version,
                -1
            );
        }

        if (programUpdateDto.version !== existingProgram.version) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingProgram.version,
                programUpdateDto.version
            );
        }

        if (programUpdateDto.typeKey != null) {
            existingProgram.typeKey = programUpdateDto.typeKey;
        }

        if (programUpdateDto.offsetKey != null) {
            existingProgram.offsetKey = programUpdateDto.offsetKey;
        }

        if (programUpdateDto.programTypeId != null) {
            const programType = await this.programTypeRepository.findOneBy({
                id: programUpdateDto.programTypeId
            });

            if (!programType) {
                throw new EntityNotFoundError('ProgramType not found');
            }

            existingProgram.programType = programType;
        }

        return await this.programRepository.save(existingProgram);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.programRepository.delete(id);
    }
}
