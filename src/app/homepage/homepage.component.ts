import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  @ViewChild('background', {static: true}) background: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  @HostListener('window:scroll', []) onWindowScroll() {
    // do some stuff here when the window is scrolled
      const topDistance = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (topDistance < 120 ) {
        const listLayers: Element[] = this.background.nativeElement.getElementsByClassName('layer');
        for (const layer of listLayers) {
          const movement = -(topDistance * Number(layer.getAttribute('data-depth')));
          const translate3d = `translate3d(0,  ${movement}px, 0)`;
          layer.setAttribute('style', `-webkit-transform: ${translate3d};`);
          layer.setAttribute('style', `-moz-transform: ${translate3d};`);
          layer.setAttribute('style', `-ms-transform: ${translate3d};`);
          layer.setAttribute('style', `-o-transform: ${translate3d};`);
          layer.setAttribute('style', `transform: ${translate3d};`);
        }
      }
  }

}
