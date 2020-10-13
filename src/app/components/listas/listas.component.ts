import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { AlertController, IonLabel, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild( IonList, null) lista:IonList;
  @Input() terminada = true;

  constructor(public deseosService:DeseosService,
              private router:Router,
              private alertCtrl:AlertController) { }

  ngOnInit() {}

  listaSeleccionada(lista:Lista){
    if(this.terminada){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
    }
  }

  borrarLista(lista:Lista){
    this.deseosService.borrarLista(lista);
  }

  async editarLista(lista:Lista){
    //

    const alert = await this.alertCtrl.create({
      header: 'Editar Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            console.log(data);
            if(data.titulo.length === 0){
              return;
            }

            this.deseosService.editarLista(lista.id, data.titulo);
            this.lista.closeSlidingItems();
            //this.router.navigateByUrl(`/tabs/tab1/agregar/${ listaId }`);
          }
        }
      ]
    });

    alert.present();
  }
}
