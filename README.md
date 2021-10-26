# Project Blue Frame
### An web browser picture and video frame using JS and Docker

## About

* Should be access from any smart device;
* Should use a web framework (like node.js or react) and Docker for easy distribution;
* Should allow the user to create albuns (folders) to be displayed;
* Should allow the user to access an admin page to configure each connected display;
* Should allow remove upload;
* [OPT] Should have spotify integration.

## Version notes

* v1.0:
  * Implemented:
    * [x] Should be access from any smart device;
    * [x] Should use a web framework (like node.js or react) and Docker for easy distribution;
    * [x] Should allow the user to create albuns (folders) to be displayed.
  * Issues:
    * There is no arm64 version of mongo in docker;
    * React is faling in raspberry pi 3b+;
  * Future plans for v1.1:
    * Adding album management;
    * Allow to select album to display;
    * Add [UIKit](https://getuikit.com/);
    * Fix issues related with pi 3b+.
* Future Plans for v2.0:
  * Change frontend framework, try svelte or pure javascrict;
  * Change database for another noSQL with arm64 suport.
