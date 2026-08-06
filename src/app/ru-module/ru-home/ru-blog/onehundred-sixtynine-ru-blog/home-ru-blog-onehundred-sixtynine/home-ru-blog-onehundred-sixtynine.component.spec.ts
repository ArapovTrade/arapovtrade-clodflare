import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredSixtynineComponent } from './home-ru-blog-onehundred-sixtynine.component';

describe('HomeRuBlogOnehundredSixtynineComponent', () => {
  let component: HomeRuBlogOnehundredSixtynineComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredSixtynineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredSixtynineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredSixtynineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
