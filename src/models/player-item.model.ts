import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class PlayerItem extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  imagePath: string;

  @property({
    type: 'boolean',
    default: false,
  })
  available?: boolean;

  @property({
    type: 'array',
    itemType: 'object',
  })
  specialsMoves?: object[];

  @property({
    type: 'array',
    itemType: 'object',
  })
  kombosMoves?: object[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PlayerItem>) {
    super(data);
  }
}

export interface PlayerItemRelations {
  // describe navigational properties here
}

export type PlayerItemWithRelations = PlayerItem & PlayerItemRelations;
