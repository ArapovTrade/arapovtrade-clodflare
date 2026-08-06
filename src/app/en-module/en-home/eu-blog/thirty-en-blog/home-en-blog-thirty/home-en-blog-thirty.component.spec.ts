import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogThirtyComponent } from './home-en-blog-thirty.component';

describe('HomeEnBlogThirtyComponent', () => {
  let component: HomeEnBlogThirtyComponent;
  let fixture: ComponentFixture<HomeEnBlogThirtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogThirtyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogThirtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
