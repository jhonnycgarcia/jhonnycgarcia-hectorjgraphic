import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, throwError } from 'rxjs';
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
 }

export interface Project {
  id?: string; // ID
  title: string;  // Titulo
  category: string; // Categoria
  description: string;  // Descripcion
  firebaseLocation?: boolean; // Ubicacion de los archivos en Firebase
  googleDriveLocation?: boolean; // Ubicacion de los archivos Gdrive
  cover: string;  // Cover
  collaborator?: { // Colaborador
    name: string;
    instagram: string;
    behance: string;
  };
  path: string; // Direccion de ubicacion de las imagenes
  published?: {
    nanoseconds: number;
    seconds: number;
  }; // Fecha de ubplicacion
  // published?: firestore.FieldValue; // Fecha de ubplicacion
  imageSuffix: string;  // Sufijo de las imagenes
  imageExtention: string; // Extension de las imagenes
  images: Array<number>;  // Arreglo que contiene las imagenes por su nombre
}
