import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogThirteenComponent } from './home-en-blog-thirteen.component';

describe('HomeEnBlogThirteenComponent', () => {
  let component: HomeEnBlogThirteenComponent;
  let fixture: ComponentFixture<HomeEnBlogThirteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogThirteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogThirteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
