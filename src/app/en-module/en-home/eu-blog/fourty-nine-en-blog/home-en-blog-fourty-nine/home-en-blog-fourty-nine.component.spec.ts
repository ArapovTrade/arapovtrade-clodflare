import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogFourtyNineComponent } from './home-en-blog-fourty-nine.component';

describe('HomeEnBlogFourtyNineComponent', () => {
  let component: HomeEnBlogFourtyNineComponent;
  let fixture: ComponentFixture<HomeEnBlogFourtyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogFourtyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogFourtyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
