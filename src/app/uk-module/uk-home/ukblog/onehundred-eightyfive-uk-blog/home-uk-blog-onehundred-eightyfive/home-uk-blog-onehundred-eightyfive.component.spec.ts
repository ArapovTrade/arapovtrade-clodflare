import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredEightyfiveComponent } from './home-uk-blog-onehundred-eightyfive.component';

describe('HomeUkBlogOnehundredEightyfiveComponent', () => {
  let component: HomeUkBlogOnehundredEightyfiveComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredEightyfiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredEightyfiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredEightyfiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
