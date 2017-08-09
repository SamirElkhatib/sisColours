/**
 * Created by Samir Elkhatib on 7/13/2017.
 *
 * Main component for the display table where all selected slots appear
 */

import {Component} from "@angular/core";
import {Slot} from "../../../models/slot.model";
import {slotsRepository} from "../../../services/slots.repository";

const HEIGHT: number = window.innerHeight;
const SLOT_MAX: number = 720;
const UPPER_MARGIN: number = 0.07;          // Upper Margin adjusts of area taken by the top bar which shows days
const LEFT_MARGIN: number = 0.05;           // Left Margin adjusts for the left bar showing hours

// TODO: Account for left and top margins to display days and hours
// TODO: Suggestion to display hours: use width % 30 => every half an hour....

@Component({
    selector: "schedule-table",
    templateUrl: "./schedule.component.html"
})
export class ScheduleComponent {
    height: number = HEIGHT;
    days: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    // uses the definition of the global slots repository
    constructor(public slotsRepository:slotsRepository){
    }

    // returns the appropriate CSS to specify shape of the Slot div
    drawSlot(slot:Slot){
        let marginTop: number = (slot.start/SLOT_MAX)*HEIGHT + UPPER_MARGIN*HEIGHT;                   // Get start from top
        let marginLeft: number = slot.column*20;// Get column
        let heightLength: number = ((slot.end-slot.start)/SLOT_MAX)*HEIGHT;                   // Get end height

        return {"height" : `${heightLength}px`, "margin-top" : `${marginTop}px`, "margin-left" : `${marginLeft}%`}
    }

    // changes colour of Slot according to hover situation
    getClass(slot:Slot): string{
        if(slot.isSelected){return "btn-success"}
        else if(slot.isOverlapped){return "btn-danger"}
        else return "btn-primary";
    }

    // returns the appropriate CSS for day slots
    drawDay(day){
        let marginLeft: number = day*20;
        return {"height": `${UPPER_MARGIN*HEIGHT}px`, "margin-top": "0px", "margin-left" : `${marginLeft}%`};
    }

}
