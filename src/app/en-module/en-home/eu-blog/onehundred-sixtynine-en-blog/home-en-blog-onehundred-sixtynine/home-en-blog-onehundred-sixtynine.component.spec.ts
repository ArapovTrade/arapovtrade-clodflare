import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredSixtynineComponent } from './home-en-blog-onehundred-sixtynine.component';

describe('HomeEnBlogOnehundredSixtynineComponent', () => {
  let component: HomeEnBlogOnehundredSixtynineComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredSixtynineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredSixtynineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredSixtynineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
