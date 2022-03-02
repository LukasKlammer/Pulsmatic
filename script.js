let t = 20; // timer auf gewünschte Zeit in Sekunden einstellen (fix)
let c = 10; // countdown Variable setzen, damit Nutzer sich besser vorbereiten kann
let factor = 60 / t; // counter zählt die Klicks im Zeitraum t, muss noch multipliziert werden, um auf 1 Minute zu kommen
let counter = 0; // zählt die Klicks auf den großen Button

function start() { // Start-Funktion - wird aufgerufen, wenn button start gedrückt

    hide('button-start'); // versteckt startbutton

    show('button-count'); // Zähl-Button wird angezeigt


    startDelay(); // Countdown, damit sich User bereitmachen kann


    show('button-newstart'); // Neustart-Button wird angezeigt

}

function startDelay() {

    if (c >= 0) { // zählt, bis countdown-Zeit abgelaufen ist (c=0)
        document.getElementById('result').innerHTML = `Messung beginnt in in ${c} Sekunden...`; // bei jedem Durchlauf wird noch verbleibende Zeit angezeigt 
        c--;
        setTimeout(startDelay, 1000);
    }
    else {
        counter = 0; // Zähler wird zurückgesetzt (wenn user vor Programmstart Leertaste drückt oder im countdown button drückt wäre er nicht 0)
        measuring(); // Messung startet - Ergebnis wird nach Ablauf der Zeit ausgegeben
    }
}

function measuring() {

    if (t >= 0) { // zählt, bis Zeit abgelaufen ist (t=0)
        document.getElementById('result').innerHTML = `Messung läuft: noch ${t} Sekunden...`; // bei jedem Durchlauf wird noch verbleibende Zeit angezeigt 
        t--;
        setTimeout(measuring, 1000); // measuring-Funktion wird alle 1 Sekunde ausgeführt, bis die Zeit abgelaufen ist, dann springt Programm weiter
    }
    else {
        hide('button-count'); // versteckt Zähl-Button
        document.getElementById('result').innerHTML = `Dein Puls beträgt ${calcPulse()} Schläge pro Minute. Das ist ${feedback()}.`; // Gibt das Ergebnis aus
    }
}

function newstart() { // lädt die App neu - alle Werte der Variablen werden auf Anfangszustand zurückgesetzt
    location.reload();
}

function pushButton() { // drückt den Zähl-Button per beliebigen Tastendruck
    document.getElementById('button-count').click();
    activeButton('button-count');
    setTimeout(function(){
        inactiveButton('button-count');
    }, 75);
}


function count() { // pro Klick wird Zähler um 1 erhöht
    counter++;
}

function calcPulse() { // die Konstante 2 sollte noch variabel gemacht werden
    let result = counter * factor; // multipliziert den Zähler mit einem Faktor --> Ergebnis sind Pulsschläge pro Minute
    return result;
} 

function feedback() { // gibt Feedback zu den Werten
    if (calcPulse() < 45) {
        return 'zu tief';
    }
    if (calcPulse() > 120) {
        return 'zu hoch';
    }
    else {
        return 'im Normalbereich';
    }
}

function hide(id) {
    document.getElementById(id).classList.add('d-none'); // versteckt Element
}

function show(id) {
    document.getElementById(id).classList.remove('d-none'); // holt Element aus Hintergrund zurück
}

function activeButton(id) {
    document.getElementById(id).classList.add('button-count-active');
}

function inactiveButton(id) {
    document.getElementById(id).classList.remove('button-count-active');
}