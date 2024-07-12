import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { AjoutformationComponent } from './ajoutformation/ajoutformation.component';
import { LoginComponent } from './login/login.component';
import { FormcoursComponent } from './formcours/formcours.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { AjoutAdminComponent } from './ajout-admin/ajout-admin.component';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { HomeadminComponent } from './homeadmin/homeadmin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CourseAdminComponent } from './course-admin/course-admin.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { AuthGuardClientService } from '../services/auth-guard-client.service';
import { Layout1Component } from './layout1/layout1.component';
import { Home2Component } from './home2/home2.component';
import { Ajoutformation1Component } from './ajoutformation1/ajoutformation1.component';
import { LogsComponent } from './logs/logs.component';
import { Formcours1Component } from './formcours1/formcours1.component';
import { Courseadmin1Component } from './courseadmin1/courseadmin1.component';


const routes: Routes = [
  {
    path: 'formation',
    
    children: [
      {canActivate: [AuthGuardClientService],
        path: '',
        component: HomeComponent
      },
      
      {
        canActivate: [AuthGuardService],
        path: 'ajout',
        component: AjoutformationComponent
      },
      {canActivate: [AuthGuardService],
        path: 'ajout1',
        component: Ajoutformation1Component
      },
      {canActivate: [AuthGuardService],
        path: ':id/edit',
        component: AjoutformationComponent // Route pour l'édition d'une formation spécifique
      },
      {canActivate: [AuthGuardService],
        path: ':id/edit1',
        component: Ajoutformation1Component // Route pour l'édition d'une formation spécifique
      },
      {canActivate: [AuthGuardClientService],
        path: ':id/view',
        component: TutorialComponent
      },
      {canActivate: [AuthGuardService],
        
        path: ':id/viewadmin',
        component: CourseAdminComponent
      },
      {canActivate: [AuthGuardService],
        path: ':id/viewadmin1',
        component: Courseadmin1Component
      },
      {
        canActivate: [AuthGuardService],
        path: ':id/ajoutcours',
        component:FormcoursComponent
      },
      {canActivate: [AuthGuardService],
        path: ':id/ajoutcours1',
        component:Formcours1Component
      },
    
    ]
  },
  
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  
 { canActivate: [AuthGuardService],
  path: 'admin',
    
    children: [
      {
        path: '',
        component: AdminComponent
      },
      {
        path: 'ajout',
        component: AjoutAdminComponent
      },
      {
        path: ':id/edit', // Correction: changer 'admin/:id/edit' à ':id/edit'
        component: AjoutAdminComponent 
      },
      {
        path: 'logs',
        component: LogsComponent
      },
    ]
  },

  {
    
    path: 'layout',
    component: LayoutAdminComponent
  },
  {
    
    path: 'layout1',
    component: Layout1Component
  },
  
  
  {
    
    path: 'home1',
    component: HomeadminComponent
  },
  {
    
    path: 'home2',
    component: Home2Component
  },
 

 

  { path: 'register', component: RegisterComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
