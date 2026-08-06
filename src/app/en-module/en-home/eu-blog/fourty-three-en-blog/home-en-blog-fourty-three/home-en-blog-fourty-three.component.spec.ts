import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogFourtyThreeComponent } from './home-en-blog-fourty-three.component';

describe('HomeEnBlogFourtyThreeComponent', () => {
  let component: HomeEnBlogFourtyThreeComponent;
  let fixture: ComponentFixture<HomeEnBlogFourtyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogFourtyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogFourtyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
