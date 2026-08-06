import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredSixtytwoComponent } from './home-ru-blog-onehundred-sixtytwo.component';

describe('HomeRuBlogOnehundredSixtytwoComponent', () => {
  let component: HomeRuBlogOnehundredSixtytwoComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredSixtytwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredSixtytwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredSixtytwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
