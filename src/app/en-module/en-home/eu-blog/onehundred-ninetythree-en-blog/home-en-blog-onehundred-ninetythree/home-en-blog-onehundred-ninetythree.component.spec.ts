import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredNinetythreeComponent } from './home-en-blog-onehundred-ninetythree.component';

describe('HomeEnBlogOnehundredNinetythreeComponent', () => {
  let component: HomeEnBlogOnehundredNinetythreeComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredNinetythreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredNinetythreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredNinetythreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
