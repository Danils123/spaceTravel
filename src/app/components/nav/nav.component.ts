import { Component, OnInit } from '@angular/core';
import { PreLoadingService } from '../preloading/preLoading.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public whiteLogoClases: string[] = ['fadeIn'];
  public colorLogoClases: string[] = [];
  public hiddenBrand = false;
  public nick = 'Anonimus';
  constructor(public plService: PreLoadingService) {}
  ngOnInit(): void {
    this.plService.getObservable().subscribe(resp => {
      console.log('nav', resp);
      this.hiddenBrand = resp;
      if( this.hiddenBrand ) {
        this.colorLogoClases = ['fadeOut', 'slow'];
        this.whiteLogoClases = ['fadeIn', 'very slow'];
      }
    });

    this.plService.getObservableNick().subscribe(nick => this.nick = nick);
  }

}
