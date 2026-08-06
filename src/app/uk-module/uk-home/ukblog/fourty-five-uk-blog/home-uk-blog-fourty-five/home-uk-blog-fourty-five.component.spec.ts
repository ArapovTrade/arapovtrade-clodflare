import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogFourtyFiveComponent } from './home-uk-blog-fourty-five.component';

describe('HomeUkBlogFourtyFiveComponent', () => {
  let component: HomeUkBlogFourtyFiveComponent;
  let fixture: ComponentFixture<HomeUkBlogFourtyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogFourtyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogFourtyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
