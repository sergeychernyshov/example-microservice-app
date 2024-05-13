import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({
    name:'user',
})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid',{
        comment: 'Идентификатор пользователя',
        name: 'user_id'
    })
    readonly userId: string;
    @Column('varchar',{
        comment: 'Номер телефона пользователя',
        nullable: false,
        length: 20
    })
    phone: string;

    @Column('varchar',{
        comment: 'Имя',
    })
    firstName: string;

    @Column('varchar',{
        comment: 'Фамилия',
    })
    lastName: string;

    @Column('varchar',{
        comment: 'Хеш пароля',
    })
    passwordHash: string;

    @Column('varchar',{
        comment: 'Соль пароля',
    })
    passwordSalt: string;
}
