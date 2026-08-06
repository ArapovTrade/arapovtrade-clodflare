import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredComponent } from './home-ru-blog-onehundred.component';

describe('HomeRuBlogOnehundredComponent', () => {
  let component: HomeRuBlogOnehundredComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
