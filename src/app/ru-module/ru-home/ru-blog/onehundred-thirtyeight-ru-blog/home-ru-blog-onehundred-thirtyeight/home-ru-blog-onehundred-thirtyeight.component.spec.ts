import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredThirtyeightComponent } from './home-ru-blog-onehundred-thirtyeight.component';

describe('HomeRuBlogOnehundredThirtyeightComponent', () => {
  let component: HomeRuBlogOnehundredThirtyeightComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredThirtyeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredThirtyeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredThirtyeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
