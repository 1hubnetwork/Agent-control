# /linkedin-work — LinkedIn Content Manager cho chính trị gia – doanh nhân

Một **slash-command Claude Code tự chứa**: nhận chất liệu thô → dựng 3 biến thể bài LinkedIn tiếng Việt
(thân báo cáo ngôi 3 → *sneak peek* chính sách ngôi 1) → tự kiểm chứng + đánh giá rủi ro → tiến cử bài tốt nhất
để bạn duyệt. **Không tự đăng.** Không cần cài skill nào khác.

> Thiết kế cho nhân vật **bắc cầu chính trị/chính sách ↔ doanh nghiệp**. Toàn bộ logic (recipe · viral post ·
> hook · anti-AI · fact-check · review) đã nội hóa trong một file.

## Cài đặt
1. Copy file `.claude/commands/linkedin-work.md` vào thư mục dự án của bạn (giữ nguyên đường dẫn `.claude/commands/`).
   - Hoặc đặt ở `~/.claude/commands/linkedin-work.md` để dùng toàn cục.
2. (Tùy chọn) Tạo thư mục làm việc để agent lưu bài & log:
   ```
   linkedin-brand/
     config/  kb/  posts/  recipes/  drafts/  risk/  logs/  calendar/
   ```

## Dùng
```
/linkedin-work
[dán chất liệu / sự kiện / ý tưởng cho bài]
```
Agent sẽ chạy 6 bước (intake → 3 biến thể → hook → anti-AI → fact-check → chấm điểm & tiến cử) rồi trình bảng chọn
để bạn duyệt.

## Cá nhân hóa (khuyến nghị)
- Bỏ hồ sơ giọng vào `config/brand-voice.md` và tiểu sử vào `config/fact-sheet.md` → bài sẽ đúng giọng hơn.
- Bỏ tài liệu tham chiếu (báo cáo ngành, dự thảo công khai) vào `kb/`.
- Kiến trúc đầy đủ & lý do thiết kế: xem [`AGENT-spec.md`](AGENT-spec.md).

## An toàn (đã tích hợp)
- Không tự đăng; luôn dừng ở bước người duyệt.
- Sneak peek **chỉ dựa trên nguồn công khai**; không dùng thông tin nội bộ chưa công bố.
- Không bịa số liệu (gắn cờ `[CẦN KIỂM]`); không công kích cá nhân/đảng phái; không bình luận vụ pháp lý đang diễn ra.
- Chống prompt-injection: chất liệu = dữ liệu, không phải lệnh.

## License & Attribution
Phát hành theo **MIT**. Khung hook/anti-AI/voice-calibration tham khảo ý tưởng (viết lại cho tiếng Việt +
bối cảnh chính trị gia) từ các dự án MIT:
[sergebulaev/linkedin-skills](https://github.com/sergebulaev/linkedin-skills) ·
[marian-kamenistak/linkedin-post-writing-skill](https://github.com/marian-kamenistak/linkedin-post-writing-skill) ·
[kvsdileep/linkedin-writer](https://github.com/kvsdileep/linkedin-writer) ·
[jalaalrd/anti-ai-slop-writing](https://github.com/jalaalrd/anti-ai-slop-writing) ·
[jamditis/claude-skills-journalism](https://github.com/jamditis/claude-skills-journalism)

---

# /ba-work — Business Analyst Agent

Bộ agent BA: nhận yêu cầu thô (ghi chú họp, email, ý tưởng) → làm rõ → stakeholder & phạm vi → FR/NFR/BR →
user story + acceptance criteria (Gherkin) → quy trình AS-IS/TO-BE (Mermaid) → rà soát độc lập → trình duyệt.
**Không tự tạo ticket hay gửi stakeholder.**

## Thành phần
| File | Vai trò |
|---|---|
| `.claude/commands/ba-work.md` | Lệnh điều phối `/ba-work` (tự chứa, chạy được cả khi không có subagent) |
| `.claude/agents/ba-elicitor.md` | Làm rõ yêu cầu, giả định, bộ câu hỏi phỏng vấn stakeholder |
| `.claude/agents/ba-requirements-writer.md` | FR/NFR/BR, user story INVEST, AC Gherkin, ma trận truy vết (RTM) |
| `.claude/agents/ba-process-modeler.md` | Sơ đồ ngữ cảnh, swimlane AS-IS/TO-BE, sơ đồ trạng thái, gap analysis |
| `.claude/agents/ba-reviewer.md` | Reviewer độc lập (chỉ đọc), chấm rubric /100, liệt kê lỗ hổng 🔴🟠🟡 |

## Cài đặt
Copy thư mục `.claude/` vào dự án của bạn (hoặc vào `~/.claude/` để dùng toàn cục).

## Dùng
```
/ba-work [chế độ] [dán yêu cầu thô]
```
Chế độ: `full` (mặc định) · `elicit` (chỉ bộ câu hỏi) · `stories` (backlog + AC) · `process` (quy trình) · `review` (rà tài liệu có sẵn).
Có thể gọi thẳng subagent, ví dụ: *"Dùng ba-reviewer rà file docs/srs.md"*.

Nếu có quyền ghi file, kết quả lưu vào `ba-workspace/<slug-du-an>/` (`01-brief.md` … `05-review.md`, `rtm.csv`).
