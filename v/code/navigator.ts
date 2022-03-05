//
//Import the step class.
import {step} from "./step.js"
//
//Import app from the outlook library.
import * as outlook from "../../../outlook/kaniu/code/outlook.js";
//
//This acts as a navigator element within the application. 
//Helps the user move back and forth between 
//different steps.
export type response =
    {dir: "prev"}
    | {dir: "next"}
    | {dir: "goto", step: number}
    | {dir: "break", ok: boolean};
//
//Take the user forward/backward as s/he uses the application.
export class navigator extends outlook.baby<void> {
    //
    //Get the next & previous buttons.
    static next?: HTMLButtonElement;
    static prev?: HTMLButtonElement;
    static cancel?: HTMLButtonElement;
    //
    //Get the steps panel.
    public steps?: HTMLElement;
    //
    //Get the interactions panel.
    static interactions: HTMLElement;
    //
    //The collection of steps.
    static steps_array: Array<step> = [];
    //
    static current_app: step;
    //
    //Construct the navigator class.
    constructor(mother: outlook.view) {
        super(mother, 'step.html');
        //
        //Initialize the interaction panel.
        navigator.interactions = this.get_element('interactions');
        //
        //Initialize the steps array.
        navigator.steps_array = [
            new step('step_one', this), 
            new step('step_two', this), 
            new step('step_three', this), 
            new step('step_four', this), 
            new step('step_five', this), 
            new step('step_six', this), 
            new step('step_seven', this), 
            new step('step_eight', this)
        ];
    }
    //
    //Implement this abstract method.
    check(): boolean {return true}
    //
    //Implement this abstract method.
    async get_result(): Promise<void> {}
    //
    //Display the panels of the application.
    async show_panels(): Promise<void> {
        //
        //Associate the panels steps and buttons panels with their
        //respective elements.
        //
        //... the steps ...
        this.steps = <HTMLElement>this.get_element("steps");
        //
        //... the navigation buttons.
        navigator.next = <HTMLButtonElement>this.get_element("next");
        navigator.prev = <HTMLButtonElement>this.get_element("prev");
        navigator.cancel = <HTMLButtonElement>this.get_element("cancel");
        //
        //1. Update the steps panel.
        //
        //1.1 Construct the steps to paint.
        this.construct_step();
        //
        //Looping over all the steps.
        //
        //Set i to point to the first step.
        let i = 0;
        //
        //Loop through each step to help the user navigate back and forth.
        while (true) {
            //
            //Get the ith step.
            const step = navigator.steps_array[i];
            //
            //Inform the user when s/he tries to go past the last step.
            if (!(i >= 0 && i < navigator.steps_array.length)) {
                alert("You have reached the final step.");
                throw new Error(`'${i}' is out of range.`);
            }
            //
            //Show the current step the user is in.
            const Response: response = await step.execute(i, navigator.steps_array.length);
            //
            //Move to the step that is determined by the response.
            //
            switch (Response.dir) {
                //
                //Navigate the user backwards.
                case "prev": i--; break;
                //
                //Navigate the user forward.
                case "next": i++; break;
                //
                //Move the user to step i.
                case "goto": i = Response.step; break;
                //
                //Break out of the loop.
                case "break": break;
            }
            //
            //Get out of the loop if the user aborts the process or if 
            //we finish successfully.
            if (Response.dir === "break") break;
        }
        //
        //Process the collected data.
        //this.process(Response.ok);
        //
        this.close();
    }
    //
    //Construct the steps.
    construct_step() {
        //
        //Loop through all the steps and construct the step label.
        navigator.steps_array.forEach(step => {
            //
            //Construct the div element anchored to the steps panel.
            const div = this.create_element(this.steps!, "div", {});
            //
            //Construct the checkbox anchored to the div.
            this.create_element(div, "input", {type: "checkbox"})
            //
            //Construct the span anchored to the div.
            this.create_element(div, "span", {textContent: step.id});
            //
            //Associate the div element with the current step.
            step.label = div
        })        
    }
}