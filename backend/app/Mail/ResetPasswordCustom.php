<?php

namespace App\Mail;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordCustom extends Notification
{
    public $token;
    public function __construct($token)
    {
        $this->token = $token;
    }
    public function via($notifiable)
    {
        return ['mail'];
    }
    public function toMail($notifiable)
    {
        $url = config('app.frontend_url')
            . '/reset-password?token=' . $this->token
            . '&email=' . urlencode($notifiable->email);

        return (new MailMessage)
            ->subject('Đặt lại mật khẩu')
            ->greeting('Xin chào!')
            ->line('Bạn đã yêu cầu đặt lại mật khẩu.')
            ->action('Đặt lại mật khẩu', $url)
            ->line('Đây là email tự động. Vui lòng không trả lời email này!');
    }
}
