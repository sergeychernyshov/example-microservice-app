import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { DeepPartial, Repository, SelectQueryBuilder } from "typeorm";
import { SearchUserParams, CheckExistUserParams } from './user.types';

export class UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userReportory: Repository<UserEntity>
    ) {}
    /*async save<T extends DeepPartial<UserEntity>>(entity: T): Promise<UserEntity>{
        console.log("createUserDto",entity)
        return  this.userReportory.save(entity);
    }*/
    async createUser<T extends DeepPartial<UserEntity>>(entity: T): Promise<UserEntity>{

        return this.userReportory.save(entity);
    }
    async findById(userId: string): Promise<UserEntity | undefined> {
        return this.userReportory.findOneBy({userId});
    }
    async findAndCount(params: SearchUserParams): Promise<{ items: UserEntity[];
    total: number }>{
        const [items, total] = await this.qb(params).getManyAndCount();
        return { items, total };
    }
    async updateUser(params: DeepPartial<UserEntity>): Promise<void>{
        await this.userReportory.update({userId: params.userId }, params);
    }
    async deleteUser(id: string): Promise<void>{
        await this.userReportory.delete({ userId: id});
    }
    async checkExistUser(params: CheckExistUserParams, alias = 'user'): Promise<boolean>{
        const query = this.userReportory.createQueryBuilder(alias);
        query.where('user.user_id = :userId', { userId: params.userId});
        query.orWhere('user.phone = :phone',{ phone: params.phone});
        //query.where('user.phone = :phone',{ phone: params.phone});
        const result = await query.getOne();
        return result ? true : false;
    }

    qb(params: SearchUserParams = {}, alias = 'user'): SelectQueryBuilder<UserEntity>{
        const query = this.userReportory.createQueryBuilder(alias);
        if(params?.userIds?.length){
            query.andWhere(`$(alias).userId in (:..usersIds)`, {userIds: params.userIds});
        }
        if(params?.phones?.length){
            query.andWhere(`$(alias).phone in (:..phones)`, {phones: params.phones})
        }
        if(params.take){
            query.take(params.take);
        }
        if(params.skip){
            query.skip(params.skip);
        }
        return query;
    }
}
