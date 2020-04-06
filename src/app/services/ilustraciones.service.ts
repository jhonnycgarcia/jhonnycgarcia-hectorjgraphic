import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IlustracionesService {

  private illustrations: Illustration[] = [
    {
      id: '1b8e8f751dcb146ec2feb6024737f1b752795d229ca947934159c2f9ddf197d2',
      title: 'SO FINE SO FRESH',
      description: 'Proyecto realizado en colaboración del Diseñador e Ilustrador Venezolano residenciado en China',
      collaborator: { name: 'Ramón Herrera', instagram: 'https://www.instagram.com/rxmoncito', behance: 'https://www.behance.net/RxH' },
      imageSuffix: 'assets/img/sofinesofresh',
      imageExtention: '.png',
      images: [0, 1, 2, 3]
    },
    {
      id: '087afc2a870cc9629590beb2d22387a3910eca8187c38f7a90b3d1a675bf88c4',
      title: 'CRXVE',
      description: 'Proyecto hecho en conjunto del ilustrador y diseñador Costa Riqueño',
      collaborator: { name: 'Sthy Castillo', instagram: 'https://www.instagram.com/sthycast/', behance: 'https://www.behance.net/sthycastillo?tracking_source=search_users_recommended%7Csthy%20castillo' },
      imageSuffix: 'assets/img/vexcr',
      imageExtention: '.png',
      images: [0, 1, 2, 3]
    },
    {
      id: '5c086128eb1d9b4e5bd23a1227ff6d426331c6b1e9ad59a313460a3f8df7d7fe',
      title: 'SPOKER X BURNER WONG',
      description: 'Un proyecto hecho en conjunto del ilustrador y diseñador Venezolano',
      collaborator: { name: 'Michael Wong', instagram: 'https://www.instagram.com/burnerwong/', behance: 'https://www.behance.net/MWong?tracking_source=search_projects_recommended%7Cmichael+wong' },
      imageSuffix: 'assets/img/wong',
      imageExtention: '.png',
      images: [0, 1, 2, 3]
    },
  ];

  constructor() { }

  public getIllustrations(): Illustration[] {
    return this.illustrations;
  }

  public getIllustrationById( id: string): Illustration {
    return this.illustrations.find((illustration) => illustration.id === id);
  }
}

export interface Illustration {
  id: string;
  title: string;
  description: string;
  collaborator: {
    name: string;
    instagram: string;
    behance: string;
  };
  imageSuffix: string;
  imageExtention: string;
  images: Array<number>;
}
