import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HangmanDisplayComponent } from './components/hangman-display/hangman-display.component';
import { HangmanKeyboardComponent } from './components/hangman-keyboard/hangman-keyboard.component';
import { HangmanComponent } from './components/hangman/hangman.component';
import { HangmanQuestionComponent } from './components/hangman-question/hangman-question.component';
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    AppComponent,
    HangmanDisplayComponent,
    HangmanKeyboardComponent,
    HangmanComponent,
    HangmanQuestionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
