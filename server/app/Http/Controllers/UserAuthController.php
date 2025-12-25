<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\User;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class UserAuthController extends Controller
{

    //User signin
    function signUp(Request $request)
    {



        try {

            $rules = [
                "full_name" => "required|min:2",
                "email" => "required|email:rfc,dns|unique:users,email",
                "password" => "required|min:8|max:14",
                "mobile_no" => "required|min:10",
            ];


            $validation = validator($request->all(), $rules);


            if ($validation->fails()) {
                return ApiResponse::error("fill blanks..", 400, $validation->errors());
            } else {


                $input = $request->all();

                $input["password"] = bcrypt($input["password"]);
                $user = User::create($input);

                if ($user) {
                    return ApiResponse::success(true, $user, "User registerd successfully..", 200);

                } else {
                    return ApiResponse::error($user, 400, null );
                }

            }
        } catch (\Throwable $th) {
            return ApiResponse::error("someting went wrong", 500, $th );
        }

    }

    // user login
    public function signIn(Request $request)
    {
        try {

            $credentials = $request->all('email', 'password');

            $rules = [
                "email" => "required|exists:users,email",
                "password" => "required|min:8|max:14",
            ];

            $validator = Validator::make($credentials, $rules);
            if ($validator->fails()) {
                return ApiResponse::error("Invalid crediantials", 401, $validator->errors());
            }

            $user = User::where('email', $credentials['email'])->first();

           
            if (!$user || !Hash::check($credentials['password'], $user->password)) {
                return ApiResponse::error("Invalid crediantials", 401, "Invalid password..");
            }


            $user->tokens()->delete();

            $tokenExpiration = now()->addDays(7);
            $tokenInstance = $user->createToken('auth-token', ['*'], $tokenExpiration);
            $token = $tokenInstance->plainTextToken;


            $cookie = cookie(
                'auth_token',
                $token,
                60 * 24 * 7,
                '/',
                null,
                config('session.secure'),
                true,
                false,
                'Lax'
            );


            $data = [

                "username" => $user->full_name,
                "email" => $user->email,
                "mobile_no" => $user->mobile_no,
                "role" => $user->role
            ];

            return ApiResponse::success(true, $data, "Login successful.", 200)
                ->withCookie($cookie);

        } catch (\Throwable $th) {

            report($th);

            return response()->json([
                'success' => false,
                'message' => 'An internal server error occurred.'
            ], 500);
        }
    }


    //Logout

    public function logout(Request $request)
    {
        $user = $request->user();
        if ($user) {
            $user->tokens()->delete(); // revoke token
        }
        $cookie = cookie()->forget('auth_token');

        return response()->json(['success' => true, 'message' => 'Logged out successfully'])->withCookie($cookie);
    }

    // Get user

    public function checkAuth(Request $request)
    {
        try {
            $user = $request->user();

            if ($user) {
                return response()->json([
                    'success' => true,
                    'isLoggedin' => true,
                    'message' => 'User is logged in',
                    'data' => [
                        'id' => $user->id,
                        'username' => $user->full_name,
                        'email' => $user->email,
                        'mobile' => $user->mobile_no,
                        'role' => $user->role
                    ]
                ], 200);
            }

            return response()->json([
                'success' => false,
                'isLoggedin' => false,
                'message' => 'User is not logged in',
            ], 401);

        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

}
