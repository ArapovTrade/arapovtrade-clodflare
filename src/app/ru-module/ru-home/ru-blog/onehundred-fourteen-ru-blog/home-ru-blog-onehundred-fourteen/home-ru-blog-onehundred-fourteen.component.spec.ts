import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredFourteenComponent } from './home-ru-blog-onehundred-fourteen.component';

describe('HomeRuBlogOnehundredFourteenComponent', () => {
  let component: HomeRuBlogOnehundredFourteenComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredFourteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredFourteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredFourteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
