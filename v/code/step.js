//
//Import the navigator class to access the response.
import * as navigator from "./navigator.js";
//
//This class helps the user navigate through the system, one step after another.
export class step {
    id;
    navigator;
    //
    //The number associated with the current step, and this allows each step to know 
    //where it is, relative to its siblings.
    num;
    //
    //The label of this step in the steps panel.
    label;
    //
    constructor(id, navigator) {
        this.id = id;
        this.navigator = navigator;
    }
    //
    //Help the user determine the current step s/he is in.
    async execute(i, max) {
        //
        //Save the step number globally.
        this.num = i;
        //
        //1. Update the steps panel and associate the corresponding label with
        //this step.
        this.show_step();
        //
        //2. Update the interactions panel.
        this.update_interaction();
        //
        //3. Update the buttons panel.    
        this.update_button(max);
        //
        //Compile execute's response.
        //
        //Put the click event listeners wrapped into a promise to resolve the promise
        //depending on the button that is clicked.
        const result = await new Promise((resolve) => {
            //
            //Listener for next button.
            navigator.navigator.next.onclick = () => {
                //
                //Check this step after completing it.
                this.done();
                //
                if (i < max)
                    resolve({ dir: "next" });
                //
                if (i === max - 1)
                    resolve({ dir: "break", ok: true });
            };
            //
            //Listener for previous button.
            navigator.navigator.prev.onclick = () => {
                //
                //Ensure the user is within the stipulated steps.
                if (i > 0)
                    resolve({ dir: "prev" });
                else
                    alert("You can not move back beyond this point");
            };
            //
            //Abort the steps.
            navigator.navigator.cancel.onclick = () => {
                //
                //Ensure the user didn't cancel by mistake.
                const ans = window.confirm('Do you really want to abort the process');
                //
                if (ans === true)
                    resolve({ dir: "break", ok: false });
            };
        });
        //
        return result;
    }
    //
    //Change the content of the interactions panel depending on the step the 
    //user is currently in.
    update_interaction() {
        //
        //Iterate through the steps while painting the elements through which 
        //the user interacts with.
        //
        //Store the ith steps.
        const ith = this.num;
        //
        //Show the correct interaction pael depending on the current step.
        switch (ith) {
            //
            case 0:
                navigator.navigator.interactions.innerHTML = this.id;
                break;
            case 1:
                navigator.navigator.interactions.innerHTML = this.id;
                break;
            case 2:
                navigator.navigator.interactions.innerHTML = this.id;
                break;
            case 3:
                navigator.navigator.interactions.innerHTML = this.id;
                break;
            case 4:
                navigator.navigator.interactions.innerHTML = this.id;
                break;
            case 5:
                navigator.navigator.interactions.innerHTML = this.id;
                break;
            case 6:
                navigator.navigator.interactions.innerHTML = this.id;
                break;
            case 7:
                navigator.navigator.interactions.innerHTML = this.id;
                break;
        }
    }
    //
    //Change the button(s) depending on the step the user is currently in.
    update_button(max) {
        //
        //Hide the previous button if the user is on the first step.
        if (this.num === 0)
            navigator.navigator.prev.style.visibility = "hidden";
        else
            navigator.navigator.prev.style.visibility = "visible";
        //
        //Swap the next buttton to finish when the user is on the last step.
        if (this.num === max && this.num > max - 1) {
            //
            //Change the content of the next button to finish, when the user 
            //is on the last step.
            navigator.navigator.next.innerHTML = "Finish";
        }
    }
    //
    //Check a step after finishing it.
    done() {
        //
        //Check the step
        this.check_step();
    }
    //
    //Highlight (in the steps panel) the stage that is currently executing.
    show_step() {
        //
        //1. Remove any highlight attributes under steps.
        //
        //Select every node under the step that has a highlighted class.
        const highlights = this.navigator.steps.querySelectorAll(".highlighted");
        //
        //Step through all the highlighted nodes and for each one of them remove
        //the highlight.
        highlights.forEach((highlight) => highlight.classList.remove("highlighted"));
        //
        //2. Add a highlight class attribute to the div.
        this.label.classList.add("highlighted");
        //
        //Uncheck all the steps that are below the current one.
        this.uncheck_step();
    }
    //
    //Check the translation stage after the user has completed it.
    check_step() {
        //
        let i = this.num;
        //
        //Get the checkbox which is inside the div.
        const object = navigator.navigator.steps_array[i];
        //
        //Get the object's checkbox.
        const checkbox = object.label.querySelector("input");
        //
        //Ensure there is an checkbox.
        if (checkbox === null) {
            //
            //The message to display.
            const msg = `Input checkbox not found on step ${this.id}`;
            alert(msg);
            throw new Error(msg);
        }
        //
        //Check the checkbox depending on the translation stage the user is in.
        checkbox.checked = true;
    }
    //
    //Uncheck all the steps that are below the given div element.
    uncheck_step() {
        //
        //Loop through each step and uncheck all steps after the current step.
        for (let i = this.num; i < navigator.navigator.steps_array.length; i++) {
            //
            const object = navigator.navigator.steps_array[i];
            //
            //Get the object's checkbox.
            const checkbox = object.label.querySelector("input");
            //
            checkbox.checked = false;
        }
    }
}
