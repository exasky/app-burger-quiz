/**
 * Team entity
 */
class Team {
    public points: number = 0;
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    /**
     * Increments the team's points
     */
    public incrementPoints(): void {
        if (this.points >= 25) return;
        this.points++;
    }

    /**
     * Decrements the team's points
     */
    public decrementPoints(): void {
        if (this.points <= 0) return;
        this.points--;
    }
}

export = Team;
