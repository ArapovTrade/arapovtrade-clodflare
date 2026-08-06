import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogThirtyNineComponent } from './home-uk-blog-thirty-nine.component';

describe('HomeUkBlogThirtyNineComponent', () => {
  let component: HomeUkBlogThirtyNineComponent;
  let fixture: ComponentFixture<HomeUkBlogThirtyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogThirtyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogThirtyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
