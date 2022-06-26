import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  @Input() title: string = '';
  @Input() iconClass = 'fa fa-user';
  @Input() subtitle = 'Desde 2021';
  @Input() listButton = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  listar() {
    this.router.navigate([`/${this.title.toLocaleLowerCase()}/lista`])
  }
}
