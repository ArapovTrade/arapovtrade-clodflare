import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogEightyNineComponent } from './home-en-blog-eighty-nine.component';

describe('HomeEnBlogEightyNineComponent', () => {
  let component: HomeEnBlogEightyNineComponent;
  let fixture: ComponentFixture<HomeEnBlogEightyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogEightyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogEightyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
