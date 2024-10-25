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
import { ProductoComponent } from './pages/producto/producto.component';
import { ProductonewComponent } from './pages/productonew/productonew.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { SearchinblogComponent } from './components/searchinblog/searchinblog.component';
import { BlogsearchComponent } from './pages/blogsearch/blogsearch.component';
import { ArticleNewComponent } from './pages/article-new/article-new.component';
import { ArticleEditComponent } from './pages/article-edit/article-edit.component';
import { CommentsNewComponent } from './pages/comments-new/comments-new.component';



const routes: Routes = [

{ path: 'login', component: LoginComponent , data: { titulo: 'Login' }},
{ path: 'register', component: RegisterComponent , data: { titulo: 'Register' }}, 
{ path: 'home', component: HomeComponent , data: { titulo: 'Home' }},
{ path: 'productos', component: PortfolioComponent , data: { titulo: 'Productos Regionales' }},
{ path: 'about', component: AboutsComponent , data: { titulo: 'About' }},
{ path: 'perfil', component: PerfilComponent, canActivate: [ authGuard ],data: { titulo: 'perfil de usuario'}},
{ path: 'perfil-usuario', component: PerfilresumenussComponent, canActivate: [ authGuard ],data: { titulo: 'perfil de usuario'}},
{ path: 'categorias', component: CategoriasComponent, canActivate: [ authGuard ],data: { titulo: 'categorias de prductos'}},
{ path: 'admin-productos', component: ProductosComponent, canActivate: [ authGuard ],data: { titulo: 'productos'}},
{ path: 'admin-producto/:id', component: ProductoComponent, canActivate: [ authGuard ],data: { titulo: 'actualizar producto'}},
{ path: 'admin-producto-nuevo', component: ProductonewComponent, canActivate: [ authGuard ],data: { titulo: 'producto nuevo'}},
{ path: 'producto/:id', component: ProductoComponent, canActivate: [ authGuard ],data: { titulo: 'Actualizar producto'}},
{ path: 'mantenimiento-usuario', component: UsuariosmantenimientoComponent, canActivate: [ authGuard ],data: { titulo: 'perfil de usuario'}},
{ path: 'admin', component: DashboardComponent, canActivate: [ authGuard ],data: { titulo: 'Dashboard'}},
{ path: 'blog', component: BlogComponent ,data: { titulo: 'Blog' }},
{path:  'newarticle', component: ArticleNewComponent, canActivate: [ authGuard ],data: { titulo: 'New Article' }},
{path:  'newarticle/:id', component: ArticleEditComponent, canActivate: [ authGuard ],data: { titulo: 'Edit Article' }},
{ path: 'comments/:id', component: CommentsNewComponent, canActivate: [ authGuard ],data: { titulo: 'Comments' }},
{ path: 'searchinblog/:search', component: BlogsearchComponent, data: { titulo: 'Search Blog' }},
{ path: 'blog/article/:id', component: ArticlesComponent, data: { titulo: 'Blog' }},
{ path: 'search/:termino', component: BusquedaComponent , data: { titulo: 'Search' }},
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