import { MigrationInterface, QueryRunner } from 'typeorm'


export class migration1668950489988 implements MigrationInterface {
  name = 'migration1668950489988'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "users" ("user_id" SERIAL NOT NULL, "last_name" character varying NOT NULL, "first_name" character varying NOT NULL, "role" character varying NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIME WITH TIME ZONE NOT NULL DEFAULT 'now()', "updated_at" TIME WITH TIME ZONE, CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`)
  }

}
