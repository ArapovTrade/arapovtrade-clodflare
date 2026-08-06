import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredFortyfourComponent } from './home-ru-blog-onehundred-fortyfour.component';

describe('HomeRuBlogOnehundredFortyfourComponent', () => {
  let component: HomeRuBlogOnehundredFortyfourComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredFortyfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredFortyfourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredFortyfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
