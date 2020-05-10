import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ReactiveFormsModule} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'; 
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { createComponent } from '@angular/compiler/src/core';
import {IssueService} from './issue.service';
import { UserloginComponent } from './userlogin/userlogin.component';
import { CoffeeShopsComponent } from './components/coffee-shops/coffee-shops.component';
import { CoffeeshoppageComponent } from './coffeeshoppage/coffeeshoppage.component';
import { HomeComponent } from './home/home.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { ShopsnearbyComponent } from './shopsnearby/shopsnearby.component';
import { CoffeeshoplocationComponent } from './coffeeshoplocation/coffeeshoplocation.component';
import { ShopFilterPipe } from './coffeeshoppage/coffeeshoppage.pipe';
import {FormsModule} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

const routes:Routes=[
  {path :'Signup', component: CreateComponent},
  // {path:'edit/:id',component:EditComponent},
  // {path:'list',component:ListComponent},
  // {path:'',component:ListComponent},
  {path:'Home',component:HomeComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path :'userLogin', component: UserloginComponent},
  // {path:'',redirectTo:'home',pathMatch:'full'},
  {path :'coffeeShopsData', component:CoffeeShopsComponent},
  // {path:'',redirectTo:'coffeeShopsData',pathMatch:'full'},
  {path:'coffeeData/:id', component:CoffeeshoppageComponent},
  {path:'profilepage/:id',component:ProfilepageComponent},
  {path:'shopsnearby',component:ShopsnearbyComponent},
  {path:'coffeeshoplocation/:id',component:CoffeeshoplocationComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    UserloginComponent,
    CoffeeShopsComponent,
    CoffeeshoppageComponent,
    HomeComponent,
    ProfilepageComponent,
    ShopsnearbyComponent,
    ShopFilterPipe,
    CoffeeshoplocationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatSliderModule,
    FormsModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [IssueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
