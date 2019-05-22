import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { FormsModule } from '@angular/forms';
import { DataTableModule } from '@pascalhonegger/ng-datatable';
import { IonicSelectableModule } from 'ionic-selectable';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CupsComponent } from './components/cups/cups.component';
import { CupDetailComponent } from './components/cup-detail/cup-detail.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupDetailComponent } from './components/group-detail/group-detail.component';
import { TeamsComponent } from './components/teams/teams.component';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';
import { GamesComponent } from './components/games/games.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EditModalTeamsComponent } from './components/modal/edit-modal-teams/edit-modal-teams.component';
import { EditModalGamesComponent } from './components/modal/edit-modal-games/edit-modal-games.component';
import { EditModalCupsComponent } from './components/modal/edit-modal-cups/edit-modal-cups.component';
import { EditModalGroupsComponent } from './components/modal/edit-modal-groups/edit-modal-groups.component';
import { AddModalCupsComponent } from './components/modal/add-modal-cups/add-modal-cups.component';
import { AddModalGroupsComponent } from './components/modal/add-modal-groups/add-modal-groups.component';
import { AddModalGamesComponent } from './components/modal/add-modal-games/add-modal-games.component';
import { AddModalTeamsComponent } from './components/modal/add-modal-teams/add-modal-teams.component';
import { ExtendedSelectComponent } from './components/extended-select/extended-select.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';

@NgModule({
  declarations: [
    AppComponent,
    CupsComponent,
    CupDetailComponent,
    GroupsComponent,
    GroupDetailComponent,
    TeamsComponent,
    TeamDetailComponent,
    GamesComponent,
    GameDetailComponent,
    LoginComponent,
    RegisterComponent,
    EditModalTeamsComponent,
    EditModalGamesComponent,
    EditModalCupsComponent,
    EditModalGroupsComponent,
    AddModalCupsComponent,
    AddModalGroupsComponent,
    AddModalGamesComponent,
    AddModalTeamsComponent,
    ExtendedSelectComponent,
    PageHeaderComponent
  ],

  entryComponents: [
    EditModalTeamsComponent,
    EditModalGamesComponent,
    EditModalCupsComponent,
    EditModalGroupsComponent,
    AddModalCupsComponent,
    AddModalGroupsComponent,
    AddModalGamesComponent,
    AddModalTeamsComponent,
    ExtendedSelectComponent,
    PageHeaderComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    IonicSelectableModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
