import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredSevenComponent } from './home-ru-blog-onehundred-seven.component';

describe('HomeRuBlogOnehundredSevenComponent', () => {
  let component: HomeRuBlogOnehundredSevenComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredSevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredSevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredSevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
