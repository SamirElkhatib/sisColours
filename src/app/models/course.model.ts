/**
 * Created by Samir Elkhatib on 7/11/2017.
 *
 * Basic Course structure and constructor
 *
 */

import {Recitation} from "./recitation.model";

export class Course {
    constructor(public crn?: number,
                public name?: string,
                public time?: number[][],       // Array of course time: [day, start, end]
                public cap?: number,            // Course Total Capacity
                public act?: number,            // Course Actual Registered
                public rem?: number,            // Course Remaining Places
                public instructor?: string,
                public location?: string,
                public attribute?: string,
                public sec?: number,            // Section
                public cmp?: string,            // Campus (Main or Bekaa...)
                public cred?: string,           // Number of credits represented as a string. TODO: convert to number?
                public title?: string,
                public date?: string,
                public days?: string,
                public hours?: string,
                public recitations: Recitation[] = []) {
    }
}
