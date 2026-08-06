import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogEightySevenComponent } from './home-en-blog-eighty-seven.component';

describe('HomeEnBlogEightySevenComponent', () => {
  let component: HomeEnBlogEightySevenComponent;
  let fixture: ComponentFixture<HomeEnBlogEightySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogEightySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogEightySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
