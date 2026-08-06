import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogEightyOneComponent } from './home-en-blog-eighty-one.component';

describe('HomeEnBlogEightyOneComponent', () => {
  let component: HomeEnBlogEightyOneComponent;
  let fixture: ComponentFixture<HomeEnBlogEightyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogEightyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogEightyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
