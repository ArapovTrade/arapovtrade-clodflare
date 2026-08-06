import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredEightyfourComponent } from './home-ru-blog-onehundred-eightyfour.component';

describe('HomeRuBlogOnehundredEightyfourComponent', () => {
  let component: HomeRuBlogOnehundredEightyfourComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredEightyfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredEightyfourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredEightyfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
