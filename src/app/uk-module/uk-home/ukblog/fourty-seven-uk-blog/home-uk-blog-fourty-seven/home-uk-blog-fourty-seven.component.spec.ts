import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogFourtySevenComponent } from './home-uk-blog-fourty-seven.component';

describe('HomeUkBlogFourtySevenComponent', () => {
  let component: HomeUkBlogFourtySevenComponent;
  let fixture: ComponentFixture<HomeUkBlogFourtySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogFourtySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogFourtySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
