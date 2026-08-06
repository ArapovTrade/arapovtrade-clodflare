import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredTwentynineComponent } from './home-en-blog-onehundred-twentynine.component';

describe('HomeEnBlogOnehundredTwentynineComponent', () => {
  let component: HomeEnBlogOnehundredTwentynineComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredTwentynineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredTwentynineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredTwentynineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
