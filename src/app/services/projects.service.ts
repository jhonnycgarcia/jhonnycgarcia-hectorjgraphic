import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, take, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private collectionName = 'projects';  // Nomber de la coleccion
  private projectsCollection: AngularFirestoreCollection<Project>;  // Coleccion de datos
  private projectDoc: AngularFirestoreDocument<Project>;  // Documento de firestore
  items: Observable<Project[]>;

  constructor(
    private afs: AngularFirestore, // Servicio de FireStore
    private storage: AngularFireStorage // Servicio para FireStorage
  ) { }

  /**
   * Funcion para precargar la data en el servicio dependiendo de la categoria
   * @param category<string> Categoria por la cual filtrar
   */
  public async preloadServiceData(category: string){
    this.projectsCollection = this.afs.collection<Project>(this.collectionName, ref => ref.where('category', '==', category));
    this.items = this.projectsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Project; // Save data
        const id = a.payload.doc.id;  // Save ID
        return { id, ...data };
      })));
  }

  /**
   * Funcion para obtener projectos por categoria
   * @param category: string Categoria por la cual buscar
   */
  public getProjects(category: string): Observable<Project[]>{
    this.items = this.afs.collection<Project>(this.collectionName, ref => ref.where('category', '==', category)
                                                                              .orderBy('published', 'desc'))
      .valueChanges({ idField: 'id' });
    return this.items;
  }

  /**
   * @description Funcion para retornar los ultimos proyectos publicados
   * @param limit<number>  - Limite de registros por defecto dvuelve 5
   * @returns items {Observable<Project>} - Arreglo de proyectos
   */
  public getLastProjects(limit: number = 5){
    this.items = this.afs.collection<Project>(this.collectionName, ref => ref.orderBy('published', 'desc')
                                                                          .limit(limit) )
      .valueChanges({ idField: 'id' });
    return this.items;
  }

  public getProjectById(id: string): Observable<Project>{
    this.projectDoc = this.afs.doc<Project>(this.collectionName + '/' + id);
    return this.projectDoc.valueChanges();
  }

  /**
   * Funcion para obtener la URL de las imagenes provenientes de FireStorage
   * @param path String Direccion de la imagen
   */
  public getImgUrlToFirebase(path: string): Observable<string>{
    const ref = this.storage
      .ref(path)
      .getDownloadURL()
      .pipe(
        catchError( (err) => throwError(err)),  // Capturar error
        retry(3), // Reintentar 3 veces si ocurre un error
        take(1) // Tomar una sola observacion
      );
    return ref;
  }

  /**
   * Funcion para obtener la URL de las imagenes provenientes de GoogleDrive
   * https://drive.google.com/uc?id=
   * @param id String ID de la imagen
   */
  public getImgUrlToGoogleDrive( id: string): Observable<string>{
    if (!id) {
      return throwError('Error on gdrive');
    }else{
      const ref = 'https://drive.google.com/uc?id=' + id;
      return of(ref);
    }
  }
 }

 /**
  * Modelo Para projectos
  */
export interface Project {  // Modelo de Proyectos
  id?: string; // ID
  title: string;  // Titulo
  cover: string;  // Cover
  category: string; // Categoria
  description: string;  // Descripcion
  published: { // Fecha de publicacion
    nanoseconds: number;
    seconds: number;
  };
  // published?: firestore.FieldValue; // Fecha de ubplicacion
  collaborators: Array<Collaborator>; // Colaboradores
  firebaseLocation?: boolean; // Ubicacion de los archivos en Firebase
  googleDriveLocation?: boolean; // Ubicacion de los archivos Gdrive
  path: string; // Direccion de ubicacion de las imagenes
  imageSuffix: string;  // Sufijo de las imagenes
  imageExtention: string; // Extension de las imagenes
  // images: Array<number>;  // Arreglo que contiene las imagenes por su nombre
  images?: Array<ImageOfProject>; // Arreglo de imagenes
}

/**
 * Modelo para Colaboradores
 */
export interface Collaborator { // Modelo de Colaboradores
  name: string; // Nombre
  instagram?: string;
  behance?: string;
}

/**
 * Modelo de Imagenes
 */
export interface ImageOfProject {
  id: string;
  title?: string;
}
