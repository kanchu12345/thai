# -*- coding: utf-8 -*-
"""
tools/add_vietnamese_language.py
Adds Vietnamese (Tiếng Việt) language support across Lotus Ceylon platform:
1. js/site-translator.js
2. js/i18n.js
3. partials/header.html
4. partials/mobile-menu.html
5. admin/index.html
6. admin/js/page-editor.js
"""

import os
import re

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def update_site_translator():
    file_path = os.path.join(ROOT_DIR, 'js', 'site-translator.js')
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add to header comment if not present
    if 'vi (Vietnamese' not in content:
        content = content.replace(
            "* - 🇮🇳 hi (Hindi / हिन्दी)",
            "* - 🇮🇳 hi (Hindi / हिन्दी)\n * - 🇻🇳 vi (Vietnamese / Tiếng Việt)"
        )

    # Add to LANG_CONFIG
    if "'vi':" not in content:
        content = content.replace(
            "'hi': { label: 'HI', name: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' }",
            "'hi': { label: 'HI', name: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },\n    'vi': { label: 'VI', name: 'Tiếng Việt', flag: '🇻🇳', dir: 'ltr' }"
        )

    # Add to includedLanguages
    if 'hi,vi' not in content:
        content = content.replace(
            "includedLanguages: 'en,zh-TW,zh-CN,fr,de,ru,es,it,ja,ar,hi'",
            "includedLanguages: 'en,zh-TW,zh-CN,fr,de,ru,es,it,ja,ar,hi,vi'"
        )

    with open(file_path, 'w', encoding='utf-8', newline='') as f:
        f.write(content)
    print("[SUCCESS] Updated js/site-translator.js")


