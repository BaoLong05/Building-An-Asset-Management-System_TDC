<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;

class PasswordController extends Controller
{
    public function senndResetLink(Request $request)
    {
        $request->validate(
            [
                'email' => 'required|email|max:255'
            ],
            [
                'email.required' => 'email không được để trống!',
                'email.email' => 'email phải đúng định dạng!',
                'email.max' => 'email không được dài hơn 255 ký tự!',
            ]
        );
        $status = Password::sendResetLink(
            $request->only('email')
        );
        return response()->json([
            'success' => true,
            'message' => 'Đã gửi vào email, vui lòng kiểm tra email của bạn!'
        ]);
    }

    public function ResetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|max:255',
            'token' => 'required',
            'password' => 'required|min:6'
        ], [
            'email.required' => 'email không được để trống!',
            'email.email' => 'email phải đúng định dạng!',
            'email.max' => 'email không được dài hơn 255 ký tự!',
            'token.required' => 'Token không được rỗng!',

            'password.required' => 'Mật khẩu không được để trống!',
            'password.min' => 'Mật khẩu không được nhỏ hơn 6 ký tự'
        ]);

        $status = Password::reset(
            $request->only('email', 'token', 'password'),
            function ($user, $password) {
                $user->update([
                    'password' => Hash::mkae($password)
                ]);
            }
        );
        return response()->json([
            'success' => true,
            'message' => 'Đổi mật khẩu thành công!'
        ]);
    }
}
