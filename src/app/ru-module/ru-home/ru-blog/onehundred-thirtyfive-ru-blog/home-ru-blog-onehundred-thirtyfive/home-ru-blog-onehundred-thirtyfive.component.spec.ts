import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredThirtyfiveComponent } from './home-ru-blog-onehundred-thirtyfive.component';

describe('HomeRuBlogOnehundredThirtyfiveComponent', () => {
  let component: HomeRuBlogOnehundredThirtyfiveComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredThirtyfiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredThirtyfiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredThirtyfiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
