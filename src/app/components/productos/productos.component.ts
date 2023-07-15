import { Component } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  listProductos: any[]= [];
  accion = 'agregar';
  form: FormGroup;
  id: number | undefined;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private _productoService: ProductoService){
     this.form = this.fb.group({
        idcategoria:['',Validators.required],
        codigo:['',Validators.required],
        nombre:['',Validators.required],
        precio_venta:['',Validators.required],
        stock:['',Validators.required],
        descripcion:['',Validators.required],
        imagen:['',Validators.required],
        estado:['',Validators.required]
     })
  }
  obtenerProducto(){
    this._productoService.GetListProductos().subscribe(data =>{
      console.log(data);
      this.listProductos = data;
    }, error => {
      console.log(error);
    })
  }

  ngOnInit():void {
    this.obtenerProducto();
  }
  agregarProducto(){
    

    const producto: any ={
      idcategoria: this.form.get('idcategoria')?.value,
      codigo: this.form.get('codigo')?.value,
      nombre: this.form.get('nombre')?.value,
      precio_venta: this.form.get('precio_venta')?.value,
      stock: this.form.get('stock')?.value,
      descripcion: this.form.get('descripcion')?.value,
      imagen: this.form.get('imagen')?.value,
      estado: this.form.get('estado')?.value,
    }
    if(this.id == undefined){
      this._productoService.saveProducto(producto).subscribe(data =>{
        this.toastr.success('el producto fue registrado con exito', 'producto registrado');
        this.obtenerProducto();
        this.form.reset();
      }, error => {
        console.log(error);
      })
    }else{
      producto.id = this.id;
      this._productoService.updateProducto(this.id,producto).subscribe(data =>{
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.toastr.info('el producto fue actualizado con exito');
        this.obtenerProducto();
      },error => {
        console.log(error);
      })
    }
    

    
    
  
  }

  eliminarProducto(id: number){
      this._productoService.deleteProducto(id).subscribe(data =>{
        this.toastr.error('el producto fue elminado con exito','producto eliminado');
        this.obtenerProducto();
      }, error => {
        console.log(error);
      })
      
  }
  editarProducto(producto:any){
    this.accion = 'Editar';
    this.id = producto.id;
    this.form.patchValue({
      id: producto.id,
      codigo: producto.codigo,
      nombre: producto.nombre,
      precio_venta: producto.precio_venta,
      stock: producto.stock,
      descripcion: producto.descripcion,
      imagen: producto.imagen,
      estado: producto.estado

    })
  }
  
  
  }
