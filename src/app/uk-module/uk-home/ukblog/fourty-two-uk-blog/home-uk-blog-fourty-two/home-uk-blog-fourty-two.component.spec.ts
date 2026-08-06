import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogFourtyTwoComponent } from './home-uk-blog-fourty-two.component';

describe('HomeUkBlogFourtyTwoComponent', () => {
  let component: HomeUkBlogFourtyTwoComponent;
  let fixture: ComponentFixture<HomeUkBlogFourtyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogFourtyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogFourtyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
