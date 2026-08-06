import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogEightyTwoComponent } from './home-en-blog-eighty-two.component';

describe('HomeEnBlogEightyTwoComponent', () => {
  let component: HomeEnBlogEightyTwoComponent;
  let fixture: ComponentFixture<HomeEnBlogEightyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogEightyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogEightyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