VI_TRANSLATIONS_BLOCK = '''  vi: {
    langName: "Tiếng Việt",
    dir: "ltr",
    tours: {
      "tour_comparator_dock": "Các gói đã chọn để so sánh",
      "tour_comparator_btn": "So sánh chi tiết",
      "tour_season_best": "Thời điểm lý tưởng nhất",
      "tour_season_peak": "Nắng vàng rực rỡ & Biển êm",
      "tour_season_good": "Thời tiết du lịch thuận lợi",
      "tour_season_monsoon": "Giao mùa nhiệt đới",
      "tour_why_lotus_title": "Tại sao du khách tinh hoa chọn chúng tôi",
      "tour_why_pillar_1_title": "100% Riêng tư & May đo theo yêu cầu",
      "tour_why_pillar_2_title": "Tài xế kiêm hướng dẫn viên chuyên nghiệp",
      "tour_why_pillar_3_title": "Khu nghỉ dưỡng & Villa boutique tuyển chọn",
      "tour_why_pillar_4_title": "Quản gia du lịch tận tâm 24/7",
      "tour_make_it_yours_badge": "THIẾT KẾ RIÊNG BIỆT",
      "tour_mobile_inquire": "Tùy chỉnh / Yêu cầu báo giá",
      "tour_mobile_wa": "Hỗ trợ qua WhatsApp"
    },
    nav: {
      home: "Trang chủ",
      tours: "Gói du lịch",
      about: "Về chúng tôi",
      whyUs: "Tại sao chọn chúng tôi",
      testimonials: "Đánh giá",
      contact: "Liên hệ",
      inquiry: "Yêu cầu tư vấn",
      quickInquiry: "Tư vấn nhanh"
    },
    hero: {
      badge: "Kỳ nghỉ may đo tại Sri Lanka",
      title: "Lên kế hoạch hành trình",
      slogan: "HÀNH TRÌNH THUẦN KHIẾT. TRẢI NGHIỆM THIÊNG LIÊNG."
    },
    form: {
      cardTitle: "Mẫu yêu cầu tư vấn du lịch",
      intro: "Lấy cảm hứng từ hoa sen – biểu tượng của sự thuần khiết, linh thiêng và kiên cường, hãy chia sẻ chuyến đi mơ ước và chúng tôi sẽ hiện thực hóa cho bạn.",
      switchQuickNotice: "Bạn bận rộn?",
      switchQuickLink: "Dùng mẫu tư vấn nhanh ➔",
      switchDetailedNotice: "Cần lịch trình chi tiết?",
      switchDetailedLink: "Dùng mẫu tư vấn chi tiết ➔",
      
      // Fields
      nameLabel: "Họ và tên",
      namePlaceholder: "ví dụ: Nguyễn Văn A",
      countryLabel: "Quốc gia cư trú",
      countryPlaceholder: "Tìm và chọn quốc gia của bạn...",
      emailLabel: "Địa chỉ Email",
      emailPlaceholder: "ten@example.com",
      whatsappLabel: "Số WhatsApp",
      whatsappPlaceholder: "91 234 5678",
      whatsappHint: "Nhập số WhatsApp đang hoạt động để nhận cập nhật lịch trình nhanh chóng.",
      arrivalLabel: "Ngày đến (Sri Lanka)",
      departureLabel: "Ngày về (từ Sri Lanka)",
      paxLabel: "Số lượng khách (Người)",
      adultsLabel: "Người lớn (12+ tuổi)",
      childrenLabel: "Trẻ em (6–12 tuổi)",
      totalPaxBadge: "Tổng số khách",
      hotelCategoryLabel: "Hạng khách sạn",
      hotelCategoryHint: "Chọn một hoặc nhiều phong cách lưu trú ưa thích:",
      hotelDropdownToggle: "Hoặc chọn hạng sao từ danh sách",
      hotelDropdownPrompt: "Chọn hạng sao...",
      hotelBoutique: "Boutique / Villa Di sản",
      hotel5Star: "Khách sạn 5 sao sang trọng",
      hotel4Star: "Khách sạn 4 sao cao cấp",
      hotel3Star: "Khách sạn 3 sao tiêu chuẩn",
      hotelBudget: "Khu lưu trú sinh thái / Tiết kiệm",
      roomsLabel: "Số phòng yêu cầu",
      roomsSelect: "Chọn số phòng",
      mealPlanLabel: "Gói bữa ăn mong muốn",
      mealBB: "Bao gồm ăn sáng (BB)",
      mealHB: "Nửa bữa - Ăn sáng & tối (HB)",
      mealFB: "Trọn gói toàn bộ bữa ăn (FB)",
      interestsLabel: "Sở thích & Trải nghiệm đặc biệt",
      interestCulture: "Văn hóa & Di sản",
      interestNature: "Thiên nhiên & Đồi chè",
      interestArchaeology: "Cổ vật & Khảo cổ học",
      interestWildlife: "Động vật hoang dã & Safari",
      interestAdventure: "Phiêu lưu & Trekking",
      interestBeach: "Nghỉ dưỡng biển",
      interestShopping: "Mua sắm & Đá quý",
      budgetLabel: "Ngân sách dự kiến cho chuyến đi",
      budgetPlaceholder: "ví dụ: 2,500 (mỗi người hoặc tổng cộng)",
      budgetHint: "Giúp chúng tôi gợi ý khách sạn và trải nghiệm tối ưu nhất cho bạn.",
      otherLabel: "Yêu cầu & Ghi chú đặc biệt",
      otherPlaceholder: "Chia sẻ yêu cầu về chế độ ăn uống, tài xế riêng, lễ kỷ niệm, ngôi chùa muốn viếng thăm...",
      securityLabel: "Xác minh người dùng",
      securityPrompt: "Vui lòng xác minh bạn là du khách thực sự:",
      securitySuccess: "Đã xác minh thành công ✓",
      submitButton: "Gửi yêu cầu",
      submitting: "Đang chuẩn bị hành trình thiêng liêng của bạn...",
      whatsappDirectBtn: "Gửi trực tiếp qua WhatsApp"
    },
    validation: {
      required: "Trường này là bắt buộc.",
      invalidEmail: "Vui lòng nhập địa chỉ email hợp lệ.",
      invalidPhone: "Vui lòng nhập số điện thoại hợp lệ.",
      pastDate: "Ngày đến không thể ở quá khứ.",
      departureBeforeArrival: "Ngày về phải sau ngày đến.",
      minPax: "Vui lòng chọn ít nhất 1 khách.",
      selectHotel: "Vui lòng chọn ít nhất một hạng khách sạn.",
      invalidBudget: "Vui lòng nhập ngân sách dự kiến của bạn.",
      securityCheck: "Vui lòng hoàn thành bước xác minh."
    },
    modal: {
      title: "Yêu cầu đã được tiếp nhận",
      message: "Xin cảm ơn! Chuyên viên du lịch Sri Lanka của chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ cùng lịch trình cá nhân hóa.",
      refNumber: "Mã tham chiếu yêu cầu",
      whatsappAction: "Trò chuyện qua WhatsApp ngay",
      downloadCopy: "Lưu bản sao",
      close: "Đóng"
    },
    footer: {
      aboutTitle: "Lotus Ceylon",
      aboutDesc: "Thiết kế những hành trình du lịch may đo, biến đổi tâm hồn khắp hòn đảo thiêng Sri Lanka với lòng hiếu khách nồng hậu mang đậm bản sắc Ceylon.",
      quickLinks: "Liên kết nhanh",
      contactTitle: "Liên hệ",
      connectTitle: "Mã QR kết nối trực tiếp",
      connectDesc: "Quét mã để trò chuyện trực tiếp với chuyên viên thiết kế tour:",
      since: "Cam kết chất lượng dịch vụ xuất sắc tại Sri Lanka từ năm 2014.",
      designerCredit: "Được thiết kế tinh tế bởi"
    }
  },
'''

