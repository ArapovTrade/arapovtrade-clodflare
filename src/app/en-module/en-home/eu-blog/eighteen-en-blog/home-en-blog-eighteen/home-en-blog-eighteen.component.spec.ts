import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogEighteenComponent } from './home-en-blog-eighteen.component';

describe('HomeEnBlogEighteenComponent', () => {
  let component: HomeEnBlogEighteenComponent;
  let fixture: ComponentFixture<HomeEnBlogEighteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogEighteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogEighteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
