import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogEightyComponent } from './home-uk-blog-eighty.component';

describe('HomeUkBlogEightyComponent', () => {
  let component: HomeUkBlogEightyComponent;
  let fixture: ComponentFixture<HomeUkBlogEightyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogEightyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogEightyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
