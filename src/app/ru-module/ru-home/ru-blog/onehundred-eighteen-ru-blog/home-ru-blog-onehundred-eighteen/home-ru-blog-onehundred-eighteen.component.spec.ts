import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredEighteenComponent } from './home-ru-blog-onehundred-eighteen.component';

describe('HomeRuBlogOnehundredEighteenComponent', () => {
  let component: HomeRuBlogOnehundredEighteenComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredEighteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredEighteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredEighteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
