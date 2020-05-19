class Vote{
    constructor(id,date){
        this.id=id;
        this.date=date;
        Object.seal(this);
    }
}