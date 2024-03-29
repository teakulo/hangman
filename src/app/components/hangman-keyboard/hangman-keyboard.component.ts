import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges,} from '@angular/core';

import KEY_CHARS from 'src/app/keyCharacters';

interface IKey {
  value: string;
  guessed: boolean;
}
@Component({
  selector: 'app-hangman-keyboard',
  templateUrl: './hangman-keyboard.component.html',
  styleUrls: ['./hangman-keyboard.component.css'],
})
export class HangmanKeyboardComponent implements OnChanges {
  @Input() question = '';
  @Output() keyPressed = new EventEmitter<string>();
  keys: IKey[] = [];
  constructor() {
    this.keys = KEY_CHARS.split('').map((key) => {
      return {
        value: key,
        guessed: false,
      };
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes?.['question']?.currentValue &&
      changes?.['question'].currentValue !== changes?.['question'].previousValue
    ) {
      this.addMissingKeys();
    }
  }

  addMissingKeys(): void {
    // Iterate over each character in the 'question' string
    for (let i = 0; i < this.question.length; i++) {
      // Check if a key with the current character exists in the 'keys' array
      const keyExists = this.keys.find((key) => {
        return key.value.toLowerCase() === this.question[i].toLowerCase();
      });
      // If the key already exists, continue to the next iteration
      if (keyExists) continue;
      // Generate a random index within the 'keys' array
      const randomIndex = Math.floor(Math.random() * 11);
      // Insert a new key at the randomly generated index
      this.keys.splice(randomIndex, 0, {value: this.question[i], guessed: false,});
    }
  }
  onKeyClick(key: IKey): void {
    if (key.guessed) return;
    key.guessed = true;
    this.keyPressed.emit(key.value);
  }
}
