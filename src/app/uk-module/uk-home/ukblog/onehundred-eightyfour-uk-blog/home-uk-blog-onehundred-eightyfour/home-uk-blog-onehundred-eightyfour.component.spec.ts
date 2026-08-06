import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredEightyfourComponent } from './home-uk-blog-onehundred-eightyfour.component';

describe('HomeUkBlogOnehundredEightyfourComponent', () => {
  let component: HomeUkBlogOnehundredEightyfourComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredEightyfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredEightyfourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredEightyfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
