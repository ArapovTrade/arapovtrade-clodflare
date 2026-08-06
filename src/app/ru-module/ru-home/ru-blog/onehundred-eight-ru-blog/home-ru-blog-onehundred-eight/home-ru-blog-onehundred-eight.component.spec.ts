import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredEightComponent } from './home-ru-blog-onehundred-eight.component';

describe('HomeRuBlogOnehundredEightComponent', () => {
  let component: HomeRuBlogOnehundredEightComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
