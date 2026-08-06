import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogNineComponent } from './home-ru-blog-nine.component';

describe('HomeRuBlogNineComponent', () => {
  let component: HomeRuBlogNineComponent;
  let fixture: ComponentFixture<HomeRuBlogNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
