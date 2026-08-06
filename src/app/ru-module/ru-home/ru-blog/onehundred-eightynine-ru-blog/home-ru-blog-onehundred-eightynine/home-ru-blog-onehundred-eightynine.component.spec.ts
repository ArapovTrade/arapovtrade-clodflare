import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredEightynineComponent } from './home-ru-blog-onehundred-eightynine.component';

describe('HomeRuBlogOnehundredEightynineComponent', () => {
  let component: HomeRuBlogOnehundredEightynineComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredEightynineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredEightynineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredEightynineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
