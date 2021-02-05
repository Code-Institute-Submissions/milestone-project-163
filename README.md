# Match the Ministers

### A simple Javascript memory game where players must match up British prime ministers.
Match the Ministers is an example of a classic memory game. 
The game consists of 16 cards - in this instance - split into 8 pairs.
All cards share identical 'backs', with the 'fronts' displaying one of 8 British prime ministers.

The chosen ministers are:
Gordon Brown, David Cameron, Neville Chamberlain, Winston Churchill, Anthony Eden, Boris Johnson, John Major and Theresa May.
Please note that the selection was somewhat random and no political leanings should be inferred.

### Gameplay ###
- The single-player game consists of the player turning over cards, two by two, until the full grid of cards has been 'matched'.
- A match occurs when the two cards turned over by a player within one particular turn show the same prime minister.
- There will be a timer counting down from the beginning of the game. The goal is to match all cards before time runs out.
- The number of moves, of 'turns', made by a player will be recorded, with the goal being to complete the game in as few moves as possible.

### Application Features ###

The current key features of the application are:
* Providing a simple, intuitive and fun online game that can be played in a short period of time.
* Possibly stoking interest in who past prime ministers might have been in the case that the user does not recognise their image.

## UX ##
User stories:
- Anyone looking to stimulate their memory through a game requiring minimal effort to grasp
- Possibly school children who, it is hoped, will take some interest in their political leaders - past and present - after encountering them in an enjoyable scenario.


## Problems Encountered:
- Accidentally highlighting or selecting overlay text when trying to start or restart a game.
Solution: Set the user-select property of the overlay class to be none, as described in an answer on
https://stackoverflow.com/questions/5429827/how-can-i-prevent-text-element-selection-with-cursor-drag

### Five Planes ###
* Strategy: The site exists to host a fun variant of a classic game to be played for leisure and mental stimulation.

* Scope: The requirements of the site can all be addressed with a single page consisting of:
    - Title indicating nature of the site ('Match the Minister')
    - Game grid
    - Game information, e.g. tracking time remainaing and moves made
    - Ability to start/restart the game when appropriate 

