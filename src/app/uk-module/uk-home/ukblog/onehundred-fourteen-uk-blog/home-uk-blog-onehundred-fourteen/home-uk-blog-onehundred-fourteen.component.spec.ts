import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredFourteenComponent } from './home-uk-blog-onehundred-fourteen.component';

describe('HomeUkBlogOnehundredFourteenComponent', () => {
  let component: HomeUkBlogOnehundredFourteenComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredFourteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredFourteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredFourteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
