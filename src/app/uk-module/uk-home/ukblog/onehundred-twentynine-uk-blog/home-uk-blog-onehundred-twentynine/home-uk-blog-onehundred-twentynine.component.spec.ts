import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredTwentynineComponent } from './home-uk-blog-onehundred-twentynine.component';

describe('HomeUkBlogOnehundredTwentynineComponent', () => {
  let component: HomeUkBlogOnehundredTwentynineComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredTwentynineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredTwentynineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredTwentynineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
