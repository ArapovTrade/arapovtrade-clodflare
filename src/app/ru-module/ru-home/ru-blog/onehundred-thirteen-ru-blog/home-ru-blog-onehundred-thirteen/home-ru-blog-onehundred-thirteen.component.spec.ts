import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredThirteenComponent } from './home-ru-blog-onehundred-thirteen.component';

describe('HomeRuBlogOnehundredThirteenComponent', () => {
  let component: HomeRuBlogOnehundredThirteenComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredThirteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredThirteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredThirteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
