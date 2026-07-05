<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\TaiSan;
use App\Models\Phong;
use App\Models\DanhMuc;
use App\Models\BaoTri;

class ChatBotAiController extends Controller
{
    public function chat(Request $request)
    {
        $message = $request->input('message');
        $messageLower = mb_strtolower($message);

        $intent = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
            'Content-Type'  => 'application/json',
        ])->post('https://api.openai.com/v1/responses', [
            'model' => 'gpt-4.1-mini',
            'input' => [
                [
                    'role' => 'system',
                    'content' => [
                        [
                            'type' => 'input_text',
                            'text' => 'Bạn là bộ phân tích ý định.

BẮT BUỘC:
- Chỉ trả về JSON hợp lệ
- Không giải thích
- Không thêm chữ

Format:
{"action":"count","table":"taisan"}

QUY TẮC:
- tài sản / thiết bị → taisan
- phòng / vị trí / location → phong
- danh mục → danhmuc
- bảo trì → baotri (chỉ dùng khi hỏi về phiếu/công việc bảo trì)

QUAN TRỌNG:
- "tài sản đang bảo trì" / "tài sản bảo trì" → taisan (KHÔNG phải baotri)
- "phiếu bảo trì" / "công việc bảo trì" → baotri

- "có bao nhiêu" → count
- "danh sách" → list
- "chi tiết" → detail

Không hiểu → {"action":"unknown","table":"none"}'
                        ]
                    ]
                ],
                [
                    'role' => 'user',
                    'content' => [
                        [
                            'type' => 'input_text',
                            'text' => $message
                        ]
                    ]
                ]
            ]
        ]);

        $responseData = $intent->json();

        $raw = $responseData['output'][0]['content'][0]['text']
            ?? $responseData['output_text']
            ?? '{"action":"unknown","table":"none"}';

        $json = json_decode($raw, true);

        $action = $json['action'] ?? 'unknown';
        $table  = $json['table'] ?? 'none';

        if (str_contains($messageLower, 'vị trí') || str_contains($messageLower, 'location')) {
            $table = 'phong';
        }

        if ($action === 'unknown') {
            if (str_contains($messageLower, 'bao nhiêu')) {
                $action = 'count';
            } elseif (str_contains($messageLower, 'danh sách')) {
                $action = 'list';
            }
        }

        // Nếu hỏi về "tài sản bảo trì" nhưng GPT trả về baotri → sửa thành taisan + filter
        $baotriFilter = null;
        if ($table === 'baotri' && ($action === 'count' || $action === 'list')) {
            $mentionsTaiSan = str_contains($messageLower, 'tài sản') || str_contains($messageLower, 'thiết bị');
            $mentionsBaoTriStatus = str_contains($messageLower, 'đang bảo trì') || str_contains($messageLower, 'bảo trì');
            if ($mentionsTaiSan && $mentionsBaoTriStatus) {
                $table = 'taisan';
                $baotriFilter = 'Đang bảo trì';
            }
        }

        $data = [];

        if ($action === 'unknown' || $table === 'none') {
            return response()->json([
                "reply" => "Xin Chào, tôi là Chatbot của hệ thống. Vui lòng hãy hỏi tôi những nội dung liên quan đến hệ thống nhé!.",
                "debug" => [
                    "raw_ai" => $raw
                ]
            ]);
        }

        switch ($table) {

            case 'taisan':

                if ($action === 'count') {
                    if ($baotriFilter) {
                        $data = [
                            'total' => TaiSan::where('TinhTrang', $baotriFilter)->count(),
                        ];
                    } else {
                        $data = [
                            'total' => TaiSan::count(),
                            'theo_tinh_trang' => [
                                'tot' => TaiSan::where('TinhTrang', 'Tốt')->count(),
                                'hong' => TaiSan::where('TinhTrang', 'Hỏng')->count(),
                                'bao_tri' => TaiSan::where('TinhTrang', 'Đang bảo trì')->count(),
                            ]
                        ];
                    }
                }

                if ($action === 'list') {
                    $query = TaiSan::with(['phong', 'danhmuc']);
                    if ($baotriFilter) {
                        $query->where('TinhTrang', $baotriFilter);
                    }
                    $data = $query->limit(10)->get();
                }

                break;

            case 'phong':

                if ($action === 'count') {
                    $data = ['total' => Phong::count()];
                }

                if ($action === 'list') {
                    $data = Phong::limit(10)->get();
                }

                break;

            case 'danhmuc':

                if ($action === 'count') {
                    $data = ['total' => DanhMuc::count()];
                }

                if ($action === 'list') {
                    $data = DanhMuc::limit(10)->get();
                }

                break;

            case 'baotri':

                if ($action === 'count') {
                    $data = [
                        'total' => BaoTri::count(),
                        'dang'  => BaoTri::where('TinhTrang', 'Đang bảo trì')->count(),
                        'hoan_thanh' => BaoTri::where('TinhTrang', 'Hoàn thành')->count(),
                    ];
                }

                if ($action === 'list') {
                    $data = BaoTri::with('taisan')->limit(10)->get();
                }

                break;
        }


        $final = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
            'Content-Type'  => 'application/json',
        ])->post('https://api.openai.com/v1/responses', [
            'model' => 'gpt-4.1-mini',
            'input' => [
                [
                    'role' => 'system',
                    'content' => [
                        [
                            'type' => 'input_text',
                            'text' => "Bạn là trợ lý quản lý tài sản.

Chỉ dùng dữ liệu sau:
" . json_encode($data, JSON_UNESCAPED_UNICODE) . "

Trả lời ngắn gọn, rõ ràng."
                        ]
                    ]
                ],
                [
                    'role' => 'user',
                    'content' => [
                        [
                            'type' => 'input_text',
                            'text' => $message
                        ]
                    ]
                ]
            ]
        ]);

        $finalData = $final->json();

        $reply = $finalData['output'][0]['content'][0]['text']
            ?? $finalData['output_text']
            ?? "Không có dữ liệu";

        return response()->json([
            "reply" => $reply,
            "debug" => [
                "action" => $action,
                "table" => $table,
                "data" => $data
            ]
        ]);
    }
}
