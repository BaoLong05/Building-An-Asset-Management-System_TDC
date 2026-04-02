<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Validation\Rules\Email;

class PasswordController extends Controller
{
    public function sendResetLink(Request $request)
    {
        $request->validate(
            [
                'email' => [
                    'required',
                    'string',
                    'max:255',
                    'regex:/^\S+@\S+\.\S+$/',
                ]
            ],
            [
                'email.required' => 'Email không được để trống!',
                'email.regex' => 'Email không đúng định dạng!',
                'email.max' => 'Email không được dài hơn 255 ký tự!',
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
        $request->merge([
            'email' => trim($request->email),
            'password' => trim($request->password),
        ]);

        $request->validate([
            'email' => [
                'required',
                'string',
                'max:255',
                new Email,
                'regex:/^\S+@\S+\.\S+$/'
            ],
            'password' => [
                'required',
                'string',
                'min:6',

                Password::min(6)
                    ->letters()
                    ->numbers()
                    ->mixedCase()
                    ->symbols()
            ],
        ], [
            'email.required' => 'Email không được để trống!',
            'email.string' => 'Email không hợp lệ!',
            'email.max' => 'Email không được dài hơn 255 ký tự!',
            'email.regex' => 'Email không được chứa khoảng trắng!',

            'password.required' => 'Mật khẩu không được để trống!',
            'password.string' => 'Mật khẩu không hợp lệ!',
            'password.min' => 'Mật khẩu phải có ít nhất 6 ký tự!',
        ]);

        $status = Password::reset(
            $request->only('email', 'password'),
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
            'message' => "Đổi mật khẩu không thành công!"
        ], 400);
    }
}
