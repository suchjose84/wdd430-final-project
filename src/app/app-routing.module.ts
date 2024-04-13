import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginPageComponent } from "./components/pages/Auth/login-page/login-page.component";
import { StorePageComponent } from "./components/pages/store-page/store-page.component";
import { SignUpPageComponent } from "./components/pages/Auth/sign-up-page/sign-up-page.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginPageComponent,
    
    
    // children: 
    //     [
            
    //         { path: 'new', component: DocumentEditComponent },
    //         { path: ':id', component: DocumentDetailComponent },
    //         { path: ':id/edit', component: DocumentEditComponent }

    //     ] 
    },
    { path: 'signup', component: SignUpPageComponent},
    { path: 'store', component: StorePageComponent },
    // { path: 'contacts', component: ContactsComponent, children: 
    //     [
    //         { path: 'new', component: ContactEditComponent },
    //         { path: ':id', component: ContactDetailComponent },
    //         { path: ':id/edit', component: ContactEditComponent },


    //     ] 
    // }

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]

})
export class AppRoutingModule {

}