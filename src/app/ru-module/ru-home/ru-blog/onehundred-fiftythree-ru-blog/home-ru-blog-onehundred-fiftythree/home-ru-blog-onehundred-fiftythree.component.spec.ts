import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredFiftythreeComponent } from './home-ru-blog-onehundred-fiftythree.component';

describe('HomeRuBlogOnehundredFiftythreeComponent', () => {
  let component: HomeRuBlogOnehundredFiftythreeComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredFiftythreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredFiftythreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredFiftythreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
