import MovieController from '../src/controllers/movie.controller';
import { httpStatus } from '../src/utility/response';
import { ResponseMessages } from '../src/utility/response.message';
import { MovieModel } from '../src/utility/models/index.model';
import Movie from '../src/schema/movie.schema';

jest.mock('../src/schema/movie.schema');

describe('MovieController', () => {
    let movieController: MovieController;

    beforeEach(() => {
        movieController = new MovieController();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllMovies', () => {
        test('should return all movies when there are movies in the database', async () => {
            const mockMovies = [{ title: 'Movie 1', genre: 'Action' }, { title: 'Movie 2', genre: 'Comedy' }];
            const mockCount = 2;

            (Movie.find as jest.Mock).mockImplementation(() => Promise.resolve(mockMovies));
            (Movie.countDocuments as jest.Mock).mockImplementation(() => Promise.resolve(mockCount));

            const response = await movieController.getAllMovies();

            expect(response.status).toBe(httpStatus.OK);
            expect(response.message).toBe(ResponseMessages.Movie_List_Found);
            expect(response.data.movies_list).toEqual(mockMovies);
            expect(response.data.total_records).toBe(mockCount);
        });

        test('should return a message when no movies are found in the database', async () => {
            (Movie.countDocuments as jest.Mock).mockImplementation(() => Promise.resolve(0));

            const response = await movieController.getAllMovies();

            expect(response.status).toBe(httpStatus.BAD_REQUEST);
            expect(response.message).toBe(ResponseMessages.Movie_List_Not_Found);
        });

        test('should return an error response when an error occurs', async () => {
            const errorMessage = 'Internal server error';
            (Movie.find as jest.Mock).mockImplementation(() => Promise.reject(new Error(errorMessage)));

            const response = await movieController.getAllMovies();

            expect(response.status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
            expect(response.message).toBe(ResponseMessages.ServerError);
        });
    });



    describe('addMovie', () => {
        test('should add a new movie successfully', async () => {
            const mockMovie: MovieModel = {
                title: 'New Movie',
                genre: 'Drama',
                rating: 4.5,
                streaming_link: "https://example.com/the_godfather"
            };

            (Movie.create as jest.Mock).mockImplementation(() => Promise.resolve(mockMovie));

            const response = await movieController.addMovie(mockMovie);

            expect(response.status).toBe(httpStatus.OK);
            expect(response.message).toBe(ResponseMessages.Movie_Added);
            expect(response.data).toEqual(mockMovie);
        });
    });

    describe('updateMovie', () => {
        test('should update an existing movie successfully', async () => {
            const mockMovie: MovieModel = { _id: '65ee9f95f1ad06c4018709ea', title: 'Shaitan', genre: 'Action' };

            (Movie.findById as jest.Mock).mockImplementation(() => Promise.resolve(mockMovie));
            (Movie.findByIdAndUpdate as jest.Mock).mockImplementation(() => Promise.resolve(mockMovie));

            const response = await movieController.updateMovie(mockMovie);

            expect(response.status).toBe(httpStatus.OK);
            expect(response.message).toBe(ResponseMessages.Movie_Updated);
            expect(response.data).toEqual(mockMovie);
        });
    });

    describe('deleteMovie', () => {
        test('should delete an existing movie successfully', async () => {
            const mockId = '65ee9f95f1ad06c4018709ea';

            (Movie.findById as jest.Mock).mockImplementation(() => Promise.resolve(true));
            (Movie.findByIdAndDelete as jest.Mock).mockImplementation(() => Promise.resolve(true));

            const response = await movieController.deleteMovie(mockId);

            expect(response.status).toBe(httpStatus.OK);
            expect(response.message).toBe(ResponseMessages.Movie_Deleted);
            expect(response.data).toBe(true);
        });

    });

    describe('searchMovies', () => {
        test('should return matching movies when search term is provided', async () => {
            const searchQuery = 'action';
            const mockMovies = [{ title: 'Shaitan', genre: 'Action' }, { title: 'Dhoom', genre: 'Action' }];
            const mockCount = 2;

            (Movie.find as jest.Mock).mockImplementation(() => Promise.resolve(mockMovies));
            (Movie.countDocuments as jest.Mock).mockImplementation(() => Promise.resolve(mockCount));

            const response = await movieController.searchMovies(searchQuery);

            expect(response.status).toBe(httpStatus.OK);
            expect(response.message).toBe(ResponseMessages.Movie_List_Found);
            expect(response.data.movies_list).toEqual(mockMovies);
            expect(response.data.total_records).toBe(mockCount);
        });

    });
});
