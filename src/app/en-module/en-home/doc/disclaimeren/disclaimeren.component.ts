import { Component } from '@angular/core';
import { LangService } from '../../../../servises/lang.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-disclaimeren',
  templateUrl: './disclaimeren.component.html',
  styleUrl: './disclaimeren.component.scss',
})
export class DisclaimerenComponent {
  constructor(private meta: Meta,
    private titleService: Title,private lang: LangService) {}

  ngOnInit(): void {
    this.lang.setNumber(3);
    this.titleService.setTitle('Disclaimer - ArapovTrade');
this.meta.updateTag({ name: 'robots', content: 'index, follow' });
this.meta.updateTag({
  name: 'description',
  content:
    "Any information posted on this website or provided during the training process is of a general nature and may only be used for educational or informational purposes.",
});
  }
}
