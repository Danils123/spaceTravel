import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PreLoadingService } from '../preloading/preLoading.service';
import { UsersService } from '../../shared/services/users.service';
import { particles } from '../../shared/models/particles';

declare let particlesJS: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public particles = particles;
  public secundaryTitleClases: string[] = [];
  public titleClases: string[] = [];
  public subTitleClases: string[] = [];
  public isAsteriousInvoked: boolean;
  public isAnimationsOff = false;
  public isPreloadingFinish: boolean;
  @ViewChild('background', {static: true}) background: ElementRef;
  constructor(
    public db: AngularFirestore,
    public plService: PreLoadingService,
    public us: UsersService
  ) { }

  ngOnInit() {
    particlesJS.load('particles-js', 'assets/json/particlesjs-config.json', () => {
      console.log('callback - particles-js config loaded');
    });

    this.plService.getObservable().subscribe(resp => {
      this.isPreloadingFinish = resp;
      this.subTitleClases = ['fadeInDown ',  'slow '];
      this.titleClases = ['fadeInUp ', 'slow '];
      this.secundaryTitleClases = ['fadeIn ', 'very ', 'slow ', 'delay-1s'];
    });

    this.db.collection('constants').doc('asteriuosInvoked').get()
      .subscribe(isAsteriuosInvoked => {
        this.isAsteriousInvoked = isAsteriuosInvoked.get('value');
        this.db.collection('constants').doc('asteriuosInvoked').valueChanges().subscribe((resp) => {
          // tslint:disable-next-line:no-string-literal
          // tslint:disable-next-line:no-string-literal
          if (this.isAsteriousInvoked !== resp['value']) {
            this.titleClases = ['heartBeat '];
            this.secundaryTitleClases = ['fadeIn ', 'slow '];
          }

          if (!this.isAsteriousInvoked) {
            this.titleClases = [' '];
          }
          // tslint:disable-next-line:no-string-literal
          this.isAsteriousInvoked = resp['value'];
        });
      });
  }

  callAsterious() {
    this.titleClases = ['heartBeat '];
    this.us.invokeAsterius().subscribe(resp => {
      console.log(resp);
    });
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
