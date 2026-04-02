<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class PasswordController extends Controller
{
    public function sendResetLink(Request $request)
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
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Email không tồn tại trong hệ thống!'
            ], 404);
        }
        $status = Password::sendResetLink(
            $request->only('email')
        );
        if ($status === Password::RESET_LINK_SENT) {
            return response()->json([
                'success' => true,
                'message' => "Đã gửi link reset mật khẩu vào email của bạn. Vui lòng kiểm tra email!"
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => "Gửi reset link email thất bại. Vui lòng kiểm tra lại email của bạn!"
        ], 400);
       
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
                    'password' => Hash::make($password)
                ]);
            }
        );
        if ($status === Password::PASSWORD_RESET) {
            return response()->json([
                'success' => true,
                'message' => 'Đổi mật khẩu thành công!'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => __($status)
        ], 400);
    }
}
