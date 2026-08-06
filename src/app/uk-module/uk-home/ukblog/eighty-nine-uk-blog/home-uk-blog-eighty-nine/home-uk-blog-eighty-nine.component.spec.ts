import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogEightyNineComponent } from './home-uk-blog-eighty-nine.component';

describe('HomeUkBlogEightyNineComponent', () => {
  let component: HomeUkBlogEightyNineComponent;
  let fixture: ComponentFixture<HomeUkBlogEightyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogEightyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogEightyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
