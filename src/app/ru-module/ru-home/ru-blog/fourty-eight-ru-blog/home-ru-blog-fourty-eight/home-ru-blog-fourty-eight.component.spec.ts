import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogFourtyEightComponent } from './home-ru-blog-fourty-eight.component';

describe('HomeRuBlogFourtyEightComponent', () => {
  let component: HomeRuBlogFourtyEightComponent;
  let fixture: ComponentFixture<HomeRuBlogFourtyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogFourtyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogFourtyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
