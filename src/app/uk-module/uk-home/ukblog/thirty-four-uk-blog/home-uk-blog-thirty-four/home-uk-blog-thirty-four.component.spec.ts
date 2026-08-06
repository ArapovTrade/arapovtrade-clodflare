import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogThirtyFourComponent } from './home-uk-blog-thirty-four.component';

describe('HomeUkBlogThirtyFourComponent', () => {
  let component: HomeUkBlogThirtyFourComponent;
  let fixture: ComponentFixture<HomeUkBlogThirtyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogThirtyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogThirtyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
