import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredFourComponent } from './home-ru-blog-onehundred-four.component';

describe('HomeRuBlogOnehundredFourComponent', () => {
  let component: HomeRuBlogOnehundredFourComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
