import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ru-home-page',
  templateUrl: './ru-home-page.component.html',
  styleUrl: './ru-home-page.component.scss',
})
export class RuHomePageComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private router: Router
  ) {}
  scrollToRegistrationRu() {
    const element = document.getElementById('registrationRu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  ngOnInit(): void {
    this.titleService.setTitle(
      'Курсы трейдинга Авторское обучение трейдингу онлайн | Игорь Арапов'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Авторские ⏩ курсы трейдинга от Игоря Арапова. ⭐ Обучение трейдингу с нуля от ArapovTrade.',
    });
    this.meta.addTag({
      name: 'keywords',
      content:
        'курсы трейдинга, трейдинг,  валюты, обучение трейдингу, бесплатное обучение трейдингу, обучение трейдингу бесплатно, обучение трейдингу криптовалют, трейдинг курсы бесплатно, трейдинг с нуля, курсы по трейдингу',
    });
  }

  navigateToStudy() {
    this.router.navigateByUrl('/ru/studying');
  }
}
