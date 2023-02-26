Vue.component('component-inscripcion',{
    data() {
        return {
            accion:'nuevo',
            buscar: '',
            materias: [],
            materia:{
                idMateria : '',
                codigoalumno : '',
                codigo : '',
                nombre : '',
            }
        }
    },
    methods:{
        guardarMateria(){
             if(this.accion==='nuevo'){
                this.materia.idMateria = new Date().getTime().toString(16);
                this.materias.push( JSON.parse( JSON.stringify(this.materia) ) );
            }else if(this.accion==='modificar'){
                let index = this.materias.findIndex(materia=>materia.idMateria==this.materia.idMateria);
                this.materias[index] = JSON.parse( JSON.stringify(this.materia) );
            }else if(this.accion==='eliminar'){
                let index = this.materias.findIndex(materia=>materia.idMateria==this.materia.idMateria);
                this.materias.splice(index,1);
            }
            localStorage.setItem("materias", JSON.stringify(this.materias) );
            this.nuevoMateria();
        },
        eliminarMateria(materia){
            if( confirm(`Esta seguro de eliminar a ${materia.nombre}?`) ){
                this.accion='eliminar';
                this.materia=materia;
                this.guardarMateria();
            }
        },
        nuevoMateria(){
            this.accion = 'nuevo';
            this.materia.idMateria = '';
            this.materia.codigo = '';
            this.materia.codigoalumno = '';
            this.materia.nombre = '';
        },
        modificarMateria(materia){
            this.accion = 'modificar';
            this.materia = materia;
        },
        listar(){
            this.materias = JSON.parse( localStorage.getItem('materias') || "[]" )
                .filter(materia=>materia.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1);
        }
        
        
    },
    
    template: `
        <div class="row">
            <div class="col-12 col-md-12">
                <div class="card">
                    <div class="card-header">INSCRIPCION DE MATERIAS</div>
                    <div class="card-body">
                        <form id="frmMateria" @reset.prevent="nuevoMateria" v-on:submit.prevent="guardarMateria">
                        <div class="row p-1">
                        <div class="col-3 col-md-2">
                            <label for="txtCodigoAlumnoMateria">INGRESA TU CODIGO DE ESTUDIANTE PARA INSCRIBIR MATERIAS:</label>
                        </div>
                        <div class="col-3 col-md-3">
                            <input required pattern="[US|SM]{2}[IS|LI]{2}[0-9]{6}" 
                                title="SI EL ALUMNO NO SE HA MATRICULADO NO PUEDE ISNCRIBIR MATERIAS"
                                    v-model="materia.codigoalumno" type="text" class="form-control" name="txtCodigoAlumnoMateria" id="txtCodigoAlumnoMateria">
                        </div>
                    </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtCodigoMateria">CODIGO DE MATERIA:</label>
                                </div>
                                <div class="col-3 col-md-3">
                                    <input required pattern="[0-9]{3}" 
                                        title="Ingrese un codigo de materia de 3 digitos"
                                            v-model="materia.codigo" type="text" class="form-control" name="txtCodigoMateria" id="txtCodigoMateria">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtNombreMateria">NOMBRE DE ASIGANTURA:</label>
                                </div>
                                <div class="col-9 col-md-6">
                                    <input required pattern="[A-Za-zÑñáéíóú ]{3,75}"
                                        v-model="materia.nombre" type="text" class="form-control" name="txtNombreMateria" id="txtNombreMateria">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-3">
                                    <input class="btn btn-primary" type="submit" 
                                        value="Guardar Materia">
                                </div>
                                <div class="col-3 col-md-3">
                                    <input class="btn btn-warning" type="reset" value="Nueva Materia">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
          
    `
});