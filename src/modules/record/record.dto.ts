import { ECLASS } from "../students/student.dto"

export interface IRecord {
    studentId: number
    course_title: string
    score: number
    class: ECLASS
}