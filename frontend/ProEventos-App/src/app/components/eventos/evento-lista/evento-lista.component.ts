import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/model/Evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {

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
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEventos();
    this.spinner.show();
  }

  public getEventos(): void {
    this.eventoService.getEvento().subscribe({
      next: (eventosResponse: Evento[]) => {
        this.eventos = eventosResponse;
        this.eventosFiltrados = this.eventos;
      },
      error: (error) => {
        this.spinner.hide()
        this.toastr.error('Erro ao carregar os Eventos', '');
      },
      complete: () => this.spinner.hide()
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

  detalheEvento(id: number): void {
    this.router.navigate([`eventos/detalhe/${id}`]);
  }

}
