export abstract class CEntity {
    public id: number;    
    
    public build (o: Object): any {
        for (let field in o) {
            this[field] = o[field];
        }
        
        return this;
    }

    protected twoDigits(n: number): string {
        return (n < 10) ? `0${n}` : `${n}`;
    }

    public formattedDate(field: string, withTime: boolean = false): string {
        const date = this[field] instanceof Date ? this[field] : new Date(this[field]);

        if (date) {
            const time = withTime ? ` ${this.twoDigits(date.getHours())}:${this.twoDigits(date.getMinutes())}` : '';
            return `${this.twoDigits(date.getDate())}.${this.twoDigits(date.getMonth()+1)}.${date.getFullYear()}${time}`;
        }
        
        return "";
    }
}
