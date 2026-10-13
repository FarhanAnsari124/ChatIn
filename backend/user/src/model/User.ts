import mongoose, { Document, Schema } from "mongoose";

export interface Iuser extends Document {
	name: string;
	email: string;
}
const userSchema: Schema<Iuser> = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{
		timestamps: true,
	},
);

export const User = mongoose.model<Iuser>("User", userSchema);
