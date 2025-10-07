import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ILang } from 'src/app/model/entities/lang.interface';
import { ISettings } from 'src/app/model/entities/settings.interface';
import { IWords } from 'src/app/model/entities/words.interface';
import { IKeyValue } from 'src/app/model/keyvalue.interface';
import { IFiles } from 'src/app/model/entities/files.interface';
import { IArticle } from '../model/entities/article';
import { DOCUMENT } from '@angular/common';
import { IPage } from '../model/entities/page';
import { CPageRepository } from './repositories/page.repository';

@Injectable()
export class CAppService {
  // data
  public page: IPage = null;
  public settings: ISettings = {};
  public lang: BehaviorSubject<ILang> = new BehaviorSubject(null);
  public langs: ILang[] = [];
  public words: IWords = {};
  public files: IFiles = {};
  // iface
  public win: HTMLElement = null;
  public notifyErrorActive: boolean = false;
  public popupArticleActive = false;
  public notifyErrorMsg: string = '';
  public notifyErrorTimer: number = null;
  public selectedArticle: IArticle = null;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
    protected pageRepository: CPageRepository,
    @Inject(DOCUMENT) private document: Document
  ) {}

  get url(): string[] {
    return this.router.url.split('?')[0].split('/');
  }
  get headerOffset(): number {
    return this.win.offsetWidth < 1000 ? 50 : 70;
  }

  get title(): string {
    return (
      this.page?.title[this.lang.value.slug] ||
      this.page?.name[this.lang.value.slug]
    );
  }
  get description(): string {
    return this.page?.description[this.lang.value.slug];
  }

  ////////////////////////
  // errors
  ////////////////////////

  public notifyError(error: any): void {
    if (typeof window !== 'undefined') {
      this.notifyErrorTimer && window.clearTimeout(this.notifyErrorTimer);
    }
    this.notifyErrorMsg =
      typeof error !== 'string' ? JSON.stringify(error) : error;
    this.notifyErrorActive = true;
    if (typeof window !== 'undefined') {
      this.notifyErrorTimer = window.setTimeout(() => {
        this.notifyErrorActive = false;
        this.notifyErrorTimer = null;
      }, 3000);
    }
    console.log(error);
  }

  ////////////////////////
  // langs
  ////////////////////////

  public setLang(lang: ILang): void {
    if (this.lang.value?.id !== lang.id) {
      this.lang.next(lang);
      this.setCanonical(lang);
    }
  }

  public async initPage(slug: string): Promise<void> {
    try {
      this.page = null;
      await this.pause(300);
      this.page = await this.pageRepository.loadOne(slug);

      this.initSEO();
      console.log(this.title);
    } catch (err) {
      console.log(err);
      this.notifyError(err);
    }
  }

  public initSEO(): void {
    this.setTitle(this.title);
    this.setMeta('name', 'description', this.description);
  }

  ////////////////////////
  // SEO, links etc.
  ////////////////////////

  public setTitle(title: string) {
    this.titleService.setTitle(`${title}`);
  }

  public setMeta(
    keyfield: 'name' | 'property',
    keyfieldvalue: string,
    content: string
  ): void {
    // <meta name='{keyfieldvalue}' content='{content}'> or <meta property='{keyfieldvalue}' content='{content}'>
    this.metaService.removeTag(`${keyfield}="${keyfieldvalue}"`);
    content
      ? this.metaService.addTag({ [keyfield]: keyfieldvalue, content })
      : null;
  }

  public getLangLink(
    lang: ILang,
    mode: 'url' | 'fragment' | 'queryParams'
  ): string | IKeyValue<string> {
    if (mode === 'fragment') return this.getLangLinkFragment(lang);
    if (mode === 'queryParams') return this.getLangLinkQueryParams(lang);
    return this.getLangLinkUrl(lang);
  }

  private getLangLinkUrl(lang: ILang): string {
    let delimiter = this.router.url.includes('#')
      ? '#'
      : this.router.url.includes('?')
      ? '?'
      : '';
    let preurl;

    if (delimiter) {
      const urlParts = this.router.url.split(delimiter);
      preurl = urlParts[0].split('/');
    } else {
      preurl = this.router.url.split('/');
    }

    preurl.splice(0, 2);
    return `/${lang.slug}/${preurl.join('/')}`;
  }

  private getLangLinkFragment(lang: ILang): string {
    const urlParts = this.router.url.split('#');
    const fragment = urlParts[1] ? decodeURI(urlParts[1]) : null;
    return fragment;
  }

  private getLangLinkQueryParams(lang: ILang): IKeyValue<string> {
    const queryParams = {};
    const urlParts = this.router.url.split('?');

    if (urlParts[1]) {
      const queryParamsParts = urlParts[1].split('&');

      for (let qpp of queryParamsParts) {
        const qppParts = qpp.split('=');
        queryParams[qppParts[0]] = qppParts[1];
      }
    }

    return queryParams;
  }

  ///////////////////
  // rnd
  ///////////////////

  public rnd(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public rndId(): number {
    return this.rnd(1000000000, 9999999999);
  }

  ///////////////////
  // DOM
  ///////////////////

  // when element clicked, check DOM tree for existence of one of ids
  public pathHasIds(elements: HTMLElement[], ids: string[]): boolean {
    for (let element of elements) {
      for (let id of ids) {
        if (element.id === id) {
          return true;
        }
      }
    }

    return false;
  }

  public querySelectorAll(selector: string): Promise<HTMLElement[]> {
    return new Promise((resolve, reject) => {
      let counter = 0;
      const check = () => {
        const elements = this.document.querySelectorAll(selector);

        if (elements.length) {
          resolve(Array.from(elements) as HTMLElement[]);
          return;
        }

        if (counter < 100) {
          counter++;
          setTimeout(() => check(), 100);
          return;
        }

        resolve([]);
      };
      check();
    });
  }

  public getElementById(id: string): Promise<HTMLElement> {
    return new Promise((resolve, reject) => {
      const check = () => {
        const element = this.document.getElementById(id);
        element ? resolve(element) : setTimeout(() => check(), 100);
      };
      check();
    });
  }

  ///////////////////
  // misc
  ///////////////////

  public pause(ms: number): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), ms);
    });
  }

  public setCanonical(lang: ILang) {
    const base = 'https://drop.guide';
    let href = base;
    if (lang.slug && lang.slug !== 'ru') {
      href += '/' + lang.slug;
    }
    let link: HTMLLinkElement = this.document.querySelector(
      "link[rel='canonical']"
    );
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');

      this.document.head.appendChild(link);
    }
    link.setAttribute('href', href);
    link.setAttribute('hreflang', lang.slug !== 'ru' ? lang.slug : 'x-default');
  }
}
