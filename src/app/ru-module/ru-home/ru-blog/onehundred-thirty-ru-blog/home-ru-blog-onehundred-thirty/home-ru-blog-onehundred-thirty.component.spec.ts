import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredThirtyComponent } from './home-ru-blog-onehundred-thirty.component';

describe('HomeRuBlogOnehundredThirtyComponent', () => {
  let component: HomeRuBlogOnehundredThirtyComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredThirtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredThirtyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredThirtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
