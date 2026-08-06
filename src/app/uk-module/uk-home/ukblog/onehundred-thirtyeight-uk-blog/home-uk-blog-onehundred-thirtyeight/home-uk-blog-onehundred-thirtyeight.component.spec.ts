import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredThirtyeightComponent } from './home-uk-blog-onehundred-thirtyeight.component';

describe('HomeUkBlogOnehundredThirtyeightComponent', () => {
  let component: HomeUkBlogOnehundredThirtyeightComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredThirtyeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredThirtyeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredThirtyeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
