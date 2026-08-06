import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogFourtySevenComponent } from './home-ru-blog-fourty-seven.component';

describe('HomeRuBlogFourtySevenComponent', () => {
  let component: HomeRuBlogFourtySevenComponent;
  let fixture: ComponentFixture<HomeRuBlogFourtySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogFourtySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogFourtySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
