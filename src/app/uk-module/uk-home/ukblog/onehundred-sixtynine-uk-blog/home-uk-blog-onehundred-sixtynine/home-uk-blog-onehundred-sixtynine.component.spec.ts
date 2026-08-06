import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredSixtynineComponent } from './home-uk-blog-onehundred-sixtynine.component';

describe('HomeUkBlogOnehundredSixtynineComponent', () => {
  let component: HomeUkBlogOnehundredSixtynineComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredSixtynineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredSixtynineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredSixtynineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
