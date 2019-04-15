import React, { Component } from 'react';
import axios from "axios";
import qs from "qs";


class Task extends Component {

    constructor(props) {

        super(props);

        this.state = {
            title: '',
            type: '',
            price: '',
            deadline: '',
            description: '',
        };

        this.modifyTask = this.modifyTask.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    displayForm(event){
        const elements = event.target.parentElement.parentElement.childNodes;

        for(let element of elements){
            element.style.display = element.tagName === 'FORM' ? 'block' : 'none';
        }
    }

    hideForm(event){
        const elements = event.target.parentElement.parentElement.childNodes;

        for(let element of elements){
            element.style.display = element.tagName === 'FORM' ? 'none' : 'block';

            if(element.tagName === 'DIV'){
                element.style.display = 'flex';
            }
        }

    }

    modifyTask(event){

        event.preventDefault();
        let object = {id: this.props.data.id, addTime: this.props.data.addTime};
        for(let key of Object.keys(this.state)){
            object[key] = this.state[key] === '' ? this.props.data[key] : this.state[key];
        }

        //console.log(object);

        axios.put('/api/task', qs.stringify(object)).then(function(resopnse){
            console.log(resopnse);
        }).then(function(error){
            console.log(error);
        });

        this.setState({
            title: '',
            type: '',
            price: '',
            deadline: '',
            description: ''
        })
    }

    render(){

        const d = new Date();
        const tomorrow = d.setDate(d.getDate() + 1);
        //console.log(new Date(tomorrow).toISOString().slice(0, 10));

        return(
            <div className="task">
                <h3>{this.props.data.title}</h3>
                <div className="buttons">
                    <button className="modify" onClick={this.displayForm}>Modyfikuj</button>
                    <button className="delete" onClick={() => this.props.deleteTask(this.props.data.id)}>Usuń</button>
                </div>
                <span><b>Typ:</b> {this.props.data.type}</span>
                <span><b>Opis:</b> <br/>{this.props.data.description}</span>
                <span><b>Wynagrodzenie:</b> {this.props.data.price} PLN</span>
                <span><b>Data dodania: </b>{this.props.data.addTime.substring(0,10)}</span>
                <span><b>Data wygaśnięcia: </b>{this.props.data.deadline.substring(0,10)}</span>
                <form onSubmit={this.modifyTask}>
                    <label><input type="text" name="title" placeholder={this.props.data.title} onChange={this.onChange} required/></label>
                    <label><textarea name="description" placeholder={this.props.data.description} onChange={this.onChange} required/></label>
                    <label><input type="number" name="price" placeholder={this.props.data.price} onChange={this.onChange} required/></label>
                    <label><input type="date" name="deadline"  min={new Date(tomorrow).toISOString().slice(0, 10)} onChange={this.onChange} required/></label>
                    <label>
                        <select name="type" onChange={this.onChange} required>
                            <option>{this.props.data.type}</option>
                            {['CAR', 'SHOP', 'DOG', 'LAWN', 'LEAF', 'SNOW', 'TRASH', 'BROOM'].filter(name => name !== this.props.data.type).map(name => <option>{name}</option>)}
                        </select>
                    </label>
                    <input type="submit" value="Zapisz zmiany"/>
                    <button onClick={this.hideForm}> Anuluj zmiany</button>
                </form>

            </div>
        )
    }
}

export default Task;