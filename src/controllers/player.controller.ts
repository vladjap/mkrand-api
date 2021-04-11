import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {PlayerItem} from '../models';
import {PlayerItemRepository} from '../repositories';

export class PlayerController {
  constructor(
    @repository(PlayerItemRepository)
    public playerItemRepository : PlayerItemRepository,
  ) {}

  @post('/players')
  @response(200, {
    description: 'PlayerItem model instance',
    content: {'application/json': {schema: getModelSchemaRef(PlayerItem)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlayerItem, {
            title: 'NewPlayerItem',
            exclude: ['id'],
          }),
        },
      },
    })
    playerItem: Omit<PlayerItem, 'id'>,
  ): Promise<PlayerItem> {
    return this.playerItemRepository.create(playerItem);
  }

  @get('/players/count')
  @response(200, {
    description: 'PlayerItem model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PlayerItem) where?: Where<PlayerItem>,
  ): Promise<Count> {
    return this.playerItemRepository.count(where);
  }

  @get('/players')
  @response(200, {
    description: 'Array of PlayerItem model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PlayerItem, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PlayerItem) filter?: Filter<PlayerItem>,
  ): Promise<PlayerItem[]> {
    return this.playerItemRepository.find(filter);
  }

  @patch('/players')
  @response(200, {
    description: 'PlayerItem PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlayerItem, {partial: true}),
        },
      },
    })
    playerItem: PlayerItem,
    @param.where(PlayerItem) where?: Where<PlayerItem>,
  ): Promise<Count> {
    return this.playerItemRepository.updateAll(playerItem, where);
  }

  @get('/players/{id}')
  @response(200, {
    description: 'PlayerItem model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PlayerItem, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PlayerItem, {exclude: 'where'}) filter?: FilterExcludingWhere<PlayerItem>
  ): Promise<PlayerItem> {
    return this.playerItemRepository.findById(id, filter);
  }

  @patch('/players/{id}')
  @response(204, {
    description: 'PlayerItem PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlayerItem, {partial: true}),
        },
      },
    })
    playerItem: PlayerItem,
  ): Promise<void> {
    await this.playerItemRepository.updateById(id, playerItem);
  }

  @put('/players/{id}')
  @response(204, {
    description: 'PlayerItem PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() playerItem: PlayerItem,
  ): Promise<void> {
    await this.playerItemRepository.replaceById(id, playerItem);
  }

  @del('/players/{id}')
  @response(204, {
    description: 'PlayerItem DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.playerItemRepository.deleteById(id);
  }
}
