import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogFourtyOneComponent } from './home-ru-blog-fourty-one.component';

describe('HomeRuBlogFourtyOneComponent', () => {
  let component: HomeRuBlogFourtyOneComponent;
  let fixture: ComponentFixture<HomeRuBlogFourtyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogFourtyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogFourtyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
