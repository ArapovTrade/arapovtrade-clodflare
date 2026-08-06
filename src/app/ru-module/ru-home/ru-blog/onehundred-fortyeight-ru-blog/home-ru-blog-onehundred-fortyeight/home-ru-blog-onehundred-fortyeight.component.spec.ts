import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredFortyeightComponent } from './home-ru-blog-onehundred-fortyeight.component';

describe('HomeRuBlogOnehundredFortyeightComponent', () => {
  let component: HomeRuBlogOnehundredFortyeightComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredFortyeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredFortyeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredFortyeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
