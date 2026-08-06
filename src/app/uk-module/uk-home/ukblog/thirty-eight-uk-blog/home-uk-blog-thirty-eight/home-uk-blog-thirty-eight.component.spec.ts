import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogThirtyEightComponent } from './home-uk-blog-thirty-eight.component';

describe('HomeUkBlogThirtyEightComponent', () => {
  let component: HomeUkBlogThirtyEightComponent;
  let fixture: ComponentFixture<HomeUkBlogThirtyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogThirtyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogThirtyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
