import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogFiveComponent } from './home-en-blog-five.component';

describe('HomeEnBlogFiveComponent', () => {
  let component: HomeEnBlogFiveComponent;
  let fixture: ComponentFixture<HomeEnBlogFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
