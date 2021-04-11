import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDsDataSource} from '../datasources';
import {PlayerItem, PlayerItemRelations} from '../models';

export class PlayerItemRepository extends DefaultCrudRepository<
  PlayerItem,
  typeof PlayerItem.prototype.id,
  PlayerItemRelations
> {
  constructor(
    @inject('datasources.mysqlDS') dataSource: MysqlDsDataSource,
  ) {
    super(PlayerItem, dataSource);
  }
}
