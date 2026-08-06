import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogFourtyFourComponent } from './home-uk-blog-fourty-four.component';

describe('HomeUkBlogFourtyFourComponent', () => {
  let component: HomeUkBlogFourtyFourComponent;
  let fixture: ComponentFixture<HomeUkBlogFourtyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogFourtyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogFourtyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
