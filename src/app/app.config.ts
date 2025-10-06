import { environment } from '../environments/environment';

export interface IConfig {
  readonly apiUrl: string;
  readonly mainsiteUrl: string;
}

export const cfg: IConfig = {
  apiUrl: environment.apiUrl,
  mainsiteUrl: environment.mainsiteUrl,
};
