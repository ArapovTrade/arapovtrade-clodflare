import { Component, OnInit } from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ru-trading-homepage',
  templateUrl: './ru-trading-homepage.component.html',
  styleUrl: './ru-trading-homepage.component.scss',
})
export class RuTradingHomepageComponent implements OnInit {
  constructor(
    private router: Router,
    private meta: Meta,
    private titleService: Title
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
        }
      }
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle(
      'Бесплатное обучение трейдингу от Игоря Арапова'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    // this.meta.updateTag({
    //   name: 'description',
    //   content: 'Бесплатное обучение трейдинга онлайн от Игоря Арапова. ⭐',
    // });
    this.meta.updateTag({
      name: 'keywords',
      content: 'бесплатное обучение трейдингу, трейдинг, обучение трейдингу',
    });
  }
}
