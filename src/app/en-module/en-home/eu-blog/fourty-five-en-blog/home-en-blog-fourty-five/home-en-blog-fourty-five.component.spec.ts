import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogFourtyFiveComponent } from './home-en-blog-fourty-five.component';

describe('HomeEnBlogFourtyFiveComponent', () => {
  let component: HomeEnBlogFourtyFiveComponent;
  let fixture: ComponentFixture<HomeEnBlogFourtyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogFourtyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogFourtyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
