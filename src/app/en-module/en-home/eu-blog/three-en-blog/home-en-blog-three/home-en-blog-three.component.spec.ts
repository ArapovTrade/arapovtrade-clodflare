import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogThreeComponent } from './home-en-blog-three.component';

describe('HomeEnBlogThreeComponent', () => {
  let component: HomeEnBlogThreeComponent;
  let fixture: ComponentFixture<HomeEnBlogThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
