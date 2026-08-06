import { Component } from '@angular/core';
import { LangService } from '../../../../servises/lang.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrl: './disclaimer.component.scss',
})
export class DisclaimerComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private lang: LangService
  ) {}

  ngOnInit(): void {
    this.lang.setNumber(2);
    this.titleService.setTitle('Отказ от ответственности | ArapovTrade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Информация, размещенная на этом веб-ресурсе, носит общий характер и предназначена исключительно для образовательных или познавательных целей.',
    });
  }
}
