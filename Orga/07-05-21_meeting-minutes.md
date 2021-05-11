# Meeting 3

* 7th of May 2021 03:00 p.m. - 04:00 p.m.
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

1. Findings regarding the tested technologies
2. Further clarification regarding the architecture
3. Allocating Responsibilities
4. Organisation

## 1 Technology Testing

### Database

* **PouchDB** natively offers synchronization capabilities
	* Two PDBs can't synchronize, only multiple PDBs may synchronize with one CouchDB
	* Two PDBs can, however, synchronize with another PDB locally 

* StorageAPI can estimate how much local storage is available
	-  Not implemented by all browsers

* OrbitDB can sync between multiple clients
	- Currently under development
	- Concerns regarding the safety of the system

### Communication

* PeerJS is a wrapper for WebRTC
	+ Ease of use

* **Vanilla WebRTC**
	+ Better documentation


## 2 Architecture

How can users find one another? Several options were put forward:
	
1. Central list of all users. If a user wants to find and subscribe to another users timeline he may look him up in the list
2. Same as before but users have to grant other users access to their timeline on a request basis
3. Users can choose to appear in the list. If these users want to share their timeline with other users they may send them a code.

It was agreed upon that the first option was, for the sake of simplicity, the one to go with. This approach could than be expanded upon in the future.

## 3 Allocating Responsibilities

Each team-member submitted their fields of interest, the responsibilities were assigned accordingly:

* **Marvin Davieds**: State Management using Redux, Web Hosting and WebRTC
* **Jan Hasselberg**: Backend using Python
* **Julian Ohland**: Database using PouchDB
* **Paul Max Scholz**: Frontend using React and TypeScript
* **Lukas Schüler**: Frontend using React and TypeScript, WebRTC
* **Sanket Sadanad Deshpande**: TBD

## 4 Organisation

Development will progress by utilizing the organisation features of GitHub. Issues will be created with developers solving them on branches. New features will be reviewed first by another developer before being merged into the *master*-branch. We hope this will ensure a consistent quality of code as well a all developers gaining an overview of the systems components.

Due to scheduling conflicts the current reoccuring meeting time of 11:00 a.m. on Mondays is no longer viable. the new slot will be on Thursdays at 3:00 p.m.

## Until the Next Meeting

* The exact date of the next meeting is still to be decided
* Create issues in GitHub

