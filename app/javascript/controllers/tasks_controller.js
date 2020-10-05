// Visit The Stimulus Handbook for more details 
// https://stimulusjs.org/handbook/introduction
// 
// This example controller works with specially annotated HTML like:
//
// <div data-controller="hello">
//   <h1 data-target="hello.output"></h1>
// </div>

import {Controller} from "stimulus"

export default class extends Controller {

    toggleComplete(event) {
        event.preventDefault()

        const taskId = event.target.parentElement.dataset.taskId
        let data

        if (event.target.checked === true) {
            data = `task[id]=${taskId}&task[complete]=true`
        } else {
            data = `task[id]=${taskId}&task[complete]=false`
        }

        Rails.ajax({
            url: event.target.parentElement.dataset.taskUrl,
            type: 'patch',
            data: data,
            error: (errors) => {
                console.log(errors)
            },
            success: (response) => {
                event.target.parentElement.classList.toggle('completed')
            }
        })
    }
}
