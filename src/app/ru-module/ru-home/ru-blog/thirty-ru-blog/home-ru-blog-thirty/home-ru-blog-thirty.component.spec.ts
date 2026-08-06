import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogThirtyComponent } from './home-ru-blog-thirty.component';

describe('HomeRuBlogThirtyComponent', () => {
  let component: HomeRuBlogThirtyComponent;
  let fixture: ComponentFixture<HomeRuBlogThirtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogThirtyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogThirtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
