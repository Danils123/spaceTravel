import { Component, OnInit } from '@angular/core';
import { PreLoadingService } from './preLoading.service';

@Component({
  selector: 'app-preloading',
  templateUrl: './preloading.component.html',
  styleUrls: ['./preloading.component.css']
})
export class PreloadingComponent implements OnInit {
  public imageClases: string[] = ['fadeInUp', 'slow'];
  public containerClases = 'justify-content-center';
  public isHide = false;
  constructor(public plService: PreLoadingService) { }

  ngOnInit() {
    setTimeout(() => {
      this.imageClases = ['fadeOut'];
    }, 4000);
    setTimeout(() => {
      this.plService.hideBrand();
      this.isHide = true;
  }, 5550);
  }

}