* Structure: The below images show wireframes for the desktop and mobile versions of the site, as well as how the overlay would work in the desktop case. The mobile variant follows the same pattern.

    #### Wireframes ####

    - [Desktop](https://github.com/spf34/milestone-project-2/tree/master/assets/images/wireframes/desktop.png)
    - [Desktop Overlay](https://github.com/spf34/milestone-project-2/tree/master/assets/images/wireframes/desktop_overlay.png)
    - [Mobile](https://github.com/spf34/milestone-project-2/tree/master/assets/images/wireframes/mobile.png)
  
* Skeleton: In concrete terms, the game will be based around a flexbox table consisting of equally sized card objects. 
It will be necessary for the cards to be two-sided, represented by 'front' and 'back' face classes, and to be able to 'rotate' to toggle the users' view between the two.
The underlying logic behind how this is achieved closely follows X & Y, and is discussed in the credit section below.

* Surface: Visually, the page will make use of a family of clean blues for the title and background, with white for the overlay text and a classical, official image for the card backs. 
Together these design choices aim to evoke the idea of tradition associated with the post of prime minister.

## Features ##

Overlays:
- A new game will always be started from an overlay screen with a click of the mouse or a tap of the screen
- There are three overlays:
    * New game - appearing upon first arriving at the sight
    * Victory - appearing after the user has 'won' by matching all cards with the alloted time
    * Gameover - appearin after the user has 'lost' by not matching all cards before the timer runs out

[New Game Overlay](https://github.com/spf34/milestone-project-2/tree/master/assets/images/gameplay/home_screen.png)
[Victory Overlay](https://github.com/spf34/milestone-project-2/tree/master/assets/images/gameplay/victory.png)
[Gameover Overlay](https://github.com/spf34/milestone-project-2/tree/master/assets/images/gameplay/gameover.png)

Game Information:
- We store the number of moves made by the user and the time remainaing until gameover above the game grid
- These elements are dynamically updated in Javascript as the game progresses

[Game Information](https://github.com/spf34/milestone-project-2/tree/master/assets/images/gameplay/play_begins.png)

Interactive Game and Game Grid
- Each of the 16 cards is clickable and will turn over if it is not already part of a matched pair
- Consideration was taken to
    * Randomly shuffle the cards so that gameplay is not deterministic
    * Provide the illusion of cards being 3 dimensional whilst they are turning
    * Return any two cards constituting an unsuccesful move to be face down with a delay so that the user can take note of their positions
    * Prohibit moves that consist of flipping and then reflipping the same card
    * Prohibit moves that flip an already matched card
    * Prohibit more than two cards being flipped as part of any one move
    * Reset the game grid upon a new game being started following victory or defeat
- Sound effects were added to the game to improve the user experience
    * A celebratory trumper sound plays when two cards are matched
    * Overlapping matches are handled in such a way that both sound clips will play
    * Upbeat and downbeat piano clips play upon victory and gameover, respectively

[Matched Cards](https://github.com/spf34/milestone-project-2/tree/master/assets/images/gameplay/first_match.png)
[Middle of Move](https://github.com/spf34/milestone-project-2/tree/master/assets/images/gameplay/mid_turn.png)

## Technologies, Frameworks & Tools Used ##
- HTML/HTML5
- CSS/CSS3
- JavaScript
- Gitpod: online IDE
- Github: version control framework hosting code repository
- tinypng: reduce image file size

## Testing ##
- [HTML code validator](https://validator.w3.org/) - No errors or warnings
- [CSS code validator](https://jigsaw.w3.org/css-validator/) - No errors or warnings
- [JavaScript Linter](https://jshint.com/) - No errors or warnings after making changes to avoid the following warnings:
    * Undefined variables caused by omission of 'var', 'let', etc.
    * Warnings on use of 'let' versus 'var' for global variables
    * Warning on iterating through array objects directly instead of using an index for access
    * Unused variable definition warning
- Gameplay:
    * Check that number of clicks are correctly recorded. In particular, this includes not counting clicks as part of illegitimate moves
    * Check that time remaining is correctly recorded and gameover is triggered upon reaching 0
    * Check that overlays respond to click events and cause a clean new game to be started, including reset of time and clicks made and turning of cards
    * Check that the appropriate overlay is triggered by the appropriate event
    * Check that appropriate sounds are played when they should be, including when two matches follow closely after one another
    * Check that no illegitimate moves are allowed, including double-flips, flips of matched cards and flipping more than two cards per move
    * Check that card shuffle is taking effect and that the ordering of the cards is non-deterministic
- General
    * Checking all images have alternate text (background-images were excluded from the check as they are purely aesthetic)
    * Checking for and removing any unused CSS classes
    * Viewing the game on all of the available devices in Chrome developer tools. Several issues discovered this way and fixed satisfactorily. In particular, the inability to use a double click feature to trigger events. 
    * Test switch from 4 columns to 2 columns on smaller devices
    * Test using Chrome and Safari

## Bugs ##


### Unresolved ###
- Victory/Gameover sounds can still be playing at the start of a new game if it was triggered quickly enough. I attempted to use a setTimeout method before triggereing a new game to allow time for these clips to finish but encountered issues handling the overlays that I did not get to the bottom of
- Shuffling algorithm used may not be fully random on all cards. As an example, card 1 seems fixed more than might be expected.

## Deployment ##
This section closely follows the example given here: [README example](https://github.com/AJGreaves/portrait-artist/blob/master/README.md)

The project was developed using the Gitpod IDE and committed to github with git.

The project was deployed from its [GitHub repository](https://github.com/spf34/milestone-project-2) to GitHub pages using the usual steps:
1. Navigate to the repository on GitHub
2. Click 'Settings' and scroll down to the 'GitHub Pages' subsection
3. Under Source click the drop-down menu labelled None and select Master Branch
4. On selecting Master Branch the page is refreshed and the website will now be deployed
5. Here is a link to the deployed page: [GitHub Pages Deployment](https://spf34.github.io/milestone-project-2/)

## Credits ##

### Code ###
The overall sturcture of my code, and particularly the way in which HTML & CSS were used to form the game grid and allow cards to be turned, very closely follows a mixture of the following three sources:
[Memory Card Game - JavaScript Tutorial](https://www.youtube.com/watch?v=ZniVgo8U7ek&ab_channel=freeCodeCamp.org)
[How to Code a Card Matching Game](https://www.youtube.com/watch?v=28VfzEiJgy4&t=0s)
[Live Coding a Memory Game: HTML, CSS, Javascript](https://www.youtube.com/watch?v=bbb9dZotsOc)

### Media ###

#### Sounds: ####
All sounds were sourced from https://freesound.org.

#### Images: ####
Sourced from the Wikipedia page 'List of Prime Ministers of the United Kingdom':
https://en.wikipedia.org/wiki/List_of_prime_ministers_of_the_United_Kingdom

### Acknowledgement ###
- My tutor, Nishant Kumar, for ideas and useful resources