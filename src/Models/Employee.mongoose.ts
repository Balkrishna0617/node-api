import mongoose, {  Schema } from 'mongoose';
import { IEmployee } from './IEmployee';

export const EmployeeSchema = new Schema({
    Id: { type: String, required: true },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true }
});


export const EmployeeModel = mongoose.model<IEmployee>('EmployeeModel', EmployeeSchema);
export { IEmployee } from './IEmployee';