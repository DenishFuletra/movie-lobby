import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
            required: true
        },
        streaming_link: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
