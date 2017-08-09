/**
 * Created by Samir Elkhatib on 7/27/2017.
 *
 * Model of recitations
 */

export class Recitation{
    constructor(public days?: string,
                public hours?: string,
                public instructor?: string,
                public location?: string,
                public date?: string){
    }
}
