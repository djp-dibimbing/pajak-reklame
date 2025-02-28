import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('wp')
export class WajibPajakEntity {
    @Column({ primary: true })
    npwp: string;

    @Column()
    nama: string;

    @Column()
    alamat: string;

    @Column({ name: 'jns_kelamin'})
    jnsKelamin: string;

    @Column({ name: 'jns_wp' })
    jnsWp: string;

    @Column()
    password: string;
}