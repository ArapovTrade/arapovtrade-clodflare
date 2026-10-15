import { Component } from '@angular/core';
import { LangService } from '../../../../servises/lang.service';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-privacy-policy-ua',
  templateUrl: './privacy-policy-ua.component.html',
  styleUrl: './privacy-policy-ua.component.scss'
})
export class PrivacyPolicyUaComponent {
constructor(private meta: Meta,
    private titleService: Title,private lang: LangService) {}

  ngOnInit(): void {
    this.lang.setNumber(1);

    this.titleService.setTitle('Політика конфіденційності | ArapovTrade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        "Політика конфіденційності сайту arapovtrade.com — інформація про використання даних та файлів cookie",
    });
  }


}
