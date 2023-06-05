import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { BlogComponent } from './pages/blog/blog.component';
import { AboutsComponent } from './pages/abouts/abouts.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { authGuard } from './guards/auth.guard';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PerfilresumenussComponent } from './pages/perfilresumenuss/perfilresumenuss.component';
import { UsuariosmantenimientoComponent } from './pages/usuariosmantenimiento/usuariosmantenimiento.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ProductosComponent } from './pages/productos/productos.component';



const routes: Routes = [

{ path: 'login', component: LoginComponent , data: { titulo: 'Login' }},
{ path: 'register', component: RegisterComponent , data: { titulo: 'Register' }}, 
{ path: 'home', component: HomeComponent , data: { titulo: 'Home' }},
{ path: 'portfolio', component: PortfolioComponent , data: { titulo: 'Portfolio' }},
{ path: 'about', component: AboutsComponent , data: { titulo: 'About' }},
{ path: 'perfil', component: PerfilComponent, canActivate: [ authGuard ],data: { titulo: 'perfil de usuario'}},
{ path: 'perfil-usuario', component: PerfilresumenussComponent, canActivate: [ authGuard ],data: { titulo: 'perfil de usuario'}},
{ path: 'categorias', component: CategoriasComponent, canActivate: [ authGuard ],data: { titulo: 'categorias de prductos'}},
{ path: 'productos', component: ProductosComponent, canActivate: [ authGuard ],data: { titulo: 'productos'}},
{ path: 'mantenimiento-usuario', component: UsuariosmantenimientoComponent, canActivate: [ authGuard ],data: { titulo: 'perfil de usuario'}},
{ path: 'admin', component: DashboardComponent, canActivate: [ authGuard ],data: { titulo: 'Dashboard'}},
{ path: 'blog', component: BlogComponent , canActivate: [ authGuard ], data: { titulo: 'Blog' }},
{ path: 'blog/:id', component: BlogComponent , data: { titulo: 'Blog' }},
{ path: 'contact', component: ContactComponent , data: { titulo: 'Contact' }},
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: '**',component: NopagefoundComponent, data: { titulo: 'Page not found' } },

];




@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }