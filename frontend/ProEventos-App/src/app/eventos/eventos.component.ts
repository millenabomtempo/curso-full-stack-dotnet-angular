import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Evento } from '../model/Evento';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {

  modalRef?: BsModalRef;

  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  private filteredList = '';

  widthImg = 150;
  marginImg = 2;
  showImg = true;

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getEventos();
  }

  public getEventos(): void {
    this.eventoService.getEvento().subscribe({
      next: (eventosResponse: Evento[]) => {
        this.eventos = eventosResponse;
        this.eventosFiltrados = this.eventos;
      },
      error: (error) => console.log(error)
    });
  }

  public isImgShown(): void {
    this.showImg = !this.showImg;
  }

  public filterEvents(filter: string): Evento[] {
    filter = filter.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string; local: string }) =>
        evento.tema.toLocaleLowerCase().indexOf(filter) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filter) !== -1
    );
  }

  public get filterList() {
    return this.filteredList;
  }

  public set filterList(value: string) {
    this.filteredList = value;
    this.eventosFiltrados = this.filterList
      ? this.filterEvents(this.filterList)
      : this.eventos;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.toastr.success('O Evento foi apagado com sucesso!', 'Apagado!');
  }

  decline(): void {
    this.modalRef?.hide();
  }
}
