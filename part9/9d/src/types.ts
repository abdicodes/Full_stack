export interface HeaderComponent {
  title: string
}
export interface PartsComponent {
  name: string
  exerciseCount: number
}
export type TotalCount = {
  total: number
}

interface CoursePartBase {
  name: string
  exerciseCount: number
  type: string
}
interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject'
  groupProjectCount: number
}
interface CourseWithDescription extends CoursePartBase {
  description: string
}

interface CourseNormalPart extends CourseWithDescription {
  type: 'normal'
}

interface CourseSubmissionPart extends CourseWithDescription {
  type: 'submission'
  exerciseSubmissionLink: string
}
interface CourseSpecialPart extends CourseWithDescription {
  type: 'special'
  requirements: string[]
}
export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart
