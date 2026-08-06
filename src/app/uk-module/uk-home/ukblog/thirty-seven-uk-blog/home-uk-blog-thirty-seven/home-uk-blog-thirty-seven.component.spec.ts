import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogThirtySevenComponent } from './home-uk-blog-thirty-seven.component';

describe('HomeUkBlogThirtySevenComponent', () => {
  let component: HomeUkBlogThirtySevenComponent;
  let fixture: ComponentFixture<HomeUkBlogThirtySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogThirtySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogThirtySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
