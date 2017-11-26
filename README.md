# chumm-uffa
Meeting platform for climbers


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



