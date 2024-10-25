import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SliderComponent } from './shared/slider/slider.component';
import { FourelementsComponent } from './shared/fourelements/fourelements.component';
import { OurhistoryComponent } from './shared/ourhistory/ourhistory.component';
import { CasestudyComponent } from './shared/casestudy/casestudy.component';
import { StaticticsComponent } from './shared/statictics/statictics.component';
import { PartnersComponent } from './shared/partners/partners.component';
import { GetstartedComponent } from './shared/getstarted/getstarted.component';
import { BlogComponent } from './pages/blog/blog.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { AboutsComponent } from './pages/abouts/abouts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './shared/loading/loading.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { HeaderadminComponent } from './shared/headeradmin/headeradmin.component';
import { PerfilresumenussComponent } from './pages/perfilresumenuss/perfilresumenuss.component';
import { UsuariosmantenimientoComponent } from './pages/usuariosmantenimiento/usuariosmantenimiento.component';
import { ModalImagenComponent } from './components/modal-imagen/modal-imagen.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ImagenPipe } from './pipes/imagen.pipe';
import { SeccioncategComponent } from './components/seccioncateg/seccioncateg.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ProductonewComponent } from './pages/productonew/productonew.component';
import { SearchComponent } from './components/search/search.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArticleComponent } from './articledetalle/article/article.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { SearchinblogComponent } from './components/searchinblog/searchinblog.component';
import { BlogsearchComponent } from './pages/blogsearch/blogsearch.component';
import { ArticleNewComponent } from './pages/article-new/article-new.component';
import { ArticleEditComponent } from './pages/article-edit/article-edit.component';
import { CommentsNewComponent } from './pages/comments-new/comments-new.component';
import { LogoComponent } from "./shared/header/logo/logo.component";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NopagefoundComponent,
    DashboardComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    FourelementsComponent,
    OurhistoryComponent,
    CasestudyComponent,
    StaticticsComponent,
    PartnersComponent,
    GetstartedComponent,
    BlogComponent,
    HomeComponent,
    ContactComponent,
    PortfolioComponent,
    AboutsComponent,
    LoadingComponent,
    PerfilComponent,
    HeaderadminComponent,
    PerfilresumenussComponent,
    UsuariosmantenimientoComponent,
    ModalImagenComponent,
    CategoriasComponent,
    ProductosComponent,
    ImagenPipe,
    SeccioncategComponent,
    ProductoComponent,
    ProductonewComponent,
    SearchComponent,
    BusquedaComponent,
    ArticleComponent,
    ArticlesComponent,
    SearchinblogComponent,
    BlogsearchComponent,
    ArticleNewComponent,
    ArticleEditComponent,
    CommentsNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    LogoComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
