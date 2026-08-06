import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogFourtySevenComponent } from './home-en-blog-fourty-seven.component';

describe('HomeEnBlogFourtySevenComponent', () => {
  let component: HomeEnBlogFourtySevenComponent;
  let fixture: ComponentFixture<HomeEnBlogFourtySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogFourtySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogFourtySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
