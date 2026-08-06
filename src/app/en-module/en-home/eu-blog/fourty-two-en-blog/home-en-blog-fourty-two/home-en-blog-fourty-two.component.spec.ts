import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogFourtyTwoComponent } from './home-en-blog-fourty-two.component';

describe('HomeEnBlogFourtyTwoComponent', () => {
  let component: HomeEnBlogFourtyTwoComponent;
  let fixture: ComponentFixture<HomeEnBlogFourtyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogFourtyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogFourtyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
