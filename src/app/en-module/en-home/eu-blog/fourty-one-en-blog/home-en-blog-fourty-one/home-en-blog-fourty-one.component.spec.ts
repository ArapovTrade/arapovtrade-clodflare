import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogFourtyOneComponent } from './home-en-blog-fourty-one.component';

describe('HomeEnBlogFourtyOneComponent', () => {
  let component: HomeEnBlogFourtyOneComponent;
  let fixture: ComponentFixture<HomeEnBlogFourtyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogFourtyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogFourtyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
