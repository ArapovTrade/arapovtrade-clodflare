import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogEighteenComponent } from './home-uk-blog-eighteen.component';

describe('HomeUkBlogEighteenComponent', () => {
  let component: HomeUkBlogEighteenComponent;
  let fixture: ComponentFixture<HomeUkBlogEighteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogEighteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogEighteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
