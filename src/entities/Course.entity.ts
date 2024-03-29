import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Relation,
    UpdateDateColumn,
    VersionColumn
} from 'typeorm';

import { Career } from './Career.entity';
import { Group } from './Group.entity';

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn()
    createdDate!: Date;

    @UpdateDateColumn()
    updatedDate!: Date;

    @VersionColumn()
    version!: number;

    @Column({
        nullable: false
    })
    courseKey!: string;

    @Column({
        nullable: false
    })
    classKey!: string;

    @Column({
        nullable: false
    })
    scheduleKey!: string;

    @Column({
        nullable: false
    })
    descriptionKey!: string;

    @ManyToOne(() => Career, (career) => career.courses, {
        nullable: false
    })
    @JoinColumn()
    career!: Relation<Career>;

    @OneToMany(() => Group, (group) => group.course, {
        cascade: true
    })
    groups!: Group[];
}
