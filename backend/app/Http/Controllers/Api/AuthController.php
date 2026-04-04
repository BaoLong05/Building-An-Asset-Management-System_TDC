<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use App\Models\User;


class AuthController extends Controller
{
    public function getUser()
    {
        /** @var User $user **/ 
        $user = Auth::user();
        if (!$user) {

            return response()->json([
                'success' => false,
                'message' => 'Tải thông tin thất bại!'
            ], 401);
        }
        return response()->json([
            'success' => true,
            'message' => 'Tải thông tin cá nhân thành công!',
            'data' => $user,
        ]);
    }
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email|max:255',
            'password' => 'required|min:6'
        ], [
            'email.required' => 'email không được để trống!',
            'email.email' => 'email phải đúng định dạng!',
            'email.max' => 'email không được dài hơn 255 ký tự!',

            'password.required' => 'Mật khẩu không được để trống!',
            'password.min' => 'Mật khẩu không được nhỏ hơn 6 ký tự'

        ]);
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'success' => false,
                'message' => 'Tài khoản hoặc mật khẩu không đúng!'
            ], 401);
        }

        //ép kiểu user để dùng modal
        /** @var User $user */
        $user = Auth::user();
        if (!$user->status) {
            return response()->json([
                'success' => false,
                'message' => 'Tài khoản đã bị khóa!'
            ], 403);
        }
        //xoa token cu
        $user->tokens()->delete();
        $token = $user->createToken(
            'auth_token',
            ['*'],
            now()->addHours(2)
        )->plainTextToken;
        $user->update([
            'last_activity_at' => now()
        ]);
        if (!$user) {
            return response()->json([
                "success" => false,
                "message" => "Tài khoản hoặc mật khẩu không chính xác!"
            ]);
        }

        return response()->json([
            'success' => true,
            'token' => $token,
            'user' => $user
        ]);
    }

    //logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'success' => true,
            'messgae' => 'Đăng xuất thành công!'
        ]);
    }

}
