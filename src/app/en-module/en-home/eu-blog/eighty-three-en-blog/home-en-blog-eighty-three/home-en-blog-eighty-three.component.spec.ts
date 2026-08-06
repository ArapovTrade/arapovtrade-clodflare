import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogEightyThreeComponent } from './home-en-blog-eighty-three.component';

describe('HomeEnBlogEightyThreeComponent', () => {
  let component: HomeEnBlogEightyThreeComponent;
  let fixture: ComponentFixture<HomeEnBlogEightyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogEightyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogEightyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
