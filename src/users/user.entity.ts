import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, } from 'typeorm';
@Entity()
    export class User{
        @PrimaryGeneratedColumn()
        @ApiProperty({ type: Number })
         id: number;
        
        @Column()
        @ApiProperty({ type: String })
        name: string;

        @Column()
        @ApiProperty({ type: String })
        email: string;

        @Column()
        @ApiProperty({ type: String })
        password: string;
        
        @Column()
        @ApiPropertyOptional({ type: Number})
        age?: number;

        // @UpdateDateColumn()
        @CreateDateColumn()
        @ApiProperty({ type: String, format: 'date-time' })
        date: Date;
        

// @CreateDateColumn({ name: 'created_at'})
// createdAt: Date;

// @UpdateDateColumn({ name: 'updated_at' })
// updatedAt: Date;

// @DeleteDateColumn({ name: 'deleted_at' })
// deletedAt: Date;
    } 