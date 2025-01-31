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
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatChipsModule} from "@angular/material/chips";
import {MatMenuModule} from "@angular/material/menu";
import { WarnOneComponent } from './moderation/warn-one/warn-one.component';
import { ActuPreviewComponent } from './global/actu-preview/actu-preview.component';
import { CommentPreviewComponent } from './global/comment-preview/comment-preview.component';
import { CommentReplyPreviewComponent } from './global/comment-reply-preview/comment-reply-preview.component';
import { ProfilPreviewComponent } from './global/profil-preview/profil-preview.component';
import { HmgPreviewComponent } from './global/hmg-preview/hmg-preview.component';
import { HmpPreviewComponent } from './global/hmp-preview/hmp-preview.component';
import { LogRoleComponent } from './administration/log-role/log-role.component';
import { PostSearchComponent } from './global/post-search/post-search.component';
import { LogComponent } from './administration/log/log.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SidebarComponent,
    FilterPipe,
    PermsComponent,
    ErrComponent,
    SettingComponent,
    ProfilComponent,
    EditArticleComponent,
    CreateArticleComponent,
    ShowArticlesComponent,
    UserSearchComponent,
    UserSearchComponent,
    WarnComponent,
    WarnOneComponent,
    ActuPreviewComponent,
    CommentPreviewComponent,
    CommentReplyPreviewComponent,
    ProfilPreviewComponent,
    HmgPreviewComponent,
    HmpPreviewComponent,
    LogRoleComponent,
    PostSearchComponent,
    LogComponent,
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
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatMenuModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
