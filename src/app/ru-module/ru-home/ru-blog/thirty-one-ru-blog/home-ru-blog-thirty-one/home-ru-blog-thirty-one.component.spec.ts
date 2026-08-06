import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogThirtyOneComponent } from './home-ru-blog-thirty-one.component';

describe('HomeRuBlogThirtyOneComponent', () => {
  let component: HomeRuBlogThirtyOneComponent;
  let fixture: ComponentFixture<HomeRuBlogThirtyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogThirtyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogThirtyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
