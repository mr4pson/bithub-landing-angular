import { IKeyValue } from './model/keyvalue.interface';

export interface IConfig {
  readonly apiUrl: string;
  readonly mainsiteUrl: string;
}

const host = window.location.host;
const configs: IKeyValue<IConfig> = {
  'localhost:53582': {
    apiUrl: 'http://localhost:3030/api/landing',
    mainsiteUrl: 'https://app.bithab.vio.net.ua',
  },
  'bithab.vio.net.ua': {
    apiUrl: 'https://back.bithab.vio.net.ua/api/landing',
    mainsiteUrl: 'https://app.bithab.vio.net.ua',
  },
  'bithab.net': {
    apiUrl: 'https://back.bithab.net/api/landing',
    mainsiteUrl: 'https://app.bithab.net',
  },
  'drop.guide': {
    apiUrl: 'https://back.drop.guide/api/landing',
    mainsiteUrl: 'https://app.drop.guide',
  },
};

export const cfg = configs[host];
