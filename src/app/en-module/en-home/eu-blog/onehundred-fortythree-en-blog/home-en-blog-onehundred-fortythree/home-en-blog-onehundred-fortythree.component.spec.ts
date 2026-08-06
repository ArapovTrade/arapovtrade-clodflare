import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredFortythreeComponent } from './home-en-blog-onehundred-fortythree.component';

describe('HomeEnBlogOnehundredFortythreeComponent', () => {
  let component: HomeEnBlogOnehundredFortythreeComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredFortythreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredFortythreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredFortythreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
