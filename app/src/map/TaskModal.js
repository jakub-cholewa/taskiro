import React, { Component } from 'react';
import '../styles/TaskModal.css';
import TaskForm from "./TaskForm";


class TaskModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isEdit: false,
        };

        this.changePopupState = this.changePopupState.bind(this);
    }


    changePopupState() {
        this.setState({
            isEdit: !this.state.isEdit
        });
    }


    render() {
        return (
            <div id='task-modal'>
                Dodaj Taska:
                <TaskForm changePopupState={this.changePopupState}/>
                <button name="closeTaskModal" onClick={this.props.closePopup.bind(this)}>Zamknij Okno</button>
            </div>
        );
    }
}

export default TaskModal;