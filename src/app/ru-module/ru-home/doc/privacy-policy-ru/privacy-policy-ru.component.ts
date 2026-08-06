import { Component } from '@angular/core';
import { LangService } from '../../../../servises/lang.service';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-privacy-policy-ru',
  templateUrl: './privacy-policy-ru.component.html',
  styleUrl: './privacy-policy-ru.component.scss'
})
export class PrivacyPolicyRuComponent {
constructor(private meta: Meta,
    private titleService: Title,private lang: LangService) {}

    ngOnInit(): void {
    this.lang.setNumber(1);

    this.titleService.setTitle('Политика конфиденциальности | Arapov.Trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        "Политика конфиденциальности сайта Arapov.Trade — информация об использовании данных и файлов cookie.",
    });
  }
}
