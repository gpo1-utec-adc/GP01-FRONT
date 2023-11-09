import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { DatatableComponent } from "@swimlane/ngx-datatable";

import { ConciliacionService } from '../../../../../Services/conciliacion.service';
import { DateUtil } from '../../../../../Services/util/date-util';
import { HeaderExcel } from '../../../../../Services/models/headerexcel.model';
import { ExcelService } from '../../../../../shared/util/excel.service';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-nota-salida',
  templateUrl: './nota-salida.component.html',
  styleUrls: ['./nota-salida.component.scss', '/assets/sass/libs/datatables.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotaSalidaComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private dateUtil: DateUtil,
    private spinner: NgxSpinnerService,
    private excelService: ExcelService,
    private conciliacionService: ConciliacionService) { }

  notaSalidaForm: any;
  selectEstadoDev: any;
  selectEstado: any;
  error: any = { isError: false, errorMessage: '' };
  errorGeneral: any = { isError: false, errorMessage: '' };
  mensajeErrorGenerico: string = "Ocurrio un error interno.";
  errorFecha: any = { isError: false, errorMessage: '' };
  rows: any[] = [];
  tempData = [];
  submitted: boolean = false;
  limitRef = 10;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  selected = [];
  vSessionUser: any;
  readonly: boolean;

  estado : any = [
    {
       id: 1,
       name:"RETENIDO",       
       checked: true
    },
    {
      id: 2,
      name:"CONTRACARGADO",
      content: "2",
      checked: false
    },
    {
      id: 3,
      name:"PENDIENTE",
      content: "3",
      checked: false
    },
    {
      id: 4,
      name:"ABONADO",
      content: "4",
      checked: false
    }
     ]

     estadoDevolucion : any = [
      {
         id: 1,
         name:"DEVOLUCION TOTAL",       
         checked: false
      },
      {
        id: 2,
        name:"DEVOLUCION PARCIAL",
        content: "2",
        checked: true
      }
       ]

  ngOnInit(): void {
    this.LoadForm();
  }

  get f() {
    return this.notaSalidaForm.value;
  }

  LoadForm(): void {
    this.notaSalidaForm = this.fb.group({
      estadoDevolucion: [, [Validators.required]],
      estado: [, [Validators.required]],
      codigoComercio: ['', [Validators.minLength(5), Validators.maxLength(20), Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
      autorizacion: ['', [Validators.minLength(5), Validators.maxLength(20), Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
      fechaProceso: [, [Validators.required]]
      

    });
    this.notaSalidaForm.setValidators(this.comparisonValidator());
  }

  comparisonValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      if (!group.value.fechaProceso) {
        this.errorGeneral = { isError: true, errorMessage: 'Por favor seleccione una fecha de Proceso.' };
      }else if (!group.value.estadoDevolucion) {
        this.errorGeneral = { isError: true, errorMessage: 'Por favor seleccione un estado de devolucion.' };
      } else if (!group.value.estado) {
        this.errorGeneral = { isError: true, errorMessage: 'Por favor seleccione un estado.' };
      } else {
        this.errorGeneral = { isError: false, errorMessage: '' };
      }
      return;
    };
  }


  compareTwoDates(): void {
    let vBeginDate = new Date(this.notaSalidaForm.value.fechaInicio);
    let vEndDate = new Date(this.notaSalidaForm.value.fechaFin);

    var anioFechaInicio = vBeginDate.getFullYear()
    var anioFechaFin = vEndDate.getFullYear()

    if (vEndDate < vBeginDate) {
      this.error = { isError: true, errorMessage: 'La fecha fin no puede ser anterior a la fecha inicio.' };
      this.notaSalidaForm.value.fechaInicio.setErrors({ isError: true })
    } else if (this.dateUtil.restarAnio(anioFechaInicio, anioFechaFin) > 2) {
      this.error = { isError: true, errorMessage: 'Por favor el Rango de fechas no puede ser mayor a 2 años.' };
      this.notaSalidaForm.value.fechaFin.setErrors({ isError: true })
    } else {
      this.error = { isError: false, errorMessage: '' };
    }
  }

  updateLimit(limit: any) {
    this.limitRef = limit.target.value;
  }

  filterUpdate(event: any) {
    const val = event.target.value.toLowerCase();
    const temp = this.tempData.filter(function (d) {
      return d.Numero.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  onSelectCheck(row: any) {
    return this.selected.indexOf(row) === -1;
  }

  Buscar(): void {
    if (this.notaSalidaForm.invalid || this.errorGeneral.isError) {
      this.submitted = true;
      return;
    } else {
      this.selected = [];
      this.submitted = false;
      
        var request = 
        {
            "autorizacion": this.notaSalidaForm.value.autorizacion == '' ? null : this.notaSalidaForm.value.autorizacion,
            "codigoComercio": this.notaSalidaForm.value.codigoComercio == '' ? null : this.notaSalidaForm.value.codigoComercio,
            "estado": this.obtenerDescriptionEstado(this.notaSalidaForm.value.estado),
            "estadoDevolucion": this.obtenerDescriptionEstadoDevolucion(this.notaSalidaForm.value.estadoDevolucion), 
            "fechaProceso":  this.notaSalidaForm.value.fechaProceso
        }
       

      this.spinner.show();

      this.conciliacionService.Search(request)
        .subscribe(res => {
          this.spinner.hide();
          this.tempData = res;
              this.rows = [...this.tempData];
        },
        (err: any) => {
          console.log(err);
          this.errorGeneral = { isError: true, errorMessage: this.mensajeErrorGenerico };
        }
        );
    }
  }

  obtenerDescriptionEstadoDevolucion(id : any){
    const select = this.estadoDevolucion.filter(x => x.id == id);
    return select[0].name;
  }

  obtenerDescriptionEstado(id : any){
    const select = this.estado.filter(x => x.id == id);
    return select[0].name;
  }

 
 

  Export(): void {
    this.spinner.show();
    const request = {
      Numero: this.notaSalidaForm.value.nroNotaSalida,
      EmpresaIdDestino: this.notaSalidaForm.value.destinatario ?? null,
      EmpresaTransporteId: this.notaSalidaForm.value.transportista ?? null,
      AlmacenId: this.notaSalidaForm.value.almacen ?? '',
      MotivoTrasladoId: this.notaSalidaForm.value.motivo ?? '',
      FechaInicio: this.notaSalidaForm.value.fechaInicio,
      FechaFin: this.notaSalidaForm.value.fechaFin,
      EmpresaId: this.vSessionUser.Result.Data.EmpresaId
    }

    this.conciliacionService.Search(request)
      .subscribe(res => {
        this.spinner.hide();
        if (res.Result.Success) {
          if (!res.Result.ErrCode) {
            const vArrHeaderExcel: HeaderExcel[] = [
              new HeaderExcel("Nota Salida", "center"),
              new HeaderExcel("Almacén"),
              new HeaderExcel("Destinatario"),
              new HeaderExcel("Motivo"),
              new HeaderExcel("Transportista"),
              new HeaderExcel("Cant. Lotes", "right"),
              new HeaderExcel("Total Peso Bruto KGS", "right"),
              new HeaderExcel("Estado")
            ];
            let vArrData: any[] = [];
            for (let i = 0; i < res.Result.Data.length; i++) {
              vArrData.push([
                res.Result.Data[i].Numero,
                res.Result.Data[i].Almacen,
                res.Result.Data[i].Destinatario,
                res.Result.Data[i].Motivo,
                res.Result.Data[i].Transportista,
                res.Result.Data[i].CantidadLotes,
                res.Result.Data[i].PesoKilosBrutos,
                res.Result.Data[i].Estado
              ]);
            }
            this.excelService.ExportJSONAsExcel(vArrHeaderExcel, vArrData, 'DatosNotaSalida');
          } else if (res.Result.Message && res.Result.ErrCode) {
            this.errorGeneral = { isError: true, errorMessage: res.Result.Message };
          } else {
            this.errorGeneral = { isError: true, errorMessage: this.mensajeErrorGenerico };
          }
        } else {
          this.errorGeneral = { isError: true, errorMessage: this.mensajeErrorGenerico };
        }
      },
        err => {
          this.spinner.hide();
          console.error(err);
          this.errorGeneral = { isError: true, errorMessage: this.mensajeErrorGenerico };
        }
      );
  }

}
