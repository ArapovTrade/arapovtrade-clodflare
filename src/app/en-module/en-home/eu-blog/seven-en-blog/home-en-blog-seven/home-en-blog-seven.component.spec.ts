import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogSevenComponent } from './home-en-blog-seven.component';

describe('HomeEnBlogSevenComponent', () => {
  let component: HomeEnBlogSevenComponent;
  let fixture: ComponentFixture<HomeEnBlogSevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogSevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogSevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
