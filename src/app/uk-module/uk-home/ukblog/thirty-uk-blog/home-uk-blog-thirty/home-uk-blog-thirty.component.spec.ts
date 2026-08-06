import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogThirtyComponent } from './home-uk-blog-thirty.component';

describe('HomeUkBlogThirtyComponent', () => {
  let component: HomeUkBlogThirtyComponent;
  let fixture: ComponentFixture<HomeUkBlogThirtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogThirtyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogThirtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
