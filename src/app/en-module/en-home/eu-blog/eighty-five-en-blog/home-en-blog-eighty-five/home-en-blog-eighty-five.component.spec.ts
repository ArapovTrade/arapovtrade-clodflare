import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogEightyFiveComponent } from './home-en-blog-eighty-five.component';

describe('HomeEnBlogEightyFiveComponent', () => {
  let component: HomeEnBlogEightyFiveComponent;
  let fixture: ComponentFixture<HomeEnBlogEightyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogEightyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogEightyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
