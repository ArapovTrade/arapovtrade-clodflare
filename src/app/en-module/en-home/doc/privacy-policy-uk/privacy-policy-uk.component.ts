import { Component } from '@angular/core';
import { LangService } from '../../../../servises/lang.service';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-privacy-policy-uk',
  templateUrl: './privacy-policy-uk.component.html',
  styleUrl: './privacy-policy-uk.component.scss'
})
export class PrivacyPolicyUkComponent {
constructor(private meta: Meta,
    private titleService: Title,private lang: LangService) {}

    ngOnInit(): void {
    this.lang.setNumber(1);

    this.titleService.setTitle('Privacy Policy | Arapov.Trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        "Privacy policy of Arapov.Trade — information about the use of data and cookies on this website.",
    });
  }
}
