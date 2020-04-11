import { Component, OnInit } from '@angular/core';
import { PreLoadingService } from './preloading/preLoading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'preloading';


  constructor() {}
  ngOnInit(): void {
  }
}
