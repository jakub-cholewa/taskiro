import React, { Component } from 'react';
import '../styles/MapContainer.css';
import axios from "axios";
import qs from "qs";
import ReactDOM from "react-dom";
import Main from "./Main";


class Pane extends Component{
    constructor(props){
        super(props);
        console.log(props);

        this.reserveTask = this.reserveTask.bind(this);
    }

    reserveTask(){
        /*
        axios.post(link do backendu, qs.stringify({ dane do przesyłania | ewntualnie zmienić typ zapytania
        })).then(function(response){

        }).catch(function(error){
            console.log(error);
        });
        */
    }

    render(){
        return(
            <div className="task-marker">
                <span>{this.props.task.title}</span>
                <span>Typ:</span>
                <span>{this.props.task.type}</span>
                <span>Opis:</span>
                <span>{this.props.task.description}</span>
                <span>Wynagrodzenie</span>
                <span>{this.props.task.price} PLN</span>
                <span>Data wygaśnięcia:</span>
                <span>{this.props.task.deadline}</span>
                <button onClick={this.reserveTask}>Wykonaj zadanie</button>
            </div>
        )

    }}

export default Pane;