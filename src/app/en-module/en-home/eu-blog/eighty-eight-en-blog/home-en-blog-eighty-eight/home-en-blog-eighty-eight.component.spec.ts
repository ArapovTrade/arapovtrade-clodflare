import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogEightyEightComponent } from './home-en-blog-eighty-eight.component';

describe('HomeEnBlogEightyEightComponent', () => {
  let component: HomeEnBlogEightyEightComponent;
  let fixture: ComponentFixture<HomeEnBlogEightyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogEightyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogEightyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
