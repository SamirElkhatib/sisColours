/**
 * Created by Samir Elkhatib on 7/13/2017.
 */

export class Slot {
    public isSelected: boolean = false;
    public isOverlapped: boolean = false;

    constructor(public column: number,
                public start: number,
                public end: number,
                public colour: string = "green",
                public crn?: number,
                public name?: string) {
    }
}
