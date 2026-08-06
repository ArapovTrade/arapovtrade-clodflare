import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogThirteenComponent } from './home-uk-blog-thirteen.component';

describe('HomeUkBlogThirteenComponent', () => {
  let component: HomeUkBlogThirteenComponent;
  let fixture: ComponentFixture<HomeUkBlogThirteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogThirteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogThirteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
