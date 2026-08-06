import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredFortysevenComponent } from './home-ru-blog-onehundred-fortyseven.component';

describe('HomeRuBlogOnehundredFortysevenComponent', () => {
  let component: HomeRuBlogOnehundredFortysevenComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredFortysevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredFortysevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredFortysevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
