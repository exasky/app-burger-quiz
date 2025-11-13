/**
 * Entity for storing a transition
 * @param filename the transition file name
 * @param label the transition label
 * @param order the display order
 */
class Transition {
    public filename: string;
    public order: number;
    public label: string;

    constructor(filename: string, label: string, order: number) {
        this.filename = filename;
        this.order = order;
        this.label = label;
    }
}

export = Transition;
