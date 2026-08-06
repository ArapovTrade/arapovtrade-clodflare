import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredEightyfiveComponent } from './home-en-blog-onehundred-eightyfive.component';

describe('HomeEnBlogOnehundredEightyfiveComponent', () => {
  let component: HomeEnBlogOnehundredEightyfiveComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredEightyfiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredEightyfiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredEightyfiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
