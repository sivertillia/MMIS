import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  user_id: number

  @Column({ type: 'varchar' })
  last_name: string[]

  @Column({ type: 'varchar' })
  first_name: string

  @Column({ type: 'varchar' })
  role: string

  @Column({ type: 'varchar' })
  login: string

  @Column({ type: 'varchar' })
  password: string

  @Column({ type: 'time with time zone', default: 'now()' })
  created_at: string

  @Column({ type: 'time with time zone', nullable: true })
  updated_at: string
}
