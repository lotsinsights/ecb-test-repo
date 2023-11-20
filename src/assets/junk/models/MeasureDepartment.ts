import { runInAction } from "mobx";
// import Model from "./Model";

// export const defaultMeasureDepartment: IMeasureDepartment = {
//   id: "",
//   uid: "",
//   userName: "",
//   objective: "",
//   department: "",
//   perspective: "",
//   description: "",
//   comments: "",
//   sourceOfEvidence: "",
//   statusUpdate: "",
//   activities: "",
//   baseline: null,
//   quarter1Target: null,
//   quarter2Target: null,
//   quarter3Target: null,
//   quarter4Target: null,
//   quarter1Actual: 0,
//   quarter2Actual: 0,
//   quarter3Actual: 0,
//   quarter4Actual: 0,
//   rating1: null,
//   rating2: null,
//   rating3: null,
//   rating4: null,
//   rating5: null,
//   annualTarget: null,
//   targetDate: "",
//   annualActual: 0,
//   rating: 1,
//   weight: 0,
//   dataType: "Currency",
//   dataSymbol: "NAD",
//   symbolPos: "prefix",
// };

// export interface IMeasureDepartment {
//   id: string;
//   uid: string;
//   userName: string;
//   objective: string;
//   department: string;
//   perspective: string; // Finacial, Customer, Operational, Learning & Growth,
//   description: string;
//   comments: string;
//   sourceOfEvidence: string;
//   statusUpdate: string;
//   activities: string;
//   quarter1Target: number | null;
//   quarter2Target: number | null;
//   quarter3Target: number | null;
//   quarter4Target: number | null;
//   quarter1Actual: number | null;
//   quarter2Actual: number | null;
//   quarter3Actual: number | null;
//   quarter4Actual: number | null;
//   baseline: number | null;
//   rating1: number | null; // required field
//   rating2: number | null; // required field
//   rating3: number | null; // required field
//   rating4: number | null;
//   rating5: number | null;
//   annualTarget: number | null;
//   annualActual: number | null;
//   targetDate: number | string;
//   rating: number;
//   weight: number; // percentage
//   dataType: string; // Number | Text | Date | Percentage | Currency | YesNo | Rating
//   dataSymbol: string; // Number | Text | Date | Percentage | Currency | YesNo | Rating
//   symbolPos: "prefix" | "suffix"; // prefix / suffix
//   isUpdated?: boolean;
// }

// export default class MeasureDepartment extends Model<IMeasureDepartment> {
//   update(): void {}

//   edit(): void {}

//   async remove() {
//     if (!window.confirm("Continue to delete?")) return;
//   }
// }
