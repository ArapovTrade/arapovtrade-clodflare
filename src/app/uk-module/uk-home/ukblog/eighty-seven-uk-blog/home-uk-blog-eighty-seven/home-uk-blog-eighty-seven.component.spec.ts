import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogEightySevenComponent } from './home-uk-blog-eighty-seven.component';

describe('HomeUkBlogEightySevenComponent', () => {
  let component: HomeUkBlogEightySevenComponent;
  let fixture: ComponentFixture<HomeUkBlogEightySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogEightySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogEightySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
