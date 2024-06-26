import mongoose, { model, Schema, Model } from 'mongoose'

import { IDepartment } from '@/interfaces'

const departmentSchema = new Schema({
    title: { type: String, required: true},
    code: { type: String, required: true, unique: true },
}, {
    timestamps: true
})

const Department: Model<IDepartment> = mongoose.models.Department || model('Department', departmentSchema)

export default Department