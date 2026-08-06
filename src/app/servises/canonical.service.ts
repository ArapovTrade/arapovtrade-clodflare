import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root',
})
export class CanonicalService {
  constructor(private meta: Meta) {}

  setCanonicalURL(url?: string) {
     

    const canURL = url === undefined ? window.location.href : url;
    let link: HTMLLinkElement | null = document.querySelector(
      'link[rel="canonical"]'
    );

    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }

    link.setAttribute('href', canURL);
  }
}
