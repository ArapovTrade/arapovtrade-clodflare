import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredSevenComponent } from './home-uk-blog-onehundred-seven.component';

describe('HomeUkBlogOnehundredSevenComponent', () => {
  let component: HomeUkBlogOnehundredSevenComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredSevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredSevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredSevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
