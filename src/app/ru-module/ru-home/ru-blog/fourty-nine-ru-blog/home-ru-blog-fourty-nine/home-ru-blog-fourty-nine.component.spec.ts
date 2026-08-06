import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogFourtyNineComponent } from './home-ru-blog-fourty-nine.component';

describe('HomeRuBlogFourtyNineComponent', () => {
  let component: HomeRuBlogFourtyNineComponent;
  let fixture: ComponentFixture<HomeRuBlogFourtyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogFourtyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogFourtyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
