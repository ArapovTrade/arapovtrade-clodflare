import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredEightynineComponent } from './home-en-blog-onehundred-eightynine.component';

describe('HomeEnBlogOnehundredEightynineComponent', () => {
  let component: HomeEnBlogOnehundredEightynineComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredEightynineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredEightynineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredEightynineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
