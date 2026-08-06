import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogThirtyNineComponent } from './home-ru-blog-thirty-nine.component';

describe('HomeRuBlogThirtyNineComponent', () => {
  let component: HomeRuBlogThirtyNineComponent;
  let fixture: ComponentFixture<HomeRuBlogThirtyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogThirtyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogThirtyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
