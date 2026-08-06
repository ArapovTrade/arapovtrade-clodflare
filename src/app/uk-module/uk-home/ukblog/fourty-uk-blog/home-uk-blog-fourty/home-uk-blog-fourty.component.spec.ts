import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogFourtyComponent } from './home-uk-blog-fourty.component';

describe('HomeUkBlogFourtyComponent', () => {
  let component: HomeUkBlogFourtyComponent;
  let fixture: ComponentFixture<HomeUkBlogFourtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogFourtyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogFourtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
