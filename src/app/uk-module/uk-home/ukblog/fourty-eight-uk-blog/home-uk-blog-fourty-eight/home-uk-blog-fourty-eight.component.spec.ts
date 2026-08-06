import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogFourtyEightComponent } from './home-uk-blog-fourty-eight.component';

describe('HomeUkBlogFourtyEightComponent', () => {
  let component: HomeUkBlogFourtyEightComponent;
  let fixture: ComponentFixture<HomeUkBlogFourtyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogFourtyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogFourtyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
