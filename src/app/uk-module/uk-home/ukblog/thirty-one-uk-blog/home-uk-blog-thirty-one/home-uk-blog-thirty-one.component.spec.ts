import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogThirtyOneComponent } from './home-uk-blog-thirty-one.component';

describe('HomeUkBlogThirtyOneComponent', () => {
  let component: HomeUkBlogThirtyOneComponent;
  let fixture: ComponentFixture<HomeUkBlogThirtyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogThirtyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogThirtyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
