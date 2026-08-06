import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogFourComponent } from './home-en-blog-four.component';

describe('HomeEnBlogFourComponent', () => {
  let component: HomeEnBlogFourComponent;
  let fixture: ComponentFixture<HomeEnBlogFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
