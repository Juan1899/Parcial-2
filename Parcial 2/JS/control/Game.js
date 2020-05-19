class Game{
    constructor(id,name,studio,year){
        this.id=id;
        this.name=name;
        this.studio=studio;
        this.year=year;
        Object.seal(this);
    }
}