import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredThreeComponent } from './home-uk-blog-onehundred-three.component';

describe('HomeUkBlogOnehundredThreeComponent', () => {
  let component: HomeUkBlogOnehundredThreeComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
