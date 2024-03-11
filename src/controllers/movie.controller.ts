import { httpStatus, getErrorResponse, getResponse } from '../utility/response';
import { ResponseMessages } from '../utility/response.message';
import { MovieModel } from '../utility/models/index.model';
import Movie from '../schema/movie.schema';
import mongoose from 'mongoose';

export default class MovieController {
    getAllMovies = async (): Promise<any> => {
        try {
            const movies = await Movie.find();
            const count = await Movie.countDocuments();
            if (count > 0) {
                const updatedResponse = {
                    movies_list: movies,
                    total_records: count
                };
                return getResponse(httpStatus.OK, updatedResponse, ResponseMessages.Movie_List_Found);
            } else return getResponse(httpStatus.BAD_REQUEST, false, ResponseMessages.Movie_List_Not_Found);
        } catch (error: any) {
            console.log(error.message);
            return getErrorResponse(httpStatus.INTERNAL_SERVER_ERROR, ResponseMessages.ServerError);
        }
    };

    searchMovies = async (search: string): Promise<any> => {
        try {
            const movie = await Movie.find({
                $or: [{ title: { $regex: search, $options: 'i' } }, { genre: { $regex: search, $options: 'i' } }]
            });
            const count = await Movie.countDocuments({
                $or: [{ title: { $regex: search, $options: 'i' } }, { genre: { $regex: search, $options: 'i' } }]
            });
            if (count > 0) {
                const updatedResponse = {
                    movies_list: movie,
                    total_records: count
                };
                return getResponse(httpStatus.OK, updatedResponse, ResponseMessages.Movie_List_Found);
            } else {
                return getResponse(httpStatus.BAD_REQUEST, false, ResponseMessages.Movie_List_Not_Found);
            }
        } catch (error: any) {
            console.log(error.message);
            return getErrorResponse(httpStatus.INTERNAL_SERVER_ERROR, ResponseMessages.ServerError);
        }
    };

    addMovie = async (data: MovieModel): Promise<any> => {
        try {
            const response = await Movie.create(data); // created a new movie
            if (response) {
                return getResponse(httpStatus.OK, response, ResponseMessages.Movie_Added);
            } else {
                return getResponse(httpStatus.BAD_REQUEST, false, ResponseMessages.Movie_Not_Added);
            }
        } catch (error: any) {
            console.log(error.message);
            return getErrorResponse(httpStatus.INTERNAL_SERVER_ERROR, ResponseMessages.ServerError);
        }
    };

    updateMovie = async (data: MovieModel): Promise<any> => {
        try {
            if (!mongoose.isValidObjectId(data._id)) {
                // check if id is valid or not
                return getResponse(httpStatus.NOT_FOUND, null, ResponseMessages.Invalid_id);
            }
            const movie = await Movie.findById(data._id);
            if (!movie) {
                return getResponse(httpStatus.NOT_FOUND, null, ResponseMessages.Movie_Not_Found);
            }

            const updatedMovie = await Movie.findByIdAndUpdate(data._id, data, { new: true }); // update the movie by id
            if (updatedMovie) {
                return getResponse(httpStatus.OK, updatedMovie, ResponseMessages.Movie_Updated);
            } else {
                return getResponse(httpStatus.BAD_REQUEST, false, ResponseMessages.Movie_Not_Updated);
            }
        } catch (error: any) {
            console.log(error.message);
            return getErrorResponse(httpStatus.INTERNAL_SERVER_ERROR, ResponseMessages.ServerError);
        }
    };

    deleteMovie = async (id: string): Promise<any> => {
        try {
            if (!mongoose.isValidObjectId(id)) {
                return getResponse(httpStatus.NOT_FOUND, null, ResponseMessages.Invalid_id);
            }
            const movie = await Movie.findById(id); // find the movie by id
            console.log('movie', movie);
            if (!movie) {
                return getResponse(httpStatus.NOT_FOUND, null, ResponseMessages.Movie_Not_Found);
            }
            const deletedMovie = await Movie.findByIdAndDelete(id); // delete the movie by id
            if (deletedMovie) {
                return getResponse(httpStatus.OK, true, ResponseMessages.Movie_Deleted);
            } else {
                return getResponse(httpStatus.BAD_REQUEST, false, ResponseMessages.Movie_Not_Deleted);
            }
        } catch (error: any) {
            console.log(error.message);
            return getErrorResponse(httpStatus.INTERNAL_SERVER_ERROR, ResponseMessages.ServerError);
        }
    };
}
