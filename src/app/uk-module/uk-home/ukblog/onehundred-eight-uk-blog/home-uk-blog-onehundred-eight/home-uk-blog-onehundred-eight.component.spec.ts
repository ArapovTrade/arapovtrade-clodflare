import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredEightComponent } from './home-uk-blog-onehundred-eight.component';

describe('HomeUkBlogOnehundredEightComponent', () => {
  let component: HomeUkBlogOnehundredEightComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
