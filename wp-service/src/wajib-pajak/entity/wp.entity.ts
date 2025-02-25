import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('wp')
export class WajibPajakEntity {
    @Column({ primary: true })
    npwp: string;

    @Column()
    nama: string;

    @Column()
    alamat: string;

    @Column()
    jnsKelamin: string;

    @Column()
    jnsWp: string;

    @Column()
    password: string;
}