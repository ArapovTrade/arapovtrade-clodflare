import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredFiftythreeComponent } from './home-en-blog-onehundred-fiftythree.component';

describe('HomeEnBlogOnehundredFiftythreeComponent', () => {
  let component: HomeEnBlogOnehundredFiftythreeComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredFiftythreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredFiftythreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredFiftythreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
