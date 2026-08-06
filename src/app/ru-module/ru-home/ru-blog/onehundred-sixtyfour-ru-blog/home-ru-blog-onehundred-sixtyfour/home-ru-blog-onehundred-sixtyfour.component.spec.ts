import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredSixtyfourComponent } from './home-ru-blog-onehundred-sixtyfour.component';

describe('HomeRuBlogOnehundredSixtyfourComponent', () => {
  let component: HomeRuBlogOnehundredSixtyfourComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredSixtyfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredSixtyfourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredSixtyfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
