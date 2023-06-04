import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-hangman-display',
  templateUrl: './hangman-display.component.html',
  styleUrls: ['./hangman-display.component.css']
})
export class HangmanDisplayComponent implements OnChanges{

  @Input() question: string = '';
  @Input() guesses: string[] = [];
  @Output() gameFinished = new EventEmitter<boolean>();
  MAX_MISTAKES = 7;
  mistakesRemaining;
  success: boolean = false;
  constructor() {
    this.mistakesRemaining = this.MAX_MISTAKES;
  }
  ngOnChanges(changes: SimpleChanges): void {
    // Retrieve the current value of the 'guesses' property
    const guessesCurrentValue = changes?.['guesses']?.currentValue;
    // Check if the 'question' property has changed
    if (
      changes?.['question']?.currentValue &&
      changes?.['question'].currentValue !== changes?.['question'].previousValue
    ) {
      // Reset the mistakes remaining and success status
      this.mistakesRemaining = this.MAX_MISTAKES;
      this.success = false;
    }
    // Check if 'guesses' has a current value and it has changed from the previous value
    if (
      guessesCurrentValue &&
      guessesCurrentValue.length &&
      guessesCurrentValue !== changes['guesses'].previousValue
    ) {
      // Get the latest guessed character from the 'guesses' array
      const char = [...guessesCurrentValue].pop();
      // Check if the character has already been guessed
      this.checkGuess(char);
    }
  }

  checkGuess(letter: string) {
    this.mistakesRemaining -= this.wasGuessAMistake(letter);
    // Check if all characters in the 'question' have been guessed
    this.success = this.question.split('').every((char) =>
      this.guesses.includes(char.toLowerCase())
    );
    // Check if the game has either been won or the maximum number of mistakes has been reached
    if (this.success || this.mistakesRemaining === 0) {
      // Emit an event to indicate that the game has finished, passing the 'success' status
      this.gameFinished.emit(this.success);
    }
  }


  wasGuessAMistake(letter: string) {
    for (let i = 0; i < this.question.length; i++) {
      if (this.question[i].toLowerCase() === letter.toLowerCase()) {
        return 0;
      }
    }
    return 1;
  }


}

