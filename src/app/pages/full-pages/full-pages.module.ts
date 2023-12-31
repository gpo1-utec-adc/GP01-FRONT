import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FullPagesRoutingModule } from "./full-pages-routing.module";
import { ChartistModule } from "ng-chartist";
import { AgmCoreModule } from "@agm/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { SwiperModule } from "ngx-swiper-wrapper";
import { HomeComponent } from "./home/home.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { AcopioModule } from "./acopio/acopio.module";
//import { MConsultarProductorComponent } from './modals/consultarproductor/m-consultar-productor.component';
import { ListFilterPipe } from '../../shared/pipes/listFilter.pipe';
import { FileUploadModule } from 'ng2-file-upload';
@NgModule({
  imports: [
    CommonModule,
    FullPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartistModule,
    AgmCoreModule,
    NgSelectModule,
    NgbModule,
    SwiperModule,
    NgxDatatableModule,
    AcopioModule,
    FileUploadModule,
  ],
  declarations: [
    HomeComponent,
    //MConsultarProductorComponent,
    ListFilterPipe
  ]
 
})
export class FullPagesModule { }
