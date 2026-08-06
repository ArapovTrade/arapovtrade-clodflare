import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredFiftyeightComponent } from './home-uk-blog-onehundred-fiftyeight.component';

describe('HomeUkBlogOnehundredFiftyeightComponent', () => {
  let component: HomeUkBlogOnehundredFiftyeightComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredFiftyeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredFiftyeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredFiftyeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
