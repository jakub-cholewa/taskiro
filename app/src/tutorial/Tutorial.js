import React, { Component } from 'react';


class Tutorial extends Component {

    render() {
        return (
            <div id="tutorial-box" style={{color: 'white', margin: '50px'}}>
                <h2>Korzystanie z aplikacji Taskiro:</h2>
                <br/>
                Aby móc skorzystać z serwisu internetowego aplikacji Taskiro należy:<br/>
                - połączyć się ze stroną www.taskiro.org<br/>
                - zalogować się bądź utworzyć konto i zalogować się<br/>
                <br/>
                <h3>Zakładki:</h3>
                <br/>
                <h4>Mapa</h4>
                - głównym panelem po zalogowaniu jest widok mapy, do którego można przechodzić później klikając na
                górnym panelu w zakładkę "Mapa"<br/>
                - w głównym panelu aplikacji użytkownik może zobaczyć na mapie taski dostępne w jego okolicy<br/>
                - klikając na task, może zobaczyć jego szczegóły oraz dodać go do swoich zadań do wykonania, poprzez
                kliknięcie przycisku: "Wykonaj zadanie"<br/>
                - poprzez kliknięcie przycisku "+" w prawym dolnym rogu użytkonwik może dodać zadanie, które chce zlecić
                do wykonania<br/>
                <br/>
                <h4>Tutorial</h4>
                - tutaj znajduje się tutorial działania aplikacji<br/>
                <br/>
                <h4>Taski</h4>
                - tutaj użytkownik może zobaczyć na swoje taski, zarówno te które przyjał na siebie jak i te, które
                zlecił do wykonania<br/>
                <br/>
                <h3>Dodawanie zadania:</h3>
                Dodając zadanie należy:<br/>
                - podać nazwę zadania<br/>
                - wybrać "Typ Taska" - określa on rodzaj zadania, czego dotyczy, np. w przypadku tworzenia zadania
                "Umycie samochodu", należy wybrać ikonkę przedstawiającą samochód<br/>
                - podać lokalizacje, gdzie zadanie jest do wykonania (ulica, nr budynku)<br/>
                - wpisać kwotę wynagrodzenia za wykonanie taska<br/>
                - wybrać datę realizacji zadania<br/>
                - krótko opisać specyfikację zadania<br/>
                - utworzyć task klikając przycisk: "Dodaj Task"<br/>
                <br/>
                <br/>
            </div>
        );
    }
}

export default Tutorial;