import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogThirtyEightComponent } from './home-ru-blog-thirty-eight.component';

describe('HomeRuBlogThirtyEightComponent', () => {
  let component: HomeRuBlogThirtyEightComponent;
  let fixture: ComponentFixture<HomeRuBlogThirtyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogThirtyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogThirtyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
