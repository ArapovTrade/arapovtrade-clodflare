import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredFortyfourComponent } from './home-uk-blog-onehundred-fortyfour.component';

describe('HomeUkBlogOnehundredFortyfourComponent', () => {
  let component: HomeUkBlogOnehundredFortyfourComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredFortyfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredFortyfourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredFortyfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
