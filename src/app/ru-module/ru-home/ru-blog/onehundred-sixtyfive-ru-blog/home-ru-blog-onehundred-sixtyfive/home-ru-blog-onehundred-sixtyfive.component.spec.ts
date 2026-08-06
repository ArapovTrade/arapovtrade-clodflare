import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredSixtyfiveComponent } from './home-ru-blog-onehundred-sixtyfive.component';

describe('HomeRuBlogOnehundredSixtyfiveComponent', () => {
  let component: HomeRuBlogOnehundredSixtyfiveComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredSixtyfiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredSixtyfiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredSixtyfiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
