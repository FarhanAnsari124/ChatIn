import mongoose, { Document } from "mongoose";
export interface Iuser extends Document {
    name: string;
    email: string;
}
export declare const User: mongoose.Model<Iuser, {}, {}, {}, Document<unknown, {}, Iuser, {}, mongoose.DefaultSchemaOptions> & Iuser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, Iuser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>;
//# sourceMappingURL=User.d.ts.map