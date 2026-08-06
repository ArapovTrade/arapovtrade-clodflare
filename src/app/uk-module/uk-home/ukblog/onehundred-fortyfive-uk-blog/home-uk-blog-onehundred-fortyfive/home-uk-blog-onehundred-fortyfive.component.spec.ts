import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredFortyfiveComponent } from './home-uk-blog-onehundred-fortyfive.component';

describe('HomeUkBlogOnehundredFortyfiveComponent', () => {
  let component: HomeUkBlogOnehundredFortyfiveComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredFortyfiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredFortyfiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredFortyfiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
