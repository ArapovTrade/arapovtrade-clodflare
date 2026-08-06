import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogFourtyThreeComponent } from './home-ru-blog-fourty-three.component';

describe('HomeRuBlogFourtyThreeComponent', () => {
  let component: HomeRuBlogFourtyThreeComponent;
  let fixture: ComponentFixture<HomeRuBlogFourtyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogFourtyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogFourtyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
