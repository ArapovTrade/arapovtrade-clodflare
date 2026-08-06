import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-en-trading-homepage',
  templateUrl: './en-trading-homepage.component.html',
  styleUrl: './en-trading-homepage.component.scss',
})
export class EnTradingHomepageComponent implements OnInit {
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
    this.titleService.setTitle('Free introduction to trading from Igor Arapov');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    // this.meta.updateTag({
    //   name: 'description',
    //   content: 'Free introduction to online trading from Igor Arapov. ⭐',
    // });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'no cost for getting started with trading, trading, getting started with trading',
    });
  }
}
