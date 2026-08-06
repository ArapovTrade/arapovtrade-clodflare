import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredEightynineComponent } from './home-uk-blog-onehundred-eightynine.component';

describe('HomeUkBlogOnehundredEightynineComponent', () => {
  let component: HomeUkBlogOnehundredEightynineComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredEightynineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredEightynineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredEightynineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
