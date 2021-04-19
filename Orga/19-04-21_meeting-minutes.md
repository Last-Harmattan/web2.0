# Meeting 1

* 19th of April 2021 11:00-12:00 a.m.
* Minute taker: Paul Max Scholz
* Attendants:
	* Marvin Davieds
	* Sanket Sadanad Deshpande
	* Jan Hasselberg
	* Julian Ohland
	* Paul Max Scholz
	* Lukas Schüler

## Agenda

1. Discussion regarding the general system architecture
2. Discussion regarding the technologies for implementation
3. Further organisation

## 1 System Architecture

Given the topic "Central Systems are Evil", how much centralization should our system use? Several proposals where tabled:

* exchange of data via central server
	* users "subscribe" to other users they're interested in
	* server queues encrypted messages from posting user and deletes data ones all interested receipients received the message
	* BUT: requires trust in the server, i.e., that the server deletes data once delivered
* centralized user registry so that users may find one another
	* central server provides users with the option to expose information about them (e.g. name, interests,...)
	* users are able to find other users they don't know (in real life) and subscribe to those users timeline
	* BUT: no complete anonymity
* exchange of data via P2P connections
	* messages are not exchanged over a central instance and only between two parties
	* BUT: users need to be online at the same time
* P2P with "torrentesque" data storage
	* if the author of a post isn't online, users may still get posts from other users who received the post
	* posts are saved redundantly, distributed and locally
	* BUT: what if other user manipulates/falsifies posts on their device? -> digital signatures
	* BUT: increases complexity

The preliminary decision is, that all communication will take place P2P. Messages will never be stored on a central server, not even temporarily for transfer purposes. Users will, however, register with a server and have the option to expose various informations about them. This enables user to find each other and search for people with similar interests. Users will be able to create posts in a cḱind of timeline which is stored locally in their browser. Other users may subscribe to them and will be able to look at their timeline. Other users timelines will be updated on your device once they come online. New posts will then be send to all subscried users via a P2P connection.

## 2 Technologies

Several technologies where proposed for different parts of the system

* Frontend: React, Angular
* Backend: Python micro-frameworks like Bottle or Flask
* Connectivity: P2P via WebRCT
* Database: IndexDB
* REST API
* Go, TypeScript
* Content Management Systems

No final decision was taken and we  agreed to do further research on the merits and suitability of the above technologies. However, larger frameworks such as Django where rejected for being to big for our purposes. The same argument was made in regards to content management systems.

## 3 Organisation

* Monday at 11:00 a.m. was agreed upon as a timeslot for further meetings
* Certain parts of the system are to be handled by a specific expert, however, all members should gain insight in all parts of the system
	* Jan was interested in handling the backend with Python as well as REST APIs
	* Marvin showed interest in experimenting with Go and WebRCT

# Until the next Meeting

* Monday 26th of April 2021 at 11:00 a.m.
* all users should individually gain an overview over the discussed technologies and seek out possible alternatives
