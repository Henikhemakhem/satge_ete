import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { AjoutformationComponent } from './ajoutformation/ajoutformation.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { FormcoursComponent } from './formcours/formcours.component';
import { FirebaseModule } from './Firebase.module (2)';
import { RegisterComponent } from './register/register.component';
import { AjoutAdminComponent } from './ajout-admin/ajout-admin.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { HomeadminComponent } from './homeadmin/homeadmin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { CourseAdminComponent } from './course-admin/course-admin.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from './environement';
import { FooterAdminComponent } from './footer-admin/footer-admin.component';
import { Layout1Component } from './layout1/layout1.component';
import { Home2Component } from './home2/home2.component';
import { Ajoutformation1Component } from './ajoutformation1/ajoutformation1.component';
import { LogsComponent } from './logs/logs.component';
import { Formcours1Component } from './formcours1/formcours1.component';
import { Courseadmin1Component } from './courseadmin1/courseadmin1.component';
import { PayementComponent } from './payement/payement.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TutorialComponent,
    AjoutformationComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    FormcoursComponent,
    AjoutAdminComponent,
    RegisterComponent,
    AdminComponent,
    LayoutAdminComponent,
    HomeadminComponent,
    DashboardComponent,
    HeaderAdminComponent,
    CourseAdminComponent,
    FooterAdminComponent,
    Layout1Component,
    Home2Component,
    Ajoutformation1Component,
    LogsComponent,
    Formcours1Component,
    Courseadmin1Component,
    PayementComponent,


  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule, // Import CommonModule to use ngFor, ngIf, etc.
    RouterModule,
    FirebaseModule,
    AngularFireModule,
    AngularFireAuthModule,
    
    AngularFireModule.initializeApp(environment.firebaseConfig),

  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
