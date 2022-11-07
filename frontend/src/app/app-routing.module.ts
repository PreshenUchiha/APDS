import { NgModule } from "@angular/core";
import {RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login/login.component";
import { FruitCreateComponent } from "./fruit/fruit-create/fruit-create.component";
import { FruitDisplayComponent } from "./fruit/fruit-display/fruit-display.component";

const routes: Routes = [
    {path:'', component:FruitDisplayComponent},
    {path:'add', component:FruitCreateComponent},
    {path:'login', component:LoginComponent},
    {path:'signup', component:LoginComponent}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule{}
