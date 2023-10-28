import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AcopioRoutingModule } from "./acopio-routing.module";
import { ChartistModule } from "ng-chartist";
import { AgmCoreModule } from "@agm/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { SwiperModule } from "ngx-swiper-wrapper";
import { PipeModule } from "../../../shared/pipes/pipe.module";
import { CustomFormsModule } from 'ngx-custom-validators';
import { ArchwizardModule } from 'angular-archwizard';
import { UiSwitchModule } from 'ngx-ui-switch';
import { TagInputModule } from 'ngx-chips';
import { QuillModule } from 'ngx-quill'
import { MatchHeightModule } from "../../../shared/directives/match-height.directive";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgbDateCustomParserFormatter } from "../../../shared/util/NgbDateCustomParserFormatter";
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

//import { MateriaPrimaListComponent } from "./operaciones/materiaprima/materiaprima-list/materiaprima-list.component";
/**import { DetalleCatalogoEditComponent }from './operaciones/detallecatalogo/edit/detallecatalogo-edit.component';
import { DetalleCatalogoComponent } from './operaciones/detallecatalogo/list/detallecatalogo-list.component';
import { EmpresaTransporteListComponent } from "./operaciones/empresatransporte/list/empresatransporte-list.component";
//import { TransporteListComponent } from './operaciones/transporte/list/transporte-list.component';
//import { TransporteEditComponent } from './operaciones/transporte/edit/transporte-edit.component';
import { EmpresaProveedoraListComponent } from './operaciones/empresaproveedora/list/empresaproveedora-list.component';
import { EmpresaProveedoraEditComponent } from './operaciones/empresaproveedora/edit/empresaproveedora-edit.component';
import { EmpresaTransporteEditComponent } from './operaciones/empresatransporte/edit/empresatransporte-edit.component';**/
//import { MateriaPrimaEditComponent } from "./operaciones/materiaprima/materiaprima-edit/materiaprima-edit.component";
/**import { PesadoCafeComponent } from "./operaciones/materiaprima/materiaprima-edit/pesadoCafe/pesadoCafe.component";
import { ControlCalidadComponent } from "./operaciones/materiaprima/materiaprima-edit/controlCalidad/seco/controlCalidad.component";
import { ControlCalidadComponentHumedo } from "./operaciones/materiaprima/materiaprima-edit/controlCalidad/humedo/controlCalidadHumedo.component";
import { NotaCompraComponent } from "./operaciones/materiaprima/materiaprima-edit/notacompra/notacompra.component";**/
import { NotaSalidaComponent } from './operaciones/notasalida/nota-salida.component';
//import { TagNotaSalidaEditComponent } from './operaciones/notasalida/notasalida-edit/notasalida/tag-notasalida.component';
//import { ModalModule } from '../modals/modal.module'
//import { CorrelativoPlantaListComponent } from './operaciones/correlativoplanta/list/correlativoplanta-list.component';
//import { CorrelativoPlantaEditComponent } from './operaciones/correlativoplanta/edit/correlativoplanta-edit.component';
//import { OrdenServicioComponent } from './operaciones/ordenservicio/orden-servicio.component';
//import { OrdenServicioEditComponent } from './operaciones/ordenservicio/ordenservicio-edit/ordenservicio-edit.component';
//import { IngresoAlmacenComponent } from './operaciones/ingresoalmacen/ingreso-almacen.component';
/**import { LotesComponent } from './operaciones/lotes/lotes.component';
import { LoteEditComponent } from './operaciones/lotes/lote-edit/lote-edit.component';**/
//import { TagOrdenServicioComponent } from './operaciones/ordenservicio/ordenservicio-edit/tag-ordenservicio/tag-ordenservicio.component'
//import { IngresoAlmacenEditComponent } from './operaciones/ingresoalmacen/ingresoalmacen-edit/ingresoalmacen-edit.component';
//import { DetalleLoteComponent } from "./operaciones/lotes/lote-edit/detalleLote/detalleLote.component";
//import { KardexComponent } from './operaciones/kardex/kardex.component';


@NgModule({
  imports: [
    CommonModule,
    AcopioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartistModule,
    AgmCoreModule,
    NgSelectModule,
    NgbModule,
    SwiperModule,
    PipeModule,
    NgxDatatableModule,
    CustomFormsModule,
    ArchwizardModule,
    UiSwitchModule,
    TagInputModule,
    QuillModule,
    MatchHeightModule,
    NgxSpinnerModule,
    //ModalModule
  ],
  declarations: [
    //CorrelativoPlantaEditComponent,
    //CorrelativoPlantaListComponent,
    //DetalleCatalogoEditComponent,
    //DetalleCatalogoComponent,
   // MateriaPrimaListComponent,
    /**EmpresaTransporteListComponent,
    TransporteListComponent,
    TransporteEditComponent,
    EmpresaProveedoraListComponent,
    EmpresaProveedoraEditComponent,
    EmpresaTransporteEditComponent,
    MateriaPrimaEditComponent,
    PesadoCafeComponent,
    ControlCalidadComponent,
    ControlCalidadComponentHumedo,**/
    //IngresoAlmacenComponent,
    //LotesComponent,
    NotaSalidaComponent,
    //OrdenServicioComponent,
    //OrdenServicioEditComponent,
    //NotaCompraComponent,
    //LoteEditComponent,
    //TagNotaSalidaEditComponent,
    //IngresoAlmacenEditComponent,
    //TagOrdenServicioComponent,
    //IngresoAlmacenEditComponent,
    //DetalleLoteComponent,
    //KardexComponent
  ],
  exports: [
    //TagNotaSalidaEditComponent,
   /* PesadoCafeComponent,
    ControlCalidadComponent,
    ControlCalidadComponentHumedo,
    
    OrdenServicioComponent,
    OrdenServicioEditComponent,
    TagOrdenServicioComponent,
    DetalleLoteComponent,**/
    //EmpresaProveedoraListComponent
  ],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ]
})
export class AcopioModule { }
