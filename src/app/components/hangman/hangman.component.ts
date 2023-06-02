import {Component, OnInit} from '@angular/core';
import {HangmanService} from "../../hangman.service";



@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.css']
})
export class HangmanComponent implements OnInit{

  question: string = '';
  questions: string[] = [];
  guesses: string[] = [];
  category: string = '';

  constructor(private hangmanService :  HangmanService) {}
  ngOnInit(): void {
    this.hangmanService.getQuestions().subscribe((response) =>{
      this.questions = response.items;
      this.category = response.category;
      this.pickNewQuestion();
    })
  }

  guess(letter: string): void {
    if (!letter || this.guesses.includes(letter)) {
      return;
    }
    this.guesses = [...this.guesses, letter];
  }
  pickNewQuestion() {
     const randomIndex = Math.floor(Math.random() * this.questions.length);
     this.question = this.questions[randomIndex];
     console.log(this.question);
  }
  reset(){
    this.guesses = [];
    this.pickNewQuestion();
  }
}
