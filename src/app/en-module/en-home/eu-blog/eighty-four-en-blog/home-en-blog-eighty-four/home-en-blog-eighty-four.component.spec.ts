import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogEightyFourComponent } from './home-en-blog-eighty-four.component';

describe('HomeEnBlogEightyFourComponent', () => {
  let component: HomeEnBlogEightyFourComponent;
  let fixture: ComponentFixture<HomeEnBlogEightyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogEightyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogEightyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
