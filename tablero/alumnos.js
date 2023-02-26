Vue.component('component-alumnos',{
    data() {
        return {
            accion:'nuevo',
            buscar: '',
            alumnos: [],
            alumno:{
                idAlumno  : '',
                codigo    : '',
                nombre    : '',
                direccion : '',
                telefono  : '',
                dui       : '',
            }
        }
    },
    methods:{
        guardarAlumno(){
            this.listar();
            if(this.accion==='nuevo'){
                this.alumno.idAlumno = new Date().getTime().toString(16);
                this.alumnos.push( JSON.parse( JSON.stringify(this.alumno) ) );
            }else if(this.accion==='modificar'){
                let index = this.alumnos.findIndex(alumno=>alumno.idAlumno==this.alumno.idAlumno);
                this.alumnos[index] = JSON.parse( JSON.stringify(this.alumno) );
            }else if(this.accion==='eliminar'){
                let index = this.alumnos.findIndex(alumno=>alumno.idAlumno==this.alumno.idAlumno);
                this.alumnos.splice(index,1);
            }
            localStorage.setItem("alumnos", JSON.stringify(this.alumnos) );
            this.nuevoAlumno();
        },
        eliminarAlumno(alumno){
            if( confirm(`Esta seguro de eliminar a ${alumno.nombre}?`) ){
                this.accion='eliminar';
                this.alumno=alumno;
                this.guardarAlumno();
            }
        },
        nuevoAlumno(){
            this.accion = 'nuevo';
            this.alumno.idAlumno = '';
            this.alumno.codigo = '';
            this.alumno.nombre = '';
            this.alumno.direccion = '';
            this.alumno.telefono = '';
            this.alumno.dui = '';
        },
        modificarAlumno(alumno){
            this.accion = 'modificar';
            this.alumno = alumno;
        },
        listar(){
            this.alumnos = JSON.parse( localStorage.getItem('alumnos') || "[]" )
                .filter(alumno=>alumno.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1);
        }
    },
    template: `
            <div class="col-12 col-md-12">
                <div class="card">
                    <div class="card-header">LISTADO DE ALUMNOS MATRICULADOS</div>
                    <div class="card-body">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>BUSCAR:</th>
                                    <th colspan="2"><input type="text" class="form-control" v-model="buscar"
                                        @keyup="listar()"
                                        placeholder="Buscar por nombre"></th>
                                </tr>
                                <tr>
                                    <th>CODIGO</th>
                                    <th colspan="5">NOMBRE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="alumno in alumnos" :key="alumno.idAlumno" @click="modificarAlumno(alumno)" >
                                    <td>{{ alumno.codigo }}</td>
                                    <td>{{ alumno.nombre }}</td>
                                    <td>{{ alumno.direccion }}</td>
                                    <td>{{ alumno.telefono }}</td>
                                    <td>{{ alumno.dui }}</td>
                                    <td><button class="btn btn-danger" @click="eliminarAlumno(alumno)">ELIMINAR</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `
});