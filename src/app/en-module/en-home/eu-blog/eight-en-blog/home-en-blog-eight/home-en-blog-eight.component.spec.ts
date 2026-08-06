import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogEightComponent } from './home-en-blog-eight.component';

describe('HomeEnBlogEightComponent', () => {
  let component: HomeEnBlogEightComponent;
  let fixture: ComponentFixture<HomeEnBlogEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
