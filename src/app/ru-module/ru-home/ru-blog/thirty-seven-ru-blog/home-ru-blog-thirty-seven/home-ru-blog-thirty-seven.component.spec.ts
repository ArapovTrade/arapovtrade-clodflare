import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogThirtySevenComponent } from './home-ru-blog-thirty-seven.component';

describe('HomeRuBlogThirtySevenComponent', () => {
  let component: HomeRuBlogThirtySevenComponent;
  let fixture: ComponentFixture<HomeRuBlogThirtySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogThirtySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogThirtySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
