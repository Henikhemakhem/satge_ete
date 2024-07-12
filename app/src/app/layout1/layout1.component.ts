import { Component } from '@angular/core';

@Component({
  selector: 'app-layout1',
  templateUrl: './layout1.component.html',
  styleUrl: './layout1.component.css'
})
export class Layout1Component {
  email: string | null = null;

  ngOnInit(): void {
    // Récupère l'email stocké dans le localStorage
    this.email = localStorage.getItem('adminEmail');
    
    console.log('Email from localStorage:', this.email);
  }
  togle(){
    const element=document.body as HTMLBodyElement
    element.classList.toggle('sidebar sidebar-offcanvas')
  }
  sidebarVisible: boolean = false;

  // Méthode pour basculer l'état de la barre latérale
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;}
}