import { httpStatus, getErrorResponse, getResponse } from '../utility/response';
import { checkPassword, generateToken, generateRefreshToken } from '../utility/common';
import { ResponseMessages } from '../utility/response.message';
import { UserModel } from '../utility/models/index.model';
import User from '../schema/user.schema';

export default class UserController {
    login = async (user: UserModel): Promise<any> => {
        try {
            const existUser = await User.findOne({ email: user.email });
            if (!existUser) {
                return getResponse(httpStatus.NOT_FOUND, null, ResponseMessages.Users_Not_Found);
            }
            if (checkPassword(user.password, existUser.salt, existUser.password)) {
                const tokenObj = {
                    id: existUser._id,
                    email: existUser.email,
                    name: existUser.name
                };
                const tokenResponse: any = {
                    token: generateToken(tokenObj),
                    refresh_token: generateRefreshToken(tokenObj.id),
                    user: tokenObj
                };
                return getResponse(httpStatus.OK, tokenResponse, ResponseMessages.Login_Success);
            } else {
                return getResponse(httpStatus.EXPECTATION_FAILED, null, ResponseMessages.Invalid_Credentials);
            }
        } catch (error) {
            console.error('Error during user login:', error);
            return getErrorResponse(httpStatus.INTERNAL_SERVER_ERROR, ResponseMessages.ServerError);
        }
    };

    // createUser = async (user: user): Promise<any> => {
    //     const { email, password, name, salt } = user;
    //     try {
    //         const existUser = await User.create(user);
    //         console.log(existUser);
    //         return existUser;
    //     } catch (error) {
    //         console.error('Error during user login:', error);
    //         throw error;
    //     }
    // };
}
