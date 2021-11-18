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
    * React is failing in raspberry pi 3b+;
* v2.0:
  * [x] Changed frontend framework from react to svelte;
  * [x] Changed database from mongoDb to postgres due to issues with Raspberry Pi.
  * [x] Updated docker files and compose.
* v2.1:
  * [ ] Update admin page with UiKit.
  * [ ] Display upload progress.
  * [ ] List saved images.
  * [ ] Allow delete images.
  * [ ] Allow to select album.
  * [ ] Add error handling to server.
  * [ ] Add variable for postgres user, postgres password and server url;
