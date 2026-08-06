import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogEightyOneComponent } from './home-uk-blog-eighty-one.component';

describe('HomeUkBlogEightyOneComponent', () => {
  let component: HomeUkBlogEightyOneComponent;
  let fixture: ComponentFixture<HomeUkBlogEightyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogEightyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogEightyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
