import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredSeventeenComponent } from './home-ru-blog-onehundred-seventeen.component';

describe('HomeRuBlogOnehundredSeventeenComponent', () => {
  let component: HomeRuBlogOnehundredSeventeenComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredSeventeenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredSeventeenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredSeventeenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
