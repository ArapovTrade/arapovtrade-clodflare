import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogFourtyEightComponent } from './home-en-blog-fourty-eight.component';

describe('HomeEnBlogFourtyEightComponent', () => {
  let component: HomeEnBlogFourtyEightComponent;
  let fixture: ComponentFixture<HomeEnBlogFourtyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogFourtyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogFourtyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
