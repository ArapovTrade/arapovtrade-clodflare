import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogFourtyOneComponent } from './home-uk-blog-fourty-one.component';

describe('HomeUkBlogFourtyOneComponent', () => {
  let component: HomeUkBlogFourtyOneComponent;
  let fixture: ComponentFixture<HomeUkBlogFourtyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogFourtyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogFourtyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
