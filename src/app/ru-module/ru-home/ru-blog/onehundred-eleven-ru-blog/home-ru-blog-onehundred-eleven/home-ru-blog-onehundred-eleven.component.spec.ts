import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredElevenComponent } from './home-ru-blog-onehundred-eleven.component';

describe('HomeRuBlogOnehundredElevenComponent', () => {
  let component: HomeRuBlogOnehundredElevenComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredElevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredElevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredElevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
