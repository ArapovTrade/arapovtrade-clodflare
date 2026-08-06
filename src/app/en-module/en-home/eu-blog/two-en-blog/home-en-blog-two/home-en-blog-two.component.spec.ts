import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogTwoComponent } from './home-en-blog-two.component';

describe('HomeEnBlogTwoComponent', () => {
  let component: HomeEnBlogTwoComponent;
  let fixture: ComponentFixture<HomeEnBlogTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
