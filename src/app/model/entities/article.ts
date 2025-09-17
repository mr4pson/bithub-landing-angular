import { IMultilangable } from '../multilangable.interface';
import { CEntity } from './_entity';

export interface IArticle extends CEntity {
  readonly slug: string;
  readonly date: string;
  readonly img: string;
  readonly yt_content?: string;
  readonly readtime: number;
  readonly name: IMultilangable;
  readonly content?: IMultilangable;
  readonly contentshort?: IMultilangable;
  readonly title?: IMultilangable;
  readonly description?: IMultilangable;
  readonly canonical?: IMultilangable;
  readonly h1?: IMultilangable;
  was_read?: boolean;
}
