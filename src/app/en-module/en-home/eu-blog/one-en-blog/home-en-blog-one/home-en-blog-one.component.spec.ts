import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOneComponent } from './home-en-blog-one.component';

describe('HomeEnBlogOneComponent', () => {
  let component: HomeEnBlogOneComponent;
  let fixture: ComponentFixture<HomeEnBlogOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
