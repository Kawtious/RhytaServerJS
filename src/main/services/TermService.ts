/*
 * MIT License
 * 
 * Copyright (c) 2023 Kawtious, Zeferito
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
 * NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import {Term} from '../models/Term';
import {DatabaseError} from "../errors/DatabaseError";

class TermService {
    async getAll(): Promise<Term[]> {
        try {
            return await Term.findAll();
        } catch (error: any) {
            throw new DatabaseError('Error fetching terms: ' + error.message);
        }
    }

    async getById(id: number): Promise<Term | null> {
        try {
            return await Term.findByPk(id);
        } catch (error: any) {
            throw new DatabaseError('Error fetching term by ID: ' + error.message);
        }
    }

    async insert(title: string, description: string, startDate: Date, endDate: Date): Promise<Term> {
        try {
            return await Term.create({
                title,
                description,
                startDate,
                endDate,
            });
        } catch (error: any) {
            throw new DatabaseError('Error inserting term: ' + error.message);
        }
    }

    async update(id: number, title: string, description: string, startDate: Date, endDate: Date): Promise<[number, Term[]]> {
        try {
            const [count, terms] = await Term.update(
                {
                    title,
                    description,
                    startDate,
                    endDate,
                },
                {
                    where: {id},
                    returning: true,
                }
            );
            return [count, terms];
        } catch (error: any) {
            throw new DatabaseError('Error updating term: ' + error.message);
        }
    }

    async delete(id: number): Promise<number> {
        try {
            return await Term.destroy({
                where: {id},
            });
        } catch (error: any) {
            throw new DatabaseError('Error deleting term: ' + error.message);
        }
    }
}

export default new TermService();
