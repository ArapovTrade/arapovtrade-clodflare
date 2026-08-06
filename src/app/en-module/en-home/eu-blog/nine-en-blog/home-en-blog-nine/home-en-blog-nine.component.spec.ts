import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogNineComponent } from './home-en-blog-nine.component';

describe('HomeEnBlogNineComponent', () => {
  let component: HomeEnBlogNineComponent;
  let fixture: ComponentFixture<HomeEnBlogNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
