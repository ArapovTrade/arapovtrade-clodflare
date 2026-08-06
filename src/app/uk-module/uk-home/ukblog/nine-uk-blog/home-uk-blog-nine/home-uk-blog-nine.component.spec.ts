import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogNineComponent } from './home-uk-blog-nine.component';

describe('HomeUkBlogNineComponent', () => {
  let component: HomeUkBlogNineComponent;
  let fixture: ComponentFixture<HomeUkBlogNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
