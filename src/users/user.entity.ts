import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, } from 'typeorm';
import { IsEmail, MinLength, IsAlpha, IsStrongPassword,  } from 'class-validator';
@Entity()
    export class User{
        @PrimaryGeneratedColumn()
        @ApiProperty({ type: Number })
         id: number;
        
        @Column()
        @ApiProperty({ type: String })
        @IsAlpha()
        name: string;

        @Column()
        @ApiProperty({ type: String })
        @IsEmail()
        email: string;

        @Column()
        @ApiProperty({ type: String })
        @MinLength(4)
        // @IsStrongPassword()
        password: string;
        
        @Column()
        @ApiPropertyOptional({ type: Number})
        age?: number;

        // @UpdateDateColumn()
        @CreateDateColumn()
        @ApiProperty({ type: String, format: 'date-time' })
        date: Date;

// resereved tags for later use

// @CreateDateColumn({ name: 'created_at'})
// createdAt: Date;

// @UpdateDateColumn({ name: 'updated_at' })
// updatedAt: Date;

// @DeleteDateColumn({ name: 'deleted_at' })
// deletedAt: Date;

    } 