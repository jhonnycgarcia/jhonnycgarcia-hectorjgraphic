import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private projects: Project[] = [
    {
      id: '1b8e8f751dcb146ec2feb6024737f1b752795d229ca947934159c2f9ddf197d2',
      title: 'SO FINE SO FRESH',
      category: 'illustration',
      description: 'Proyecto realizado en colaboración del Diseñador e Ilustrador Venezolano residenciado en China',
      cover: 'sofinesofreshcover',
      collaborator: { name: 'Ramón Herrera', instagram: 'https://www.instagram.com/rxmoncito', behance: 'https://www.behance.net/RxH' },
      path: 'assets/img/projects/',
      imageSuffix: 'sofinesofresh',
      imageExtention: '.png',
      images: [0, 1, 2, 3]
    },
    {
      id: '087afc2a870cc9629590beb2d22387a3910eca8187c38f7a90b3d1a675bf88c4',
      title: 'CRXVE',
      category: 'illustration',
      description: 'Proyecto hecho en conjunto del ilustrador y diseñador Costa Riqueño',
      cover: 'vexcrcover',
      collaborator: { name: 'Sthy Castillo', instagram: 'https://www.instagram.com/sthycast/', behance: 'https://www.behance.net/sthycastillo?tracking_source=search_users_recommended%7Csthy%20castillo' },
      path: 'assets/img/projects/',
      imageSuffix: 'vexcr',
      imageExtention: '.png',
      images: [0, 1, 2, 3]
    },
    {
      id: '5c086128eb1d9b4e5bd23a1227ff6d426331c6b1e9ad59a313460a3f8df7d7fe',
      title: 'SPOKER X BURNER WONG',
      category: 'illustration',
      description: 'Un proyecto hecho en conjunto del ilustrador y diseñador Venezolano',
      cover: 'wongcover',
      collaborator: { name: 'Michael Wong', instagram: 'https://www.instagram.com/burnerwong/', behance: 'https://www.behance.net/MWong?tracking_source=search_projects_recommended%7Cmichael+wong' },
      path: 'assets/img/projects/',
      imageSuffix: 'wong',
      imageExtention: '.png',
      images: [0, 1, 2, 3]
    },
    {
      id: '083ca2026e5fa12fbceb1b2c38e02271cab61c0b48957f16c8f58d3914b3713f',
      title: 'PROYECTO NIKE',
      category: '3D',
      description: 'Practica de modelado 3D realizado en Blender, inspirado en la estética NIKE aplicando colores y diagramaciones, coloridas y muy orgánicas.',
      cover: 'proyectoNikecover',
      collaborator: { name: '', instagram: '', behance: '' },
      path: 'assets/img/projects/',
      imageSuffix: 'proyectoNike',
      imageExtention: '.png',
      images: [0, 1, 2, 3, 4]
    },
  ];

  constructor() { }


  public getProjects(category: string): Project[]{
    return this.projects.filter((work) => {
      return work.category === category;
    });
  }

  public getProjectById(id: string): Project{
    return this.projects.find((project) => project.id === id);
  }
 }

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  cover: string;
  collaborator: {
    name: string;
    instagram: string;
    behance: string;
  };
  path: string;
  imageSuffix: string;
  imageExtention: string;
  images: Array<number>;
}
