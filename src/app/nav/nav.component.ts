import { Component, OnInit } from '@angular/core';
import { PreLoadingService } from '../preloading/preLoading.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public plService: PreLoadingService) {}
  public hiddenBrand = true;
  ngOnInit(): void {
    this.plService.getObservable().subscribe(resp => this.hiddenBrand = resp);
  }

}
