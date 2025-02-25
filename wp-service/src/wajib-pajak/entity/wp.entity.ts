import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class WajibPajak {
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