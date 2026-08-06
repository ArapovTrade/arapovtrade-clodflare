import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogFourtyNineComponent } from './home-uk-blog-fourty-nine.component';

describe('HomeUkBlogFourtyNineComponent', () => {
  let component: HomeUkBlogFourtyNineComponent;
  let fixture: ComponentFixture<HomeUkBlogFourtyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogFourtyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogFourtyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