def update_i18n():
    file_path = os.path.join(ROOT_DIR, 'js', 'i18n.js')
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Update header comment
    if 'DE, ES, RU, VI' not in content:
        content = content.replace(
            "Supported Languages: EN, HI, FR, IT, ZH, JA, AR (RTL), DE, ES, RU",
            "Supported Languages: EN, HI, FR, IT, ZH, JA, AR (RTL), DE, ES, RU, VI"
        )

    # Insert vi block before closing bracket of TRANSLATIONS
    if '\n  vi: {' not in content:
        # ru is the last language in TRANSLATIONS
        # Find where ru block ends:
        #       designerCredit: "Разработано"
        #     }
        #   }
        # };
        target = '      designerCredit: "Разработано"\n    }\n  }\n};'
        replacement = '      designerCredit: "Разработано"\n    }\n  },\n' + VI_TRANSLATIONS_BLOCK + '};'
        if target in content:
            content = content.replace(target, replacement)
        else:
            # Try with \r\n if needed
            target_crlf = '      designerCredit: "Разработано"\r\n    }\r\n  }\r\n};'
            replacement_crlf = '      designerCredit: "Разработано"\r\n    }\r\n  },\r\n' + VI_TRANSLATIONS_BLOCK.replace('\n', '\r\n') + '};'
            if target_crlf in content:
                content = content.replace(target_crlf, replacement_crlf)
            else:
                raise ValueError("Could not find end of TRANSLATIONS object in js/i18n.js")

    # Now add vi to TOUR_CATEGORY_I18N
    categories = [
        ('beach', 'hi: "समुद्र तट और तटीय यात्राएं"', 'vi: "Tour Nghỉ dưỡng Biển & Duyên hải"'),
        ('cultural', 'hi: "सांस्कृतिक और विरासत यात्राएं"', 'vi: "Hành trình Văn hóa & Di sản"'),
        ('wildlife', 'hi: "वन्यजीव सफारी और जंगल यात्राएं"', 'vi: "Safari Động vật hoang dã & Thiên nhiên"'),
        ('hill-country', 'hi: "चाय के बागान और पहाड़ी यात्राएं"', 'vi: "Vùng Cao nguyên & Đồi chè Ceylon"'),
        ('adventure', 'hi: "साहसिक और सक्रिय यात्राएं"', 'vi: "Phiêu lưu mạo hiểm & Khám phá năng động"'),
        ('ayurvedic', 'hi: "आयुर्वेद और समग्र कल्याण"', 'vi: "Nghỉ dưỡng Ayurveda & Chăm sóc sức khỏe"'),
        ('honeymoon', 'hi: "विलासिता हनीमून और रोमांस"', 'vi: "Tuần trăng mật sang trọng & Kỳ nghỉ lãng mạn"'),
        ('family', 'hi: "पारिवारिक छुट्टियां और यात्राएं"', 'vi: "Kỳ nghỉ gia đình nhiều thế hệ"'),
        ('ramayana', 'hi: "पवित्र रामायण विरासत यात्राएं"', 'vi: "Hành hương theo dấu tích Ramayana thiêng liêng"'),
        ('golf', 'hi: "गोल्फ छुट्टियां और चैंपियनशिप"', 'vi: "Kỳ nghỉ Golf đỉnh cao & Sân golf tiêu chuẩn"')
    ]

    for cat_name, hi_line, vi_line in categories:
        if vi_line not in content:
            if hi_line in content:
                content = content.replace(hi_line, f'{hi_line},\n    {vi_line}')
            elif hi_line.replace('\n', '\r\n') in content:
                content = content.replace(hi_line.replace('\n', '\r\n'), f'{hi_line},\r\n    {vi_line}')

    with open(file_path, 'w', encoding='utf-8', newline='') as f:
        f.write(content)
    print("[SUCCESS] Updated js/i18n.js")


