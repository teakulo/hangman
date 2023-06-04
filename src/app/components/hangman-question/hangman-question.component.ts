import {Component, Input, OnChanges, SimpleChanges,} from '@angular/core';
@Component({
  selector: 'app-hangman-question',
  templateUrl: './hangman-question.component.html',
  styleUrls: ['./hangman-question.component.css'],
})
export class HangmanQuestionComponent implements OnChanges {
  @Input() question: string = '';
  @Input() guesses: string[] = [];
  characters: { value: string; guessed: boolean }[] = [];
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    // Check if the 'question' property has changed
    if (
      changes?.['question']?.currentValue &&
      changes?.['question'].currentValue !== changes?.['question'].previousValue // Check if 'question' has changed from previous value
    ) {
      // Split the 'question' string into characters and create an array of objects with 'value' and 'guessed' properties
      this.characters = this.question.split('').map((char) => ({ value: char, guessed: false }));
    }
    // Retrieve the current value of the 'guesses' property
    const guessesCurrentValue = changes?.['guesses']?.currentValue;
    // Check if 'guesses' has a current value and it has changed from the previous value
    if (
      guessesCurrentValue &&
      guessesCurrentValue.length &&
      guessesCurrentValue !== changes['guesses'].previousValue
    ) {
      // Get the latest guessed character from the 'guesses' array
      const guessedChar = [...changes['guesses'].currentValue].pop();

      // Map over the 'characters' array and update the 'guessed' property for the matching characters
      this.characters = this.characters.map((char) => {
        if (char.value.toLowerCase() === guessedChar.toLowerCase()) {
          // Set 'guessed' to true for the matching character
          return { ...char, guessed: true };
        }
        return char;
      });
    }
  }

}
