import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogFourtyFourComponent } from './home-en-blog-fourty-four.component';

describe('HomeEnBlogFourtyFourComponent', () => {
  let component: HomeEnBlogFourtyFourComponent;
  let fixture: ComponentFixture<HomeEnBlogFourtyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogFourtyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogFourtyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
