import { IMultilangable } from '../multilangable';
import { CEntity } from './_entity';

export interface IPage extends CEntity {
  readonly parent_id: number;
  readonly slug: string;
  readonly img?: string;
  readonly name: IMultilangable;
  readonly content?: IMultilangable;
  readonly title?: IMultilangable;
  readonly description?: IMultilangable;
  readonly h1?: IMultilangable;
  // relations
  readonly children: IPage[];
}
