import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEuBlogThirtyNineComponent } from './home-eu-blog-thirty-nine.component';

describe('HomeEuBlogThirtyNineComponent', () => {
  let component: HomeEuBlogThirtyNineComponent;
  let fixture: ComponentFixture<HomeEuBlogThirtyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEuBlogThirtyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEuBlogThirtyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