def update_partials_header():
    file_path = os.path.join(ROOT_DIR, 'partials', 'header.html')
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    btn_html = '<button data-lang="vi" type="button">🇻🇳 Tiếng Việt</button>'
    if 'data-lang="vi"' not in content:
        hi_btn = '<button data-lang="hi" type="button">🇮🇳 हिन्दी</button>'
        if hi_btn in content:
            content = content.replace(hi_btn, f'{hi_btn}\n<button data-lang="vi" type="button">🇻🇳 Tiếng Việt</button>')
        else:
            raise ValueError("Could not find Hindi button in partials/header.html")

    with open(file_path, 'w', encoding='utf-8', newline='') as f:
        f.write(content)
    print("[SUCCESS] Updated partials/header.html")


def update_partials_mobile_menu():
    file_path = os.path.join(ROOT_DIR, 'partials', 'mobile-menu.html')
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    btn_html = '<button class="mobile-lang-btn" data-lang="vi" type="button">🇻🇳 Tiếng Việt</button>'
    if 'data-lang="vi"' not in content:
        hi_btn = '<button class="mobile-lang-btn" data-lang="hi" type="button">🇮🇳 हिन्दी</button>'
        if hi_btn in content:
            content = content.replace(hi_btn, f'{hi_btn}\n<button class="mobile-lang-btn" data-lang="vi" type="button">🇻🇳 Tiếng Việt</button>')
        else:
            raise ValueError("Could not find Hindi button in partials/mobile-menu.html")

    with open(file_path, 'w', encoding='utf-8', newline='') as f:
        f.write(content)
    print("[SUCCESS] Updated partials/mobile-menu.html")


def update_admin():
    # 1. admin/index.html
    admin_index = os.path.join(ROOT_DIR, 'admin', 'index.html')
    with open(admin_index, 'r', encoding='utf-8') as f:
        content = f.read()

    opt_html = '<option value="vi">🇻🇳 Tiếng Việt</option>'
    if 'value="vi"' not in content:
        es_opt = '<option value="es">🇪🇸 Español</option>'
        if es_opt in content:
            content = content.replace(es_opt, f'{es_opt}\n          <option value="vi">🇻🇳 Tiếng Việt</option>')
        # Also update descriptions mentioning 10 / 11 languages to 12
        content = content.replace('10 supported languages', '12 supported languages')
        content = content.replace('<strong>10</strong> Languages', '<strong>12</strong> Languages')

    with open(admin_index, 'w', encoding='utf-8', newline='') as f:
        f.write(content)
    print("[SUCCESS] Updated admin/index.html")

    # 2. admin/js/page-editor.js
    editor_js = os.path.join(ROOT_DIR, 'admin', 'js', 'page-editor.js')
    with open(editor_js, 'r', encoding='utf-8') as f:
        content = f.read()

    if "'vi'" not in content:
        es_line = "{ code: 'es', label: '🇪🇸 Español' }"
        if es_line in content:
            content = content.replace(es_line, f"{es_line},\n    {{ code: 'vi', label: '🇻🇳 Tiếng Việt' }}")

    with open(editor_js, 'w', encoding='utf-8', newline='') as f:
        f.write(content)
    print("[SUCCESS] Updated admin/js/page-editor.js")


if __name__ == '__main__':
    update_site_translator()
    update_i18n()
    update_partials_header()
    update_partials_mobile_menu()
    update_admin()
    print("\n--- ALL LANGUAGE CONFIGURATIONS UPDATED ---")
