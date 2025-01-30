import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './global/login/login.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import { SidebarComponent } from './global/sidebar/sidebar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { FilterPipe } from './filter.pipe';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatRadioModule} from "@angular/material/radio";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTabsModule} from "@angular/material/tabs";
import { PermsComponent } from './administration/perms/perms.component';
import { ErrComponent } from './global/err/err.component';
import { WarnComponent } from './moderation/warn/warn.component';
import { SettingComponent } from './setting/setting.component';
import { ProfilComponent } from './provider/profil/profil.component';
import { EditArticleComponent } from './writter/edit-article/edit-article.component';
import { CreateArticleComponent } from './writter/create-article/create-article.component';
import { ShowArticlesComponent } from './writter/show-articles/show-articles.component';
import {UserSearchComponent} from "./global/user-search/user-search.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SidebarComponent,
    FilterPipe,
    PermsComponent,
    ErrComponent,
    WarnComponent,
    SettingComponent,
    ProfilComponent,
    EditArticleComponent,
    CreateArticleComponent,
    ShowArticlesComponent,
    UserSearchComponent,
    UserSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatTabsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
