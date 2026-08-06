import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredSeventeenComponent } from './home-uk-blog-onehundred-seventeen.component';

describe('HomeUkBlogOnehundredSeventeenComponent', () => {
  let component: HomeUkBlogOnehundredSeventeenComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredSeventeenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredSeventeenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredSeventeenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
