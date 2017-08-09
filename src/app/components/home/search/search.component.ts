/**
 * Created by Samir Elkhatib on 7/7/2017.
 *
 * Main site component
 */

import {Component} from "@angular/core";
import {courseRepository} from "../../../services/courses.repository";
import {Course} from "../../../models/course.model";
import {slotsRepository} from "../../../services/slots.repository";
import {Slot} from "../../../models/slot.model";

@Component({
    selector: "search-bar",
    templateUrl: "./search.component.html"
})

export class SearchComponent {

    // uses the global slots and courses repositories
    constructor(public slotsRepository: slotsRepository, public CourseRepository: courseRepository) {
    }

    // All functions exported to component.html are put here to create data bindings

    /// Return all courses
    allCourses(): Course[]{
        return this.CourseRepository.Courses;
    }
    // Return number of courses
    courseCount(): number{
        if(this.CourseRepository.Courses === undefined) return 0;
        else return (this.CourseRepository.Courses.length);
    }

    // Return specific course according to searched name from the courses list
    searchCourses(search: string): Course[] {
        let courses: Course[] = [];
        let list: Course[] = this.CourseRepository.Courses;
        for (let c in list) {
            if (list[c].name.includes(search))
                courses.push(list[c]);
        }
        return courses;
    }

    // Selecting and un-selecting courses
    // This adds or removes the course slots from the Slot repository
    selectCourse(course: Course) {
        if (this.selectedCourses.includes(course)) {
            this.slotsRepository.removeSlots(course.crn);
            this.selectedCourses.splice(this.selectedCourses.indexOf(course), 1);
        } else {
            for (let i = 0; i < course.time.length; i++) {
                let time = course.time[i];
                this.slotsRepository.addSlot(new Slot(time[0], time[1], time[2], "green", course.crn, course.name));
            }
            this.selectedCourses.push(course);
        }
    }

    // triggers the hover functionality in the slots repository
    hover(course: Course){
        // storing "this" in a variable to be able to use inside forEach
        let self = this;
        // iterating over all the courses
        self.selectedCourses.forEach(function(c) {
            // if the course is the same we are hovering on, mark it selected
            // this occurs only once
            if(course == c){
                self.slotsRepository.hoverSlots(c.crn, false);
            }
            // check if course overlaps, mark it
            else if(self.courseOverlap(course, c)){
                self.slotsRepository.hoverSlots(c.crn, true);
            }
        });
    }

    // Checks if two courses overlap
    // The check is done over the course times and NOT over the slots in order to assure synchronization between
    // all slots that belong to the same course

    private courseOverlap(course1: Course, course2: Course): boolean{
        let times1 = course1.time; let times2 = course2.time; let result = false;
        // double loop to iterate through all the slots on both courses
        times1.forEach(function(time1){
            times2.forEach(function (time2) {
                if (time1[0]==time2[0]){
                    if(!(time1[2] < time2[1] || time1[1]>time2[2])) result = true;
                }
            });
        });
        return result;
    }

    // Triggers te clear in slots repository
    leaveHover(){
        this.slotsRepository.clearHover();
    }

    searchTerm: string = "";
    selectedCourses: Course[] = [];     // array of selected courses
    lastPressed: number = 0;
}
