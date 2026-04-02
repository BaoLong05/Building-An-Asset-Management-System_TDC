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

    public function resetPassword(Request $request)
    {
        

        $request->validate([
            'email' => 'required|email|max:255',
            'token' => 'required',
            'password' => [
                'required',
                'min:6',
                'confirmed',
                \Illuminate\Validation\Rules\Password::min(6)
                    ->letters()
                    ->numbers()
                    ->mixedCase()
                    ->symbols()
            ],
        ], [

            'email.required' => 'Email không được để trống!',
            'email.email' => 'Email phải đúng định dạng!',
            'email.max' => 'Email không được dài quá 255 ký tự!',

            'token.required' => 'Token không hợp lệ hoặc đã hết hạn!',

            'password.required' => 'Mật khẩu không được để trống!',
            'password.min' => 'Mật khẩu phải có ít nhất 6 ký tự!',
            'password.confirmed' => 'Xác nhận mật khẩu không khớp!',

            'password.letters' => 'Mật khẩu phải chứa ít nhất 1 chữ cái!',
            'password.numbers' => 'Mật khẩu phải chứa ít nhất 1 số!',
            'password.mixed' => 'Mật khẩu phải bao gồm chữ hoa và chữ thường!',
            'password.symbols' => 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt!',
        ]);

        $status = Password::reset(
            $request->only('email', 'token', 'password', 'password_confirmation'),
            function ($user, $password) {
                $user->update([
                    'password' => Hash::make($password)
                ]);
                $user->save();
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
            'message' => match ($status) {
                Password::INVALID_TOKEN => 'Token không hợp lệ hoặc đã hết hạn!',
                Password::INVALID_USER => 'Email không tồn tại!',
                default => 'Đổi mật khẩu thất bại!'
            }
        ], 400);
    }
}
