import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogFourtyThreeComponent } from './home-uk-blog-fourty-three.component';

describe('HomeUkBlogFourtyThreeComponent', () => {
  let component: HomeUkBlogFourtyThreeComponent;
  let fixture: ComponentFixture<HomeUkBlogFourtyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogFourtyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogFourtyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
