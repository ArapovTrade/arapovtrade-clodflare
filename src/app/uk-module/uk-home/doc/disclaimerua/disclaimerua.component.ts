import { Component } from '@angular/core';
import { LangService } from '../../../../servises/lang.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-disclaimerua',
  templateUrl: './disclaimerua.component.html',
  styleUrl: './disclaimerua.component.scss',
})
export class DisclaimeruaComponent {
  constructor(private meta: Meta,
    private titleService: Title,private lang: LangService) {}

  ngOnInit(): void {
    this.lang.setNumber(1);

    this.titleService.setTitle('Відмова від відповідальності - ArapovTrade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        "Інформація, розміщена на цьому веб-ресурсі , має загальний характер і призначена виключно для освітніх або пізнавальних цілей.",
    });
  }
}
