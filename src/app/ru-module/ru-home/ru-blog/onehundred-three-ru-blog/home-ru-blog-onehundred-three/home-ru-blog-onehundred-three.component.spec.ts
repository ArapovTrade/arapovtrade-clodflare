import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredThreeComponent } from './home-ru-blog-onehundred-three.component';

describe('HomeRuBlogOnehundredThreeComponent', () => {
  let component: HomeRuBlogOnehundredThreeComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
