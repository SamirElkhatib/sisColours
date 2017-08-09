/**
 * Created by Samir Elkhatib on 7/7/2017.
 * Repository manages access to data source
 */
import {Injectable} from "@angular/core"
import {Course} from "../models/course.model";
import {dataSource} from "./data.source";

@Injectable()
export class courseRepository {
    private courses: Course[];
    private locator = (c: Course, crn: number) => c.crn == crn; // boolean returns true if course crn == given crn
// functionality: making the datasource of courses accessible
    constructor(private dataSource: dataSource) {
        dataSource.getCourses().subscribe(data => {
            this.courses = data;
        });
    }

    get Courses(): Course[] {
        return this.courses;
    }

    getCourse(crn: number): Course {
        return this.courses.find(c => this.locator(c, crn));
    }

}
