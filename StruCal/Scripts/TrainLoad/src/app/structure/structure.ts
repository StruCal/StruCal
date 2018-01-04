import { Section } from "./section";
import { Additional } from "./additional";


export interface Structure{
     Section : Section;
     Spans: Array<number>;
     Additionals? : Array<Additional>
}