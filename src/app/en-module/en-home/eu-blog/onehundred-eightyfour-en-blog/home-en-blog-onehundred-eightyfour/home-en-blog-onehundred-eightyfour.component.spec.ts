import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredEightyfourComponent } from './home-en-blog-onehundred-eightyfour.component';

describe('HomeEnBlogOnehundredEightyfourComponent', () => {
  let component: HomeEnBlogOnehundredEightyfourComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredEightyfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredEightyfourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredEightyfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
