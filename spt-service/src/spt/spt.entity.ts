import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('spt')
export class Spt {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  id_spt: string;

  @Column({ type: 'varchar', length: 10 })
  masa_pajak: string;

  @Column({ type: 'int' })
  tahun_pajak: number;

  @Column({ type: 'varchar', length: 20 })
  npwp_pemotong: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nama_pemotong: string;

  @Column({ type: 'varchar', length: 20 })
  npwp_penerima: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nama_penerima: string;

  @Column({ type: 'text', nullable: true })
  alamat_penerima: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  jabatan_penerima: string;

  @Column({ type: 'numeric', nullable: true })
  penghasilan_setahun: number;

  @Column({ type: 'numeric', nullable: true })
  ptkp: number;

  @Column({ type: 'numeric', nullable: true })
  pengurangan: number;

  @Column({ type: 'numeric', nullable: true })
  netto: number;

  @Column({ type: 'numeric', nullable: true })
  pph: number;

  @Column({ type: 'text', nullable: true })
  file_dok_lampiran: string;
}
