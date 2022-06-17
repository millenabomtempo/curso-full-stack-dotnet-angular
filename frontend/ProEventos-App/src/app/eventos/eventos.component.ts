import { Component, OnInit } from '@angular/core';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any = [];
  public eventosFiltrados: any = [];
  private _filterList: string = '';

  widthImg: number = 150;
  marginImg: number = 2;
  showImg: boolean = true;

  constructor(
    private eventoService: EventoService
  ) { }

  ngOnInit(): void {
    this.getEventos();
  }

  public getEventos() {

    this.eventoService.getEvento().subscribe(
      response => {
        this.eventos = response;
        this.eventosFiltrados = this.eventos;
      },
      error => console.log(error)
    );
  }

  isImgShown() {
    this.showImg = !this.showImg;
  }

  filterEvents(filter: string): any {
    filter = filter.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string;  local: string;}) => evento.tema.toLocaleLowerCase().indexOf(filter) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filter) !== -1
    )
  }

  public get filterList() {
    return this._filterList;
  }

  public set filterList(value: string) {
    this._filterList = value;
    this.eventosFiltrados = this.filterList ? this.filterEvents(this.filterList) : this.eventos;
  }
}
