import React, { Component } from 'react';
import '../styles/TaskModal.css';
import broom from '../resources/broom.png'
import car from '../resources/car.png'
import cart from '../resources/cart.png'
import dog from '../resources/dog.png'
import lawn from '../resources/lawn.png'
import leaf from '../resources/leaf.png'
import snow from '../resources/snow.png'
import trash from '../resources/trash.png'
import axios from "axios";
import qs from "qs";
import {geocodeByAddress,getLatLng} from 'react-places-autocomplete';


class TaskForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            type: '',
            lat: '',
            lng: '',
            price: '',
            deadline: '',
            description: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setType = this.setType.bind(this);

    }


    onSubmit(event) {

        event.preventDefault();

        const self = this;

        if (this.state.type !== '') {
            const date = new Date().toISOString().slice(0, -5);
            const deadline = new Date(this.state.deadline).toISOString().slice(0, -5);
            axios.post('/api/users/2/tasks', qs.stringify({
                title: this.state.title,
                type: this.state.type,
                lat: this.state.lat,
                lng: this.state.lng,
                price: this.state.price,
                deadline: deadline,
                description: this.state.description,
                addTime: date
            })).then(function (response) {

                document.querySelector("form").reset();

                const icon = document.querySelector("img[name='" + self.state.type + "']");
                icon.style.border = '';

                self.setState({
                    title: '',
                    type: '',
                    lat: '',
                    lng: '',
                    price: '',
                    deadline: '',
                    description: ''
                });

            }).catch(function (error) {
                console.log(error);
            })
        }
    }


    onChange(event) {
        const self = this;
        if (event.target.name === "location") {
            geocodeByAddress(event.target.value)
                .then(results => getLatLng(results[0]))
                .then(latLng => self.setState({lat: latLng.lat, lng: latLng.lng}))
                .catch(error => console.error('Error', error));
        }
        else {
            this.setState({[event.target.name]: event.target.value});
        }
    }

    setDate(event) {
        const d = new Date();
        const tomorrow = d.setDate(d.getDate() + 1);
        const deadline = new Date(tomorrow).toISOString().slice(0, 10);
        this.setState({[event.target.name]: deadline});
    }

    setType(event) {

        const type = this.state.type === event.target.name ? '' : event.target.name;
        this.setState({type: type});


        if (event.target.style.border === '') {
            const icons = document.querySelectorAll("label[name='type'] ul li img");
            for (let icon of icons) {
                icon.style.border = '';
            }
            event.target.style.border = '2px solid forestgreen';
        }
        else {
            event.target.style.border = '';
        }
    }


    render() {

        const d = new Date();
        const tomorrow = d.setDate(d.getDate() + 1);
        console.log(new Date(tomorrow).toISOString().slice(0, 10));
        return (
            <div className='chooseType'>
                <div className='popup_inner'>
                    <form onSubmit={this.onSubmit}>
                        <label>Tytuł: <input type="text" name="title" id="taskTitle" onChange={this.onChange} required/></label>
                        <label> Typ Taska:
                            <ul>
                                <li><img src={car} alt="my image" onClick={this.setType} name="CAR"/></li>
                                <li><img src={cart} alt="my image" onClick={this.setType} name="SHOP"/></li>
                                <li><img src={dog} alt="my image" onClick={this.setType} name="DOG"/></li>
                                <li><img src={lawn} alt="my image" onClick={this.setType} name="LAWN"/></li>
                                <li><img src={leaf} alt="my image" onClick={this.setType} name="LEAF"/></li>
                                <li><img src={snow} alt="my image" onClick={this.setType} name="SNOW"/></li>
                                <li><img src={trash} alt="my image" onClick={this.setType} name="TRASH"/></li>
                                <li><img src={broom} alt="my image" onClick={this.setType} name="BROOM"/></li>
                            </ul>
                        </label>
                        <label>Lokalizacja: <input type="text" name="location" id="taskLocation"
                                                   onChange={this.onChange} required className='location-search-input'/>
                        </label>
                        <label>Wynagrodzenie (PLN): <input type="number" /*step="0.01"*/ name="price" id="taskPrice"
                                                           onChange={this.onChange} required/></label>
                        <label>Data Ważności:<input type="date" name="deadline" id="taskDeadline"
                                                    min={new Date(tomorrow).toISOString().slice(0, 10)}
                                                    onChange={this.onChange} required/></label>
                        <label>Krótki Opis: <textarea name="description" id="taskDescription" onChange={this.onChange}
                                                      required/></label>
                        <input type="submit" value="Dodaj Taska" id="addTaskButton"/>
                    </form>


                </div>
            </div>
        );
    }
}

export default TaskForm;