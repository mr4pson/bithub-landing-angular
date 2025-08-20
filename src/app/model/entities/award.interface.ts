import { IMultilangable } from "../multilangable.interface";

export interface IAward {
    readonly id: number;
    readonly name: IMultilangable;
    readonly img: string;
    readonly investments: number;
    readonly earnings: number;
    readonly month: number;
    readonly year: number;
}
