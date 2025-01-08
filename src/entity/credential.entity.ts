import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('credential') // Nombre de la tabla en la base de datos
export class Credential {
  @PrimaryGeneratedColumn('uuid') // Genera un identificador único
  id: string; // Identificador único de la credencial

  @Column('simple-array') // Guarda un array como texto separado por comas
  contexto: string[];

  @Column('simple-array') // Similar al anterior
  tipo: string[];

  @Column({ length: 255 }) // Define una longitud máxima
  emisor: string;

  @Column({ type: 'date' }) // Define el tipo de dato como fecha
  validFrom: Date;

  @Column({ type: 'date', nullable: true }) // Define el campo como opcional
  validUntil?: Date;

  @Column('json') // Guarda un objeto JSON directamente
  asuntoCredencial: {
    id: string;
    exalumnoDe: {
      id: string;
      nombre: string;
    };
  };
}
