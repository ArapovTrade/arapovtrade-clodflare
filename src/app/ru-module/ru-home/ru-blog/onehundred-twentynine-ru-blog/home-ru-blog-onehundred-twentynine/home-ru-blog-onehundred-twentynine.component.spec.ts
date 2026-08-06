import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredTwentynineComponent } from './home-ru-blog-onehundred-twentynine.component';

describe('HomeRuBlogOnehundredTwentynineComponent', () => {
  let component: HomeRuBlogOnehundredTwentynineComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredTwentynineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredTwentynineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredTwentynineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
