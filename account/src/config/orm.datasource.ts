import { DataSource} from "typeorm";
import migrations from '../module/database/migrations';
import { UserEntity } from '../module/user/entities/user.entity';
import * as dotenv from 'dotenv';

const ENV_FILE = '.env';

dotenv.config({path:ENV_FILE});

export default new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABSE,
    port: 5432, //process.env.DB_PORT,
    synchronize: false,
    entities: [UserEntity],
    migrations,
    migrationsRun: true,
    migrationsTableName: process.env.DB_MIGRATIONS_TABLE_NAME
});