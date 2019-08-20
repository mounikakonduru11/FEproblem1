
import { Routes } from "@angular/router";
import { DashboardComponent } from "src/app/dashboard/dashboard.component";


export const routes:Routes = [
    {
        path:"",
        pathMatch:"full",
        redirectTo:'/dashboard',
    },{
        path:"dashboard",
        component : DashboardComponent
    }
    
];
