import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit() { }

  logout() {
    this.localStorageService.clear();
    this.router.navigate(['/'])
  }

}
