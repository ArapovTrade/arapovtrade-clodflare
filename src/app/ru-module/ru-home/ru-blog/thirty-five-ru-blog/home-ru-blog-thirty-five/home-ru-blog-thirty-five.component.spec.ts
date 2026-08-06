import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogThirtyFiveComponent } from './home-ru-blog-thirty-five.component';

describe('HomeRuBlogThirtyFiveComponent', () => {
  let component: HomeRuBlogThirtyFiveComponent;
  let fixture: ComponentFixture<HomeRuBlogThirtyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogThirtyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogThirtyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
