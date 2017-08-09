/**
 * Created by Samir Elkhatib on 7/13/2017.
 *
 * Repository for the displayed slots array.
 * Accessing the slots can be done form here
 */
import {Injectable} from "@angular/core";
import {Slot} from "../models/slot.model";

// Injectable allows global initialization
@Injectable()
export class slotsRepository {
    Slots: Slot[];
// functionality: initializing the global array of displayed slots
    constructor() {
        this.Slots = new Array<Slot>();
    }

    // Add a Slot to the array
    addSlot(slot: Slot) {
        this.Slots.push(slot);
    }

    // Remove all the slots of the specific crn from the array
    removeSlots(crn: number){
        this.Slots = this.Slots.filter(function(slot){return slot.crn != crn;});
    }

    // TODO: Find a better place to trigger the hover. The repository should not include such functionality
    // Given a crn change the Slot.isOverlapped and Slot.isSelected booleans according to the given crn
    // This reflects whether or not the given Slot corresponds to the selected crn...
    hoverSlots(crn: number, overlap: boolean){
        if(overlap){
            this.Slots.filter(function (slots) {return slots.crn == crn}).forEach(function(slot){slot.isOverlapped = true;});
        }else{
            this.Slots.filter(function (slots) {return slots.crn == crn}).forEach(function(slot){slot.isSelected = true;});
        }
    }

    // Clears the hover colours
    clearHover(){
        this.Slots.forEach(function (s) {s.isSelected = false; s.isOverlapped = false;})
    }
}
