import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-uk-trading-homepage',
  templateUrl: './uk-trading-homepage.component.html',
  styleUrl: './uk-trading-homepage.component.scss',
})
export class UkTradingHomepageComponent implements OnInit {
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
      ' Безкоштовне навчання трейдингу від Ігора Арапова'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    // this.meta.updateTag({
    //   name: 'description',
    //   content: 'Безкоштовне навчання трейдингу онлайн від Ігоря Арапова. ⭐',
    // });
    this.meta.updateTag({
      name: 'keywords',
      content: 'безкоштовне навчання трейдингу, трейдинг, навчання трейдингу',
    });
  }
}
