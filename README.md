# COMP6080 Sample Exam

For this exam you are provided with this public repostory (`exam-sample-spec`) that all students have access to. This repository contains the questions being asked. You will then also have your own [personal exam repository](https://cgi.cse.unsw.edu.au/~cs1531/redirect/?path=COMP6080/23T3/students/_/exam-sample) where you actually complete the work that will be submitted. The personal exam repo is where you actually commit and push your code.

## 1. The Exam

### 1.1 Overview

You are to build a small single page application (with either ReactJS or Vanilla JS) that has three basic interactive games, along with a dashboard acting as a homepage.

### 1.2. Getting Started

Please clone your [personal exam repository](https://cgi.cse.unsw.edu.au/~cs1531/redirect/?path=COMP6080/23T3/students/_/exam-sample).

Run `yarn install` to install all relevant dependencies to start.

Run `yarn start` to start your ReactJS app.

You are welcome to install any dependencies on top of ReactJS that you would like using `yarn add [dependency]`.

If you are using VLAB to complete the exam, the usage of `npm install`, `npm run start`, and `npm install [dependency]` is also fine.

Please note: If you prefer to complete the exam with VanillaJS, then you can simply remove all files we've provided and start from an empty repo.

There is no backend in this application. The entire state you manage should be done in localstorage or another form of persistent browser storage.

### 1.2. Features

The numbers in brackets next to any items (e.g. "Make the page big (1)") describe the number of marks associated with that piece of functionality.

#### 1.2.0. Document, Header, and Footer (10 marks)

* The overall document/page should have a `margin` of `0`. (0.5)
* All screens shall have a header bar that is:
  * 80px high. (0.5)
  * Has a width that spans the full width of the viewport. (0.5)
  * Has property `position: fixed` such that no matter where the user scrolls the header is visible. (0.5)
  * Has a background colour of `#eeeeee`. (0.5)
  * Contains a logo (you can use any image you'd like!) that:
  	* Is in the top left corner of the header bar. (0.5)
  	* Has a margin of `15px` on all sides. (0.5)
  	* Has a size `50px` x `50px`. (0.5)
  * Contains a section for navigation that:
    * For viewport widths over 800px, has text `Home | Blanko | Slido | Tetro`. (0.5)
    * For viewport widths less than or equal to 800px, has text `H | B | S | T`. (0.5)
    * Has the text aligned on the right hand side of the header bar. (0.5)
    * Has the `Home` or `H` text linking to the page `/`; has the `Blanko` or `B` text linking to the page `/blanko`; has the `Slido` or `S` text linking to the page `/slido`; and has the `Tetro` or `T` text linking to the page `/tetro`. (1.5)
* All screens shall have a footer bar that:
  * Has a height of 50px. (0.5)
  * Has a width that spans the full width of the viewport. (0.5)
  * Is not fixed to the bottom of the viewport - but is instead fixed to the bottom of the document/page (i.e. if a page is twice the height of the viewport, the footer will only be visible when you scroll to the bottom). (0.5)
  * Has a background colour of `#999999` (1)
* The entirety of the space on the page that isn't used by the header and footer is referred to as the `main body`, and screens from `1.2.2`, `1.2.3`, `1.2.4`, and `1.2.5` should occupy that full space, unless otherwise specified (0.5).

#### 1.2.1. Dashboard (12 marks)

* This screen exists on route `/` and contains the header and footer from `1.2.1`. (0.5)
* This screen shall contain two lines of text that are centre aligned vertically and horizontally. The _general_ shape of this can be seen in [this video](https://youtu.be/otedh4_iqyU):
  * The first line is the text `Please choose an option from the navbar.` The text is colour `red` and font size `2em`. (1)
  * The second line is the content `Games won: X (reset)`. (1)
    * `X` should be filled with the number of games that the user has won since the very first usage, or since the reset was clicked last. (2)
    The value of `X` shall persist between loads by making use of a form of browser storage (e.g. `localstorage`). (2)
    * When `(reset)` (a button) is clicked, the counter `X` will be reset. (1)
* When the app initially loads for the very first time (i.e. localstorage is empty), or when the reset button is pressed, the initial value of `X` (number of games won) should be set to the value returned when fetching the following URL: `https://cgi.cse.unsw.edu.au/~cs6080/raw/data/info.json`. The payload at this URL will be in the format `{"score":5}` (5).

#### 1.2.2. Game 1 - Blanko (18 marks)

* This page exists on route `/blanko` and contains the header and footer from `1.2.1`. (0.5)
* This page will display 12 square containers, all spaced equally in a row, centered vertically, in the middle of the page. (3)
* Each time the component for this screen mounts, it randomly displays one of the 7 strings defined below. Each character of the string is displayed in the 12 boxes you've created, except: (5)
  * 3 randomly chosen non-space characters are replaced with input fields that only allow a single character to be entered (5)
  * When all 3 inputs have been entered, if the entered values are correct then the page will create an `alert` that says `Correct!` before refreshing the screen to start a new game (with another string randomly chosen, and the 3 random inputs cleared). A new game win will be added to the dashboard tally. (2.5)
* Underneath the list of characters (anywhere below) a reset button exists that when clicked will start the Blanko game again with another randomly chosen string. (2)

The data is 
```javascript
export const strs = [
    'the fat cats',
    'larger frogs',
    'banana cakes',
    'unsw vs usyd',
    'french toast',
    'hawaii pizza',
    'barack obama',
];
```

[A short video demonstration of this game can be found here.](https://youtu.be/otedh4_iqyU).

#### 1.2.3. Game 2 - Slido (21 marks)

This game is based on a sliding puzzle game. An example can be found [here](https://www.proprofsgames.com/ugc/puzzle/sliding/3x3-5/).

* This page exists on route `/slido` and contains the header and footer from `1.2.1`. (0.5)
* The page will consist of a few key components:
  * A 3 x 3 grid of cells that are `150px` x `150px` in size, with a `#333` coloured `1px` solid border, and a 0px margin. This grid appears in the vertical and horizontal centre of the main area. (2)
    * When the game starts, 8 of the 9 cells are pre-filled randomly with one of the 8 Shrek squares found in `assets` folder. The cells should not be in the correct position to start. The empty 9th square shall be randomly placed in one of the 9 positions. (3)
    * Whilst the grid of cells has not been solved, clicking on one of the 2-4 cells immediately adjacent to the blank space should cause that clicked cell to move into the blank space, and then the clicked cell's original be position be replaced with a blank cell (effectively swapped position). (6)
    * As an alternative to clicking cells, whilst the grid of cells is `active` (i.e. the parent container has been clicked on), the left, right, up, and down arrows should result in a similar behaviour. E.G. Clicking the "down" key on the keyboard would result in the shrek cell immediately above the blank moving down (if such a cell exists). (4)
    * After the cell move made that that correctly places all the cells, an `alert` occurs that says `Correct!` before refreshing the screen to start a new game. A new game win will be added to the dashboard tally. (2)
  * A button below the grid, on the left half of the screen, with text `Solve`: (0.5)
    * When this button is pressed, the grid will automatically move to the solved state (i.e. win state - with all the squares correctly placed). (1)
    * Whilst in the win state, waiting for reset to be clicked, the `Solve` button is disabled. (0.5)
  * A button below the grid, on the right half of the screen, with text `Reset`: (0.5)
    * When clicked, the game will "start" again. (0.5)
    * The button shall remain disabled whilst the game has started, but no move has been made. (0.5)
* The game starts automatically when the screen is mounted, or the reset button is clicked.

The finished game would look like the following:

![](slido.png)

[A short video demonstration of this game can be found here.](https://youtu.be/BbXin8mhV_g).

#### 1.2.4. Game 3 - Tetro (22 marks)

This page is a simplified implementation of the game [tetris](https://www.freetetris.org/)

* This page exists on route `/tetro` and contains the header and footer from `1.2.1`. (0.5)
* The page will consist of a 10 (wide) by 12 (high) grid/board of cells that fills the main body, except it has a `20px` `margin` on the top, left, and right, and a `100px` margin on the bottom. (3)
* Cells are distributed evenly in this space (and therefore will often not be square). Each cell has a transparent background with a `1px` border coloured `#333333` that is `solid`. (2)
* The gameplay process is as follows:
  * A) The game becomes active when the user clicks on the board, then step B happens. (0.5)
  * B) one of the following shape objects appears in the top left of the screen: `2 x 2 block`, a `2 (high) x 1 (wide) block`, or a `1 x 1 block`, with the top left cell of the block appearing in the top left cell of the board. (3)
  * C) After the block appears on the screen, every 1 second, the block moves 1 cell vertically further down the screen. (1)
  * D) During the gameplay, when the board is `active` (i.e. has been clicked on), the left and right arrow keys on the board will move the block one cell to the left or right respectively, if it is able to. (2)
  * E) If a block cannot move any further down the board (i.e. one of the cells it would have moved to is occupied by another block, or the block is already at the bottom row of the board), the block becomes locked in place in it's position and another block appears on the screen as per (B). (5)
* Every time a new block is locked in place, if there are any rows that are filled with cells, all of the cells in that row turn green `rgb(0,255,0)`. (2)
* Once five rows have been coloured green, the game stops as the player has won and an `alert` appears saying `Congrats!` that when closed the game restarts. (1)
* If, when a block becomes locked in place, it occupies a cell that is higher than one of the first 8 rows, the player loses with an `alert` saying `Failed`. Once closed the game restarts. (1)
* A reset button exists below the grid of cells that when clicked, restarts the game (i.e. go to step A, waiting for the board to be active). (1)

### 1.3. Other notes

* If we don't specify a constraint, then you have discretion as to what to do, assuming it still ensures that your application is usable and accessible.
* If a CSS property constraint is not specified (e.g. font size) then you are free to use whatever is reasonable and usable.
* While we don't specify many requirements around usability and accessibility, you should take initiative to make your work both usable and accessible to gain the marks in that area.
* You should ensure that your programs have been tested on the latest version of Google Chrome.

### 1.4. Git Commit Criteria

You will be required to make meaningful commits not longer than 100 lines of code. Failure to do this will result in a penalty.


## 2. Marking Criteria

For each of sections, marks will be awarded according to the following criteria:
 * 80%: Providing the features and functionality required at least one of desktop, tablet, or mobile.
 * 20%: Ensuring responsiveness on desktop, tablet, mobile
   * Desktop testing will be done on a `1800px` x `800px` viewport size
   * Tablet testing will be done on a `1200px` x `500px` viewport size
   * Mobile testing will be done on a `600px` x `500px` viewport size

## 3. Submission

At the end of your specified exam time, we will automatically collect the code on your `master` branch's HEAD (i.e. latest commit). 

Please note: If you develop locally ensure you check that your code works on the CSE servers. Failure to do so could result in a fail mark in the exam.

## 4. Originality of Work

The work you submit must be your own work. Submission of work partially or completely derived from any other person or jointly written with any other person is not permitted.

The penalties for such an offence may include negative marks, automatic failure of the course and possibly other academic discipline. Assignment submissions will be examined both automatically and manually for such submissions.

Relevant scholarship authorities will be informed if students holding scholarships are involved in an incident of plagiarism or other misconduct.

Do not provide or show your assignment work to any other person — apart from the teaching staff of COMP6080.

If you knowingly provide or show your assignment work to another person for any reason, and work derived from it is submitted, you may be penalized, even if the work was submitted without your knowledge or consent.  This may apply even if your work is submitted by a third party unknown to you.

Note you will not be penalized if your work has the potential to be taken without your consent or
knowledge.
