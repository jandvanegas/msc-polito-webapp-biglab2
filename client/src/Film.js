import dayjs from 'dayjs'

class Film {
    constructor(id, title, watch_date, rating, favorite) {
        this.id = id;
        this.title = title;
        this.watchDate = dayjs(watch_date);
        this.rating = rating;
        this.favorite = favorite
        this.user = 1;
    }
}

export default Film;
