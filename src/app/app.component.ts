import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  Renderer2,
  Inject,
} from '@angular/core';
import { CAppService } from './services/app.service';
import { CLangRepository } from './services/repositories/lang.repository';
import { CSettingRepository } from './services/repositories/setting.repository';
import { CWordRepository } from './services/repositories/word.repository';
import { CFileRepository } from './services/repositories/file.repository';
import { NavigationStart, Router } from '@angular/router';
import { ISettings } from './model/entities/settings.interface';
import { filter } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { CArticleRepository } from './services/repositories/article.repository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CAppComponent implements OnInit, AfterViewInit {
  @ViewChild('win', { static: false }) private winRef: ElementRef;
  private settingsReady: boolean = false;
  private langsReady: boolean = false;
  private wordsReady: boolean = false;
  private filesReady: boolean = false;

  constructor(
    private appService: CAppService,
    private langRepository: CLangRepository,
    private settingRepository: CSettingRepository,
    private wordRepository: CWordRepository,
    private fileRepository: CFileRepository,
    private router: Router,
    private renderer: Renderer2,
    private articleRepository: CArticleRepository,
    @Inject(DOCUMENT) private document: Document
  ) {}

  get settings(): ISettings {
    return this.appService.settings;
  }
  get ready(): boolean {
    return (
      this.settingsReady &&
      this.settings['active'] === '1' &&
      this.langsReady &&
      this.wordsReady &&
      this.filesReady
    );
  }
  get url(): string[] {
    return this.appService.url;
  }

  public async ngOnInit(): Promise<void> {
    await Promise.all([
      this.initPage(),
      this.initSettings(),
      this.initLangs(),
      this.initWords(),
      this.initFiles(),
    ]);
    this.initIface();
  }

  public async ngAfterViewInit(): Promise<void> {
    this.appService.win = this.winRef.nativeElement;
  }

  private async initSettings(): Promise<void> {
    try {
      this.appService.settings = await this.settingRepository.loadAll();
      this.settingsReady = true;
    } catch (err) {
      this.appService.notifyError(err);
    }
  }

  private async initPage() {
    await this.appService.initPage('main-landing');
    return this.appService.initSEO();
  }

  private async initLangs(): Promise<void> {
    try {
      this.appService.langs = await this.langRepository.loadAll();
      this.initLang(this.router.url.split('/')[1]);
      const slug = await this.router.url.split('/')[3];

      if (slug && !slug.includes('.')) {
        const article = await this.articleRepository.loadOne(slug);
        this.appService.selectedArticle = article;
        this.appService.popupArticleActive = true;

        this.appService.setTitle(this.appService.articleTitle);
        this.appService.setMeta(
          'name',
          'description',
          this.appService.articleDescription
        );
        console.log(this.router.url.split('/')[3]);
      } else {
        this.appService.initSEO();
      }

      this.langsReady = true;
      this.router.events
        .pipe(filter((event) => event instanceof NavigationStart))
        .subscribe((event: NavigationStart) =>
          this.initLang(event.url.split('/')[1])
        );
    } catch (err) {
      this.appService.notifyError(err);
    }
  }

  private initLang(slug: string): void {
    if (!slug) {
      this.appService.setLang(this.appService.langs[0]);
      return;
    }

    const lang = this.appService.langs.find((l) => l.slug === slug);

    if (!lang) {
      this.appService.setLang(this.appService.langs[0]);
      this.router.navigateByUrl(
        `/${this.appService.lang.value.slug}/errors/404`
      );
      return;
    }

    this.appService.setLang(lang);
  }

  private async initWords(): Promise<void> {
    try {
      this.appService.words = await this.wordRepository.loadAll();
      this.wordsReady = true;
    } catch (err) {
      this.appService.notifyError(err);
    }
  }

  private async initFiles(): Promise<void> {
    try {
      this.appService.files = await this.fileRepository.loadAll();
      this.filesReady = true;
    } catch (err) {
      this.appService.notifyError(err);
    }
  }

  private async initIface(): Promise<void> {
    const splash = this.document.getElementById('splash');
    if (!splash) return;
    await this.appService.pause(500);
    this.renderer.addClass(splash, 'transparent');
    await this.appService.pause(500);
    this.renderer.removeChild(splash.parentNode, splash);
  }

  // <a class="routerlink"> to router-like behavior
  @HostListener('document:click', ['$event'])
  public onClick(event: Event): void {
    if (event.target instanceof HTMLAnchorElement) {
      const element = event.target as HTMLAnchorElement;
      if (element.classList.contains('routerlink')) {
        event.preventDefault();
        const route = element.getAttribute('href');
        route && this.router.navigateByUrl(route);
      }
    }
  }
}
