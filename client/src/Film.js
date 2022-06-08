import dayjs from 'dayjs'

class Film {
    constructor(id, title, watch_date, rating) {
        this.id = id;
        this.title = title;
        this.watchDate = dayjs(watch_date);
        this.Rating = rating;
        this.user = 1;
    }
}

export default Film;