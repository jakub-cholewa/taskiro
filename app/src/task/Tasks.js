import React, { Component } from 'react';
import axios from "axios";
import Task from './Task.js';
import '../styles/tasks.css'
import {Marker} from "google-maps-react";


class Tasks extends Component{

    constructor(props){
        super(props);

        this.state = {tasks: [],
        currentPage: 0};

        this.retrieveTasks = this.retrieveTasks.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.switchPage = this.switchPage.bind(this);
    }

    deleteTask(id){

        const updatedTaskList = this.state.tasks.filter(task => task.id !== id);
        this.setState({tasks: updatedTaskList});
        axios.delete('api/task/' + id).then(function (response) {
            console.log(response);
        }).catch(function(error){
            console.log(error);
        });

    }

    retrieveTasks(){
        const self = this;
        axios.get('/api/users/2/tasks')
            .then( function(response){
                //console.log(response.data);
                const tasksRtrv = response.data;
                self.setState({
                    tasks: tasksRtrv
                });
            })
            .catch( function(error){
                console.log(error);
            })
    }


    switchPage(step){
        let index = this.state.currentPage;
        let lastIndex = Math.floor((this.state.tasks.length - 1) / 10);
        if(index + step < 0){
            this.setState({currentPage: lastIndex});
        }
        else if(index + step > lastIndex){
            this.setState({currentPage: 0});
        }
        else{
            this.setState({currentPage: index + step});
        }

    }



    componentDidMount() {
        this.retrieveTasks();
    }

    render(){

        return(
            <div id="task-box">
                <div className="slider-button" id="next-page" onClick={() => this.switchPage(1)}> > </div>
                <div className="slider-button" id="previous-page" onClick={() => this.switchPage(-1)}> {"<"} </div>
                <ul>
                {this.state.tasks.slice(this.state.currentPage * 10 , (this.state.currentPage + 1) * 10).map((task, index) =>
                    <li key = {index}>
                        <Task
                        data = {task}
                        deleteTask={this.deleteTask}
                    /></li>
                )}
                </ul>
            </div>
        )
    }
}

export default Tasks;