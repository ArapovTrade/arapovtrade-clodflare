import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogFourtyFourComponent } from './home-ru-blog-fourty-four.component';

describe('HomeRuBlogFourtyFourComponent', () => {
  let component: HomeRuBlogFourtyFourComponent;
  let fixture: ComponentFixture<HomeRuBlogFourtyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogFourtyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogFourtyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
