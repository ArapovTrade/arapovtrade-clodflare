import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogEightyComponent } from './home-en-blog-eighty.component';

describe('HomeEnBlogEightyComponent', () => {
  let component: HomeEnBlogEightyComponent;
  let fixture: ComponentFixture<HomeEnBlogEightyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogEightyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogEightyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
