# Meeting 2

* 26th of April 2021 11:00 a.m. - 12:00 p.m.
* Minute taker: Paul Max Scholz
* Attendants:
	* Marvin Davieds
	* Jan Hasselberg
	* Julian Ohland
	* Paul Max Scholz
	* Lukas Schüler

* Excused:
	* Sanket Sadanad Deshpande

## Agenda

1. Discussion of new technologies as per last weeks task
2. Further discussion of system-requirements
3. Organisation

## 1 Technologies

### Database

* Local Storage ineffecient due to storage space restrictions
* PouchDB allows for synchronization between local databases
	* Document based storage
	* Is synchronization possible via P2P?
* Browser impose limits on how much may be saved by them 
	* Different for every browser (some fixed some dynamic)
	* How can we overcome these heterogeneous limitations?
	
* Only query most recent posts and more only if space is available
	* Don't allow for multimedia
### Communication

* WebRTC still seems like the most viable approach
	* Circumvent Firewall through STUN

### TypeScript vs Kotlin

Some discussion surrounded the question of whether to use TypeScript or Kotlin for frontend development. Arguments in favor of Kotlin focussed on prior experience and its novelty in conjunction with React. However, concerns were raised due to the fact that Kotlin seemed an unorthodox choice. 

* React + Kotlin
	+ Statically typed language
	+ Novel experience
	- How supported/documented is Kotlin (is there a good interface for WebRTC or Redux?)
	- How well does Kotlin work with Web 2.0 technologies?

* React + TypeScript
	+ Good compatibility with common Web 2.0 technologies
	+ Common and well documented libraries
	- "Treading the beaten path"

The group decided that using TypeScript would ease implementation.

## 2 System-Requirements and Use-Cases

* Simple timeline where messages can be posted
	* For starters only text based posts, i.e., no images, videos, gifs due to storage limitations

* How can we make sure that, if a user deletes a post, all locally stored copies are deleted as well?
	* Central server for keeping track of message status and who received them
	* Server only saves ID of message not the content
	* If user deletes message its status will change on the server thus triggering a delete for all other users
	* Alternativly 

* How do users know where to send/receive posts, i.e. how do they know another users IP adress?
	* Connections are saved on the central server

* Need for a formal system definition was identified

## 3 Organisation

### Preliminary Responsibilties

* Julian: local database (PouchDB)
* Jan: python server
 
Also responibilities are to be split amongst the different system components, frequent code-reviews are to be conducted. This will aid in every member gaining some insight into the system as a whole.


## Until the Next Meeting

* Monday 3rd of May 2021 at 11:00 a.m.
* Formalize system architecture (diagrams, list of requirements)
* Test different technologies (WebRCT, PouchDB, etc.)
* Determine responsibilities for all group members
