# chumm-uffa
Meeting platform for climbers

Ziel der Platform ist es, Treffen von und für Kletterer zu organisieren. Möchte jemand eine Kletter-Tour im Freien oder 
in der Halle organisieren ist er hier genau richtig. Nach dem Registrien können beliebige Meetups erstellt werden, 
worauf sich anschliessend interessierte Personen registrieren können. Eine Suchfunktion untersützt beim findenen
von interessanten Meetups.   

## Komponenten
Die Anwendung besteht aus vier Komponenten:

![Overview](./doc/Overview.png)

#### Frontend
Das Frontend ist für sämtliche Interaktionen mit dem Benutzer zuständig. Ist mit Hilfe von [Angular 5](https://angular.io/) 
und [Angular Material](https://material.angular.io/) entwickelt.      

#### Backend
Das Backend stellt eine [Rest-API](./doc/rest-api.txt) zur Verfügung, um auf die Daten der Anwendung zugreifen zu können. 
Ist in [TypeScript](https://www.typescriptlang.org/) geschrieben und verwendet [Express](https://www.npmjs.com/package/express). 
Für den Zugriff auf die [MongoDB](https://www.mongodb.com/) wird [mongoose](http://mongoosejs.com/) eingesetzt.  

#### Interface 
Beschreibt die Schnittstelle zwischen Backen und Frontend.

#### Datenback
Zuständig für die Datenhaltung. Eine [MongoDB](https://www.mongodb.com/) wird hier verwendet.

## Installieren
Die Anwendung kann auf verschiedene Arten installierte werden:

### npm
Um die Anwendung via npm zu starten muss lokal [nodejs](https://nodejs.org/en/download/) installiert sein. Entwickelt und 
getestet wurde mit Version 8.9 .   

##### 1. Interface erstellen
Als erstes muss das Interface erstellt werden, da Backend und Forntend dies benötigen. 
```
    $ cd ./interface
    $ npm install
    $ npm run build
```

##### 2. MongoDB
Das Backend speichert seine Daten in einer MongoDB. Entweder auf dem Rechner oder im Netz muss somit eine Instanz einer 
MongoDB vorhanden sein. Für die loakale installation kann [hier](https://www.mongodb.com/download-center#community) die
aktuelle Version bezogen werden. Alternativ steht auch ein Docker Container mit MondoDB zu Verfügung der wie folgt gestartet
wird (Voraussetzung ist das [Docker](https://docs.docker.com/engine/installation/) und 
[Docker-Compose](https://docs.docker.com/compose/install/ ) installiert sind):

```
    $ cd ./data
    $ docker-compose up
```

##### 3. Backend starten
Befor das Backend gestartet wird, müssen eventuell einige Einstellungen angepasst werden. In der Datei ./backend/.env sind
die wichtigsten Einstellungen zu finden. Hier wird auch die Anbindung der MondoDB konfiguriet, falls sich diese nicht 
auf dem localen Rechner befindet.  

Sind alle Einstellungen korrekt, kann das Backend wie folgt gestartet werden:

```
    $ cd ./backend
    $ npm install
    $ npm run start
```

##### 4. Frontend starten
Ist das Backend gestarted, kann nun auch das Frontend gestarted werden:

```
    $ cd ./frontend
    $ npm install
    $ npm run start
```


## docker

Frontend und Backend sind in zwei unterschiedlichen Docker Kontainer verfügbar. Somit ist in einem 
späteren produktiven Einsatz eine saubere Trennung von Frontend und Backend möglich.

Um die Kontainer zu starten müssen Docker CE und Docker-Compose installiert sein.

* Docker CE: https://docs.docker.com/engine/installation/
* Docker Composer: https://docs.docker.com/compose/install/

Anschliessen im Root Verzeichniss folgenden Befehl ausführen um den Kontainer zu starten:
```
    $ docker-compose up
```

Nachdem der Kontainer gestartet ist das Fronend via Port 80 verfügbar.

* http://localhost

## Development
Für die Entwicklung kann entwerde mit oder ohne Docker Kontainer gearbeitet werden.

### Mit Docker
Für die Entwicklung ist eine separate Docker-Compose konfiguration verfügbar, die beide Kontainer so started,
dass Änderungen an den Sourcen sofort im jeweiligen Kontainer verfügbar sind. Mit folgendem Befehl wird 
die Entwicklungsumgebung gestarted:

```
   $ docker-compose -f docker-compose.development.yml up --build
```

Anschliessend sind Backend und Frontend verfügbar:

* Backend: http://localhost:8080/
* Frontend: http://localhost:4200/

### Ohne Docker 

Als Erster muss Angular cli local installiert sein. Falls nicht vorhande, so wird es installiert:

```
    $ npm i -g @angular/cli
```
Für das Frontend ins Verzeichniss ```./frontend``` wechseln und dann wie folgt starten: 

```
    $ npm install
    $ npm start
```

Für das Backend ins Verzeichniss ```./backend``` wechseln und dann wie folgt starten: 

```
    $ npm install
    $ npm start
```

Anschliessend sind Backend und Frontend verfügbar:

* Backend: http://localhost:8080/
* Frontend: http://localhost:4200/



