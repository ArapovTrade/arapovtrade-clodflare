import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogFourtyTwoComponent } from './home-ru-blog-fourty-two.component';

describe('HomeRuBlogFourtyTwoComponent', () => {
  let component: HomeRuBlogFourtyTwoComponent;
  let fixture: ComponentFixture<HomeRuBlogFourtyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogFourtyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogFourtyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
