import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//provides the method for http request
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
//Routing reference
import {Routes, RouterModule} from '@angular/router';

//Components references
import { AppComponent } from './app.component';
import { PropertyCardComponent } from './property/property-card/property-card.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HousingService } from './service/housing.service';
import {AddPropertyComponent} from './property/add-property/add-property.component';
import {PropertyDetailComponent} from './property/property-detail/property-detail.component';
import { from } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserService } from './service/user.service';
import { AlertifyService } from './service/alertify.service';
import { AuthService } from './service/auth.service';

//Ngx-Bootstrap
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import { PropertyDetailResolverService } from './property/property-detail/property-detail-resolver.service';

const appRoutes: Routes = [
  {path:'', component:PropertyListComponent},
  {path:'rent-property', component:PropertyListComponent},
  {path:'add-property', component:AddPropertyComponent},
  {path:'property-detail/:id', component:PropertyDetailComponent, resolve: {prp: PropertyDetailResolverService}},
  {path:'user/login', component:UserLoginComponent},
  {path:'user/register', component:UserRegisterComponent},
  {path:'**', component:PropertyListComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    PropertyCardComponent,
    PropertyListComponent,
    NavBarComponent,
    AddPropertyComponent,
    PropertyDetailComponent,
    UserLoginComponent,
    UserRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [
    HousingService,
    UserService,
    AlertifyService,
    AuthService,
    PropertyDetailResolverService
    //DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
