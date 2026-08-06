import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredOneComponent } from './home-ru-blog-onehundred-one.component';

describe('HomeRuBlogOnehundredOneComponent', () => {
  let component: HomeRuBlogOnehundredOneComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
