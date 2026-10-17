/**
 * Multi-Language (i18n) & RTL Engine
 * LOTUS CEYLON International Tours & Services (Pvt) Ltd
 * Supported Languages: EN, HI, FR, IT, ZH, JA, AR (RTL), DE, ES, RU
 */

const TRANSLATIONS = {
  en: {
    langName: "English",
    dir: "ltr",
    nav: {
      home: "Home",
      tours: "Travel Packages",
      about: "About Us",
      whyUs: "Why Choose Us",
      testimonials: "Testimonials",
      contact: "Contact Us",
      inquiry: "Inquiry",
      quickInquiry: "Quick Inquiry"
    },
    hero: {
      badge: "Sri Lanka Tailor-Made Holidays",
      title: "Plan Your Journey",
      slogan: "PURE JOURNEYS. SACRED EXPERIENCES."
    },
    form: {
      cardTitle: "Travel Inquiry Form",
      intro: "Inspired by the lotus, a symbol of purity, sacredness and resilience, tell us about your dream trip and we will craft it for you.",
      switchQuickNotice: "Short on time?",
      switchQuickLink: "Use our Quick Inquiry Form ➔",
      switchDetailedNotice: "Need full customization?",
      switchDetailedLink: "Use the Detailed Inquiry Form ➔",
      
      // Fields
      nameLabel: "Full Name",
      namePlaceholder: "e.g. Eleanor Vance",
      countryLabel: "Country of Residence",
      countryPlaceholder: "Search and select your country...",
      emailLabel: "Email Address",
      emailPlaceholder: "name@example.com",
      whatsappLabel: "WhatsApp Number",
      whatsappPlaceholder: "71 234 5678",
      whatsappHint: "Include your active WhatsApp number for quick tour itinerary updates.",
      arrivalLabel: "Arrival Date (to Sri Lanka)",
      departureLabel: "Departure Date (from Sri Lanka)",
      paxLabel: "Number of Travelers (Pax)",
      adultsLabel: "Adults (12+ yrs)",
      childrenLabel: "Children (6–12 yrs)",
      totalPaxBadge: "Total Pax",
      hotelCategoryLabel: "Hotel Category",
      hotelCategoryHint: "Select one or multiple preferred stay styles:",
      hotelDropdownToggle: "Or select a Star-Rating dropdown",
      hotelDropdownPrompt: "Choose Star Category...",
      hotelBoutique: "Boutique / Heritage Villa",
      hotel5Star: "5-Star Luxury",
      hotel4Star: "4-Star Superior",
      hotel3Star: "3-Star Standard",
      hotelBudget: "Budget / Eco Stays",
      roomsLabel: "Number of Rooms Required",
      roomsSelect: "Select rooms",
      mealPlanLabel: "Preferred Meal Plan",
      mealBB: "Bed & Breakfast (BB)",
      mealHB: "Half Board (HB)",
      mealFB: "Full Board (FB)",
      interestsLabel: "Special Interests & Experiences",
      interestCulture: "Culture & Heritage",
      interestNature: "Nature & Tea Country",
      interestArchaeology: "Ancient & Archaeology",
      interestWildlife: "Wildlife & Safari",
      interestAdventure: "Adventure & Hiking",
      interestBeach: "Beach & Coastal Chill",
      interestShopping: "Shopping & Gems",
      budgetLabel: "Targeted Package Budget",
      budgetPlaceholder: "e.g. 2,500 (per person or total)",
      budgetHint: "Gives us a benchmark to select ideal hotels and exclusive experiences.",
      otherLabel: "Other Requirements & Special Requests",
      otherPlaceholder: "Tell us about dietary needs, private chauffeur preferences, celebrations, must-visit temples...",
      securityLabel: "Human Verification",
      securityPrompt: "Please verify you are a genuine traveler:",
      securitySuccess: "Verified traveler ✓",
      submitButton: "Submit Inquiry",
      submitting: "Preparing your sacred journey...",
      whatsappDirectBtn: "Send via WhatsApp Directly"
    },
    validation: {
      required: "This field is required.",
      invalidEmail: "Please enter a valid email address.",
      invalidPhone: "Please enter a valid phone number.",
      pastDate: "Arrival date cannot be in the past.",
      departureBeforeArrival: "Departure date must be after arrival date.",
      minPax: "Please select at least 1 traveler.",
      selectHotel: "Please choose at least one hotel category.",
      invalidBudget: "Please enter your estimated budget.",
      securityCheck: "Please complete the verification check."
    },
    modal: {
      title: "Inquiry Received with Lotus Grace",
      message: "Thank you! Our dedicated Sri Lanka travel specialists will contact you within 24 hours with a personalized itinerary.",
      refNumber: "Inquiry Reference",
      whatsappAction: "Chat on WhatsApp Now",
      downloadCopy: "Save Copy",
      close: "Close"
    },
    footer: {
      aboutTitle: "Lotus Ceylon",
      aboutDesc: "Crafting bespoke, transformative travel experiences across the sacred island of Sri Lanka with hospitality rooted in authentic Ceylon warmth.",
      quickLinks: "Quick Navigation",
      contactTitle: "Get in Touch",
      connectTitle: "Instant Chat QR Codes",
      connectDesc: "Scan to chat directly with our travel designers:",
      since: "Dedicated to Sri Lankan excellence since 2014.",
      designerCredit: "Crafted with serenity by"
    }
  },

  hi: {
    langName: "हिन्दी",
    dir: "ltr",
    nav: {
      home: "होम",
      tours: "टूर्स",
      about: "हमारे बारे में",
      contact: "संपर्क",
      inquiry: "पूछताछ",
      quickInquiry: "त्वरित पूछताछ"
    },
    hero: {
      badge: "श्रीलंका अनुकूलित यात्राएं",
      title: "अपनी यात्रा की योजना बनाएं",
      slogan: "शुद्ध यात्राएं। पवित्र अनुभव।"
    },
    form: {
      cardTitle: "यात्रा पूछताछ फॉर्म",
      intro: "कमल से प्रेरित, पवित्रता और गरिमा का प्रतीक, हमें अपनी सपनों की यात्रा के बारे में बताएं और हम इसे आपके लिए तैयार करेंगे।",
      switchQuickNotice: "समय कम है?",
      switchQuickLink: "त्वरित पूछताछ फॉर्म का उपयोग करें ➔",
      switchDetailedNotice: "पूरी तरह से अनुकूलित विकल्प चाहिए?",
      switchDetailedLink: "विस्तृत पूछताछ फॉर्म पर जाएं ➔",
      nameLabel: "पूरा नाम",
      namePlaceholder: "जैसे: राहुल शर्मा",
      countryLabel: "निवास का देश",
      countryPlaceholder: "अपना देश चुनें...",
      emailLabel: "ईमेल पता",
      emailPlaceholder: "name@example.com",
      whatsappLabel: "व्हाट्सएप नंबर",
      whatsappPlaceholder: "98765 43210",
      whatsappHint: "त्वरित टूर अपडेट प्राप्त करने के लिए अपना सक्रिय व्हाट्सएप नंबर दर्ज करें।",
      arrivalLabel: "आगमन तिथि (श्रीलंका)",
      departureLabel: "प्रस्थान तिथि (श्रीलंका से)",
      paxLabel: "यात्रियों की संख्या (Pax)",
      adultsLabel: "वयस्क (12+ वर्ष)",
      childrenLabel: "बच्चे (6–12 वर्ष)",
      totalPaxBadge: "कुल यात्री",
      hotelCategoryLabel: "होटल श्रेणी",
      hotelCategoryHint: "अपनी पसंदीदा आवास शैली चुनें:",
      hotelDropdownToggle: "या स्टार-रेटिंग ड्रॉपडाउन चुनें",
      hotelDropdownPrompt: "स्टार श्रेणी चुनें...",
      hotelBoutique: "बुटीक / हेरिटेज विला",
      hotel5Star: "5-स्टार लक्जरी",
      hotel4Star: "4-स्टार सुपीरियर",
      hotel3Star: "3-स्टार मानक",
      hotelBudget: "बजट / इको स्टे",
      roomsLabel: "कमरों की संख्या",
      roomsSelect: "कमरे चुनें",
      mealPlanLabel: "पसंदीदा भोजन योजना",
      mealBB: "बेड एंड ब्रेकफास्ट (BB)",
      mealHB: "हाफ बोर्ड (HB)",
      mealFB: "फुल बोर्ड (FB)",
      interestsLabel: "विशेष रुचियां व अनुभव",
      interestCulture: "संस्कृति और विरासत",
      interestNature: "प्रकृति और चाय बागान",
      interestArchaeology: "प्राचीन स्थल और पुरातत्व",
      interestWildlife: "वन्यजीव और सफारी",
      interestAdventure: "साहसिक खेल और ट्रेकिंग",
      interestBeach: "समुद्र तट और विश्राम",
      interestShopping: "खरीदारी और रत्न",
      budgetLabel: "लक्षित पैकेज बजट",
      budgetPlaceholder: "उदा. 2,000",
      budgetHint: "यह हमें आपके लिए सबसे उपयुक्त होटल चुनने में मदद करता है।",
      otherLabel: "अन्य आवश्यकताएं या विशेष अनुरोध",
      otherPlaceholder: "आहार संबंधी आवश्यकताएं, विशेष स्थान, निजी ड्राइवर आदि बताएं...",
      securityLabel: "सुरक्षा जांच",
      securityPrompt: "कृपया पुष्टि करें कि आप वास्तविक यात्री हैं:",
      securitySuccess: "सत्यापित यात्री ✓",
      submitButton: "पूछताछ जमा करें",
      submitting: "आपकी यात्रा की योजना बन रही है...",
      whatsappDirectBtn: "व्हाट्सएप पर सीधे भेजें"
    },
    validation: {
      required: "यह फ़ील्ड आवश्यक है।",
      invalidEmail: "कृपया एक वैध ईमेल पता दर्ज करें।",
      invalidPhone: "कृपया एक मान्य फोन नंबर दर्ज करें।",
      pastDate: "आगमन तिथि अतीत में नहीं हो सकती।",
      departureBeforeArrival: "प्रस्थान तिथि आगमन तिथि के बाद होनी चाहिए।",
      minPax: "कृपया कम से कम 1 यात्री चुनें।",
      selectHotel: "कृपया कम से कम एक होटल श्रेणी चुनें।",
      invalidBudget: "कृपया अपना अनुमानित बजट दर्ज करें।",
      securityCheck: "कृपया सत्यापन पूरा करें।"
    },
    modal: {
      title: "आपकी पूछताछ प्राप्त हो गई है",
      message: "धन्यवाद! हमारे श्रीलंका यात्रा विशेषज्ञ 24 घंटों के भीतर अनुकूलित यात्रा कार्यक्रम के साथ आपसे संपर्क करेंगे।",
      refNumber: "पूछताछ संदर्भ",
      whatsappAction: "अभी व्हाट्सएप पर बात करें",
      downloadCopy: "कॉपी सहेजें",
      close: "बंद करें"
    },
    footer: {
      aboutTitle: "लोटस सीलोन",
      aboutDesc: "2014 से श्रीलंका भर में प्रामाणिक सत्कार के साथ विशेष यात्राओं का निर्माण।",
      quickLinks: "नेविगेशन",
      contactTitle: "संपर्क करें",
      connectTitle: "त्वरित चैट QR कोड",
      connectDesc: "हमारे विशेषज्ञों से सीधे चैट करने के लिए स्कैन करें:",
      since: "2014 से श्रीलंका में समर्पित सेवा।",
      designerCredit: "द्वारा निर्मित"
    }
  },

  fr: {
    langName: "Français",
    dir: "ltr",
    nav: {
      home: "Accueil",
      tours: "Circuits",
      about: "À Propos",
      contact: "Contact",
      inquiry: "Demande",
      quickInquiry: "Demande Rapide"
    },
    hero: {
      badge: "Voyages Sur Mesure au Sri Lanka",
      title: "Planifiez Votre Voyage",
      slogan: "PURE JOURNEYS. SACRED EXPERIENCES."
    },
    form: {
      cardTitle: "Formulaire de Demande de Voyage",
      intro: "Inspiré par le lotus, symbole de pureté, de sacré et de résilience, partagez votre voyage de rêve et nous le concevrons pour vous.",
      switchQuickNotice: "Peu de temps ?",
      switchQuickLink: "Utilisez le formulaire rapide ➔",
      switchDetailedNotice: "Besoin de personnalisation complète ?",
      switchDetailedLink: "Formulaire détaillé ➔",
      nameLabel: "Nom Complet",
      namePlaceholder: "ex. Jean Dupont",
      countryLabel: "Pays de Résidence",
      countryPlaceholder: "Sélectionnez votre pays...",
      emailLabel: "Adresse Email",
      emailPlaceholder: "nom@exemple.com",
      whatsappLabel: "Numéro WhatsApp",
      whatsappPlaceholder: "6 12 34 56 78",
      whatsappHint: "Indiquez votre numéro WhatsApp actif pour un suivi rapide de l'itinéraire.",
      arrivalLabel: "Date d'Arrivée (au Sri Lanka)",
      departureLabel: "Date de Départ (du Sri Lanka)",
      paxLabel: "Nombre de Voyageurs (Pax)",
      adultsLabel: "Adultes (12+ ans)",
      childrenLabel: "Enfants (6–12 ans)",
      totalPaxBadge: "Total Voyageurs",
      hotelCategoryLabel: "Catégorie d'Hôtel",
      hotelCategoryHint: "Sélectionnez un ou plusieurs styles d'hébergement :",
      hotelDropdownToggle: "Ou choisissez via la liste déroulante",
      hotelDropdownPrompt: "Choisir le classement...",
      hotelBoutique: "Boutique / Villa de Charme",
      hotel5Star: "Luxe 5 Étoiles",
      hotel4Star: "Supérieur 4 Étoiles",
      hotel3Star: "Standard 3 Étoiles",
      hotelBudget: "Éco / Budget",
      roomsLabel: "Nombre de Chambres",
      roomsSelect: "Sélectionnez le nombre",
      mealPlanLabel: "Formule Repas Souhaitée",
      mealBB: "Petit-déjeuner (BB)",
      mealHB: "Demi-pension (HB)",
      mealFB: "Pension complète (FB)",
      interestsLabel: "Centres d'Intérêt & Expériences",
      interestCulture: "Culture & Patrimoine",
      interestNature: "Nature & Plantations de Thé",
      interestArchaeology: "Cités Anciennes & Archéologie",
      interestWildlife: "Faune & Safari",
      interestAdventure: "Aventure & Randonnée",
      interestBeach: "Plages & Détente Côtière",
      interestShopping: "Artisanat, Épices & Pierres",
      budgetLabel: "Budget Envisagé",
      budgetPlaceholder: "ex. 2 500",
      budgetHint: "Nous aide à calibrer vos hôtels et excursions privées.",
      otherLabel: "Autres Exigences & Souhaits",
      otherPlaceholder: "Régimes particuliers, chauffeur privé, célébrations, temples préférés...",
      securityLabel: "Vérification de Sécurité",
      securityPrompt: "Confirmez que vous êtes un vrai voyageur :",
      securitySuccess: "Voyageur vérifié ✓",
      submitButton: "Envoyer ma Demande",
      submitting: "Préparation de votre voyage sacré...",
      whatsappDirectBtn: "Envoyer directement sur WhatsApp"
    },
    validation: {
      required: "Ce champ est obligatoire.",
      invalidEmail: "Veuillez entrer une adresse email valide.",
      invalidPhone: "Veuillez entrer un numéro de téléphone valide.",
      pastDate: "La date d'arrivée ne peut pas être passée.",
      departureBeforeArrival: "La date de départ doit être postérieure à l'arrivée.",
      minPax: "Veuillez sélectionner au moins 1 voyageur.",
      selectHotel: "Veuillez sélectionner au moins une catégorie d'hôtel.",
      invalidBudget: "Veuillez indiquer votre budget approximatif.",
      securityCheck: "Veuillez valider la vérification."
    },
    modal: {
      title: "Demande Reçue avec Grâce",
      message: "Merci ! Nos spécialistes du voyage au Sri Lanka vous contacteront sous 24h avec une proposition sur mesure.",
      refNumber: "Référence du dossier",
      whatsappAction: "Échanger sur WhatsApp",
      downloadCopy: "Télécharger une copie",
      close: "Fermer"
    },
    footer: {
      aboutTitle: "Lotus Ceylon",
      aboutDesc: "Créateur de voyages authentiques et sereins à travers l'île sacrée du Sri Lanka depuis 2014.",
      quickLinks: "Navigation",
      contactTitle: "Nous Contacter",
      connectTitle: "QR Codes de Messagerie",
      connectDesc: "Scannez pour échanger directement avec nous :",
      since: "Dédié à l'excellence sri lankaise depuis 2014.",
      designerCredit: "Conçu par"
    }
  },

  it: {
    langName: "Italiano",
    dir: "ltr",
    nav: {
      home: "Home",
      tours: "Tour",
      about: "Chi Siamo",
      contact: "Contatti",
      inquiry: "Richiesta",
      quickInquiry: "Richiesta Rapida"
    },
    hero: {
      badge: "Viaggi su Misura in Sri Lanka",
      title: "Pianifica il Tuo Viaggio",
      slogan: "VIAGGI PURI. ESPERIENZE SACRE."
    },
    form: {
      cardTitle: "Modulo di Richiesta Viaggio",
      intro: "Ispirati dal loto, simbolo di purezza e grazia, raccontaci il tuo viaggio ideale e lo realizzeremo per te.",
      switchQuickNotice: "Poco tempo?",
      switchQuickLink: "Usa il Modulo Rapido ➔",
      switchDetailedNotice: "Preferisci personalizzare tutto?",
      switchDetailedLink: "Modulo Dettagliato ➔",
      nameLabel: "Nome Completo",
      namePlaceholder: "es. Marco Rossi",
      countryLabel: "Paese di Residenza",
      countryPlaceholder: "Seleziona il tuo paese...",
      emailLabel: "Indirizzo Email",
      emailPlaceholder: "nome@esempio.it",
      whatsappLabel: "Numero WhatsApp",
      whatsappPlaceholder: "340 123 4567",
      whatsappHint: "Inserisci il tuo numero WhatsApp per ricevere rapidamente l'itinerario.",
      arrivalLabel: "Data di Arrivo (in Sri Lanka)",
      departureLabel: "Data di Partenza (dallo Sri Lanka)",
      paxLabel: "Numero di Viaggiatori (Pax)",
      adultsLabel: "Adulti (12+ anni)",
      childrenLabel: "Bambini (6–12 anni)",
      totalPaxBadge: "Totale Pax",
      hotelCategoryLabel: "Categoria Alberghiera",
      hotelCategoryHint: "Seleziona uno o più stili di soggiorno:",
      hotelDropdownToggle: "Oppure usa il menu a tendina stelle",
      hotelDropdownPrompt: "Scegli categoria...",
      hotelBoutique: "Boutique / Dimora Storica",
      hotel5Star: "5 Stelle Lusso",
      hotel4Star: "4 Stelle Superior",
      hotel3Star: "3 Stelle Standard",
      hotelBudget: "Budget / Eco Lodge",
      roomsLabel: "Numero di Camere",
      roomsSelect: "Seleziona camere",
      mealPlanLabel: "Trattamento Pasti Preferito",
      mealBB: "Pernottamento e Colazione (BB)",
      mealHB: "Mezza Pensione (HB)",
      mealFB: "Pensione Completa (FB)",
      interestsLabel: "Interessi ed Esperienze",
      interestCulture: "Cultura e Patrimonio",
      interestNature: "Natura e Piantagioni di Tè",
      interestArchaeology: "Siti Archeologici",
      interestWildlife: "Safari e Fauna Selvatica",
      interestAdventure: "Avventura e Trekking",
      interestBeach: "Spiaggia e Relax Costiero",
      interestShopping: "Shopping, Spezie e Gemme",
      budgetLabel: "Budget Previsto",
      budgetPlaceholder: "es. 2.500",
      budgetHint: "Ci aiuta a personalizzare sistemazioni ed esperienze.",
      otherLabel: "Altre Richieste o Preferenze",
      otherPlaceholder: "Dieta, autista privato, anniversari, templi da non perdere...",
      securityLabel: "Verifica di Sicurezza",
      securityPrompt: "Conferma di essere un vero viaggiatore:",
      securitySuccess: "Verificato con successo ✓",
      submitButton: "Invia Richiesta",
      submitting: "Creazione del tuo viaggio in corso...",
      whatsappDirectBtn: "Invia direttamente su WhatsApp"
    },
    validation: {
      required: "Campo obbligatorio.",
      invalidEmail: "Inserisci un indirizzo email valido.",
      invalidPhone: "Inserisci un numero di telefono valido.",
      pastDate: "La data di arrivo non può essere nel passato.",
      departureBeforeArrival: "La data di partenza deve essere successiva all'arrivo.",
      minPax: "Seleziona almeno 1 viaggiatore.",
      selectHotel: "Seleziona almeno una categoria alberghiera.",
      invalidBudget: "Inserisci il tuo budget stimato.",
      securityCheck: "Completa la verifica."
    },
    modal: {
      title: "Richiesta Ricevuta con Grazia",
      message: "Grazie! I nostri specialisti dello Sri Lanka ti contatteranno entro 24 ore con un itinerario dedicato.",
      refNumber: "Codice Richiesta",
      whatsappAction: "Chatta su WhatsApp",
      downloadCopy: "Salva Copia",
      close: "Chiudi"
    },
    footer: {
      aboutTitle: "Lotus Ceylon",
      aboutDesc: "Esperienze di viaggio autentiche e su misura in Sri Lanka dal 2014.",
      quickLinks: "Navigazione",
      contactTitle: "Contatti",
      connectTitle: "QR Code di Contatto",
      connectDesc: "Scansiona per chattare direttamente con i nostri esperti:",
      since: "Dal 2014 al servizio dei viaggiatori in Sri Lanka.",
      designerCredit: "Realizzato da"
    }
  },

  zh: {
    langName: "中文",
    dir: "ltr",
    nav: {
      home: "首页",
      tours: "精选路线",
      about: "关于我们",
      contact: "联系我们",
      inquiry: "定制咨询",
      quickInquiry: "极速咨询"
    },
    hero: {
      badge: "斯里兰卡高端定制旅行",
      title: "规划您的斯里兰卡之旅",
      slogan: "纯粹之旅。神圣体验。"
    },
    form: {
      cardTitle: "旅行定制意向单",
      intro: "莲花象征纯洁、神圣与坚韧。告诉我们您的旅行梦想，我们将为您精心打造专属于您的锡兰记忆。",
      switchQuickNotice: "赶时间？",
      switchQuickLink: "使用极速定制表单 ➔",
      switchDetailedNotice: "需要全面定制？",
      switchDetailedLink: "前往详细定制表单 ➔",
      nameLabel: "您的姓名",
      namePlaceholder: "例如：张伟",
      countryLabel: "居住国家/地区",
      countryPlaceholder: "请选择所在国家...",
      emailLabel: "电子邮箱",
      emailPlaceholder: "name@example.com",
      whatsappLabel: "WhatsApp / 手机号码",
      whatsappPlaceholder: "138 0000 0000",
      whatsappHint: "请填写常用联系方式，便于我们快速发送行程方案。",
      arrivalLabel: "抵达斯里兰卡日期",
      departureLabel: "离开斯里兰卡日期",
      paxLabel: "出行人数 (Pax)",
      adultsLabel: "成人 (12岁及以上)",
      childrenLabel: "儿童 (6–12岁)",
      totalPaxBadge: "总人数",
      hotelCategoryLabel: "酒店偏好类别",
      hotelCategoryHint: "可多选您喜欢的住宿档次：",
      hotelDropdownToggle: "或通过下拉菜单选择星级",
      hotelDropdownPrompt: "选择星级...",
      hotelBoutique: "精品轻奢 / 历史遗产庄园",
      hotel5Star: "五星奢华度假酒店",
      hotel4Star: "高品质四星酒店",
      hotel3Star: "舒适标准三星酒店",
      hotelBudget: "生态经济 / 特色民宿",
      roomsLabel: "所需房间数",
      roomsSelect: "选择房间数",
      mealPlanLabel: "用餐计划偏好",
      mealBB: "仅含早餐 (BB)",
      mealHB: "早晚餐半包 (HB)",
      mealFB: "全包三餐 (FB)",
      interestsLabel: "特色兴趣与体验",
      interestCulture: "世界遗产与佛教文化",
      interestNature: "高山茶园与自然风光",
      interestArchaeology: "古城遗迹与考古",
      interestWildlife: "国家公园野生动物游猎",
      interestAdventure: "徒步探险与山地户外",
      interestBeach: "海滨度假与观鲸冲浪",
      interestShopping: "锡兰宝石与香料购物",
      budgetLabel: "预计预算",
      budgetPlaceholder: "例如：2,500 (每人或总计)",
      budgetHint: "帮助我们为您精准匹配合适酒店与独家体验项目。",
      otherLabel: "特殊需求或备注",
      otherPlaceholder: "如素食需求、蜜月布置、私人中文导游、特殊寺庙拜访等...",
      securityLabel: "安全验证",
      securityPrompt: "请验证您是真实旅行者：",
      securitySuccess: "验证通过 ✓",
      submitButton: "提交旅行咨询",
      submitting: "正在为您生成专属行程规划...",
      whatsappDirectBtn: "通过 WhatsApp 直接发送"
    },
    validation: {
      required: "此项为必填项。",
      invalidEmail: "请输入有效的电子邮箱地址。",
      invalidPhone: "请输入有效的电话号码。",
      pastDate: "抵达日期不能是过去的日期。",
      departureBeforeArrival: "离境日期必须晚于抵达日期。",
      minPax: "请至少选择1位出行人员。",
      selectHotel: "请至少勾选一种酒店类别。",
      invalidBudget: "请填写您的预算预期。",
      securityCheck: "请完成安全验证。"
    },
    modal: {
      title: "已收到您的旅行意向",
      message: "非常感谢！我们的斯里兰卡定制旅行顾问将在24小时内为您发送专属定制行程及报价方案。",
      refNumber: "咨询单编号",
      whatsappAction: "立即通过 WhatsApp 沟通",
      downloadCopy: "保存副本",
      close: "关闭"
    },
    footer: {
      aboutTitle: "Lotus Ceylon 莲花锡兰",
      aboutDesc: "自2014年起深耕斯里兰卡，专注高端私人定制与纯净灵性之旅。",
      quickLinks: "网站导航",
      contactTitle: "联系方式",
      connectTitle: "即时通讯二维码",
      connectDesc: "扫码添加微信、WhatsApp 或 LINE：",
      since: "自 2014 年起专注斯里兰卡卓越旅行服务。",
      designerCredit: "精心设计由"
    }
  },

  ja: {
    langName: "日本語",
    dir: "ltr",
    nav: {
      home: "ホーム",
      tours: "ツアー",
      about: "会社案内",
      contact: "お問い合わせ",
      inquiry: "旅行相談",
      quickInquiry: "クイック相談"
    },
    hero: {
      badge: "スリランカ極上オーダーメイド旅行",
      title: "スリランカの旅を計画する",
      slogan: "PURE JOURNEYS. SACRED EXPERIENCES."
    },
    form: {
      cardTitle: "スリランカ旅行 お問い合わせフォーム",
      intro: "純粋さと神聖さの象徴である蓮のように、あなたの理想のスリランカ旅行をお聞かせください。心を込めて手配いたします。",
      switchQuickNotice: "お急ぎですか？",
      switchQuickLink: "クイック問い合わせはこちら ➔",
      switchDetailedNotice: "詳細なカスタマイズをご希望ですか？",
      switchDetailedLink: "詳細フォームはこちら ➔",
      nameLabel: "お名前",
      namePlaceholder: "例：山田 太郎",
      countryLabel: "居住国",
      countryPlaceholder: "国を選択してください...",
      emailLabel: "メールアドレス",
      emailPlaceholder: "name@example.com",
      whatsappLabel: "WhatsApp / お電話番号",
      whatsappPlaceholder: "090 1234 5678",
      whatsappHint: "旅程のご案内を迅速にお届けするため、連絡可能な番号をご記入ください。",
      arrivalLabel: "スリランカご到着日",
      departureLabel: "スリランカご出発日",
      paxLabel: "ご旅行人数 (Pax)",
      adultsLabel: "大人 (12歳以上)",
      childrenLabel: "お子様 (6–12歳)",
      totalPaxBadge: "合計人数",
      hotelCategoryLabel: "ご希望のホテルカテゴリー",
      hotelCategoryHint: "ご希望の宿泊スタイルをお選びください（複数選択可）：",
      hotelDropdownToggle: "または星評価ドロップダウンを選択",
      hotelDropdownPrompt: "星評価を選択...",
      hotelBoutique: "ブティック / ヘリテージ邸宅",
      hotel5Star: "5つ星高級リゾート",
      hotel4Star: "4つ星スーペリア",
      hotel3Star: "3つ星スタンダード",
      hotelBudget: "エコ / バジェットロッジ",
      roomsLabel: "必要部屋数",
      roomsSelect: "部屋数を選択",
      mealPlanLabel: "お食事プラン",
      mealBB: "朝食付き (BB)",
      mealHB: "朝夕2食付き (HB)",
      mealFB: "3食全食事付き (FB)",
      interestsLabel: "ご興味・体験したいこと",
      interestCulture: "世界遺産・仏教文化",
      interestNature: "紅茶畑・高地自然景観",
      interestArchaeology: "古代遺跡・歴史探訪",
      interestWildlife: "サファリ・野生動物",
      interestAdventure: "トレッキング・冒険",
      interestBeach: "ビーチリゾート・海辺の寛ぎ",
      interestShopping: "宝石・スパイス・お買い物",
      budgetLabel: "ご予算の目安",
      budgetPlaceholder: "例：250,000",
      budgetHint: "最適なホテルや特別な体験をご提案するための目安となります。",
      otherLabel: "その他のご要望・特別なリクエスト",
      otherPlaceholder: "食事制限、専用車・専属ガイド、記念日、訪れたい寺院など...",
      securityLabel: "認証確認",
      securityPrompt: "旅行者であることを確認してください：",
      securitySuccess: "認証完了 ✓",
      submitButton: "プラン作成を依頼する",
      submitting: "聖なる旅の計画を準備しています...",
      whatsappDirectBtn: "WhatsAppで直接送信"
    },
    validation: {
      required: "必須項目です。",
      invalidEmail: "有効なメールアドレスを入力してください。",
      invalidPhone: "有効な電話番号を入力してください。",
      pastDate: "到着日に過去の日付は指定できません。",
      departureBeforeArrival: "出発日は到着日より後の日付にしてください。",
      minPax: "最低1名以上の人数を選択してください。",
      selectHotel: "ホテルカテゴリーを最低1つ選択してください。",
      invalidBudget: "概算予算をご入力ください。",
      securityCheck: "認証を完了してください。"
    },
    modal: {
      title: "お問い合わせを受け付けました",
      message: "ありがとうございます。専任の旅コンシェルジュが24時間以内にオーダーメイドの旅程案をご案内いたします。",
      refNumber: "お問い合わせ番号",
      whatsappAction: "WhatsAppで相談する",
      downloadCopy: "控えを保存",
      close: "閉じる"
    },
    footer: {
      aboutTitle: "ロータス・セイロン",
      aboutDesc: "2014年創業。心温まるおもてなしとスリランカの聖なる魅力を届ける専門旅行会社。",
      quickLinks: "サイト案内",
      contactTitle: "お問い合わせ先",
      connectTitle: "チャットQRコード",
      connectDesc: "QRコードをスキャンして直接お問い合わせいただけます：",
      since: "2014年よりスリランカの旅をプロデュース。",
      designerCredit: "制作："
    }
  },

  ar: {
    langName: "العربية",
    dir: "rtl",
    nav: {
      home: "الرئيسية",
      tours: "الجولات",
      about: "من نحن",
      contact: "اتصل بنا",
      inquiry: "استفسار",
      quickInquiry: "استفسار سريع"
    },
    hero: {
      badge: "رحلات سريلانكا المصممة خصيصاً",
      title: "خطط لرحلتك الاستثنائية",
      slogan: "رحلات نقية. تجارب مقدسة."
    },
    form: {
      cardTitle: "نموذج استفسار السفر",
      intro: "مستوحى من زهرة اللوتس، رمز النقاء والأصالة، أخبرنا عن رحلة أحلامك وسنقوم بصياغتها لك بعناية فائقة.",
      switchQuickNotice: "هل وقتك ضيق؟",
      switchQuickLink: "استخدم نموذج الاستفسار السريع ➔",
      switchDetailedNotice: "هل تفضل تخصيصاً كاملاً؟",
      switchDetailedLink: "الانتقال للنموذج المفصل ➔",
      nameLabel: "الاسم الكامل",
      namePlaceholder: "مثال: أحمد عبد الله",
      countryLabel: "بلد الإقامة",
      countryPlaceholder: "ابحث واختر بلدك...",
      emailLabel: "البريد الإلكتروني",
      emailPlaceholder: "name@example.com",
      whatsappLabel: "رقم الواتساب",
      whatsappPlaceholder: "50 123 4567",
      whatsappHint: "يرجى كتابة رقم الواتساب النشط لتلقي خطة الرحلة بسرعة.",
      arrivalLabel: "تاريخ الوصول (إلى سريلانكا)",
      departureLabel: "تاريخ المغادرة (من سريلانكا)",
      paxLabel: "عدد المسافرين",
      adultsLabel: "البالغون (12+ سنة)",
      childrenLabel: "الأطفال (6–12 سنة)",
      totalPaxBadge: "إجمالي المسافرين",
      hotelCategoryLabel: "فئة الفنادق المفضلة",
      hotelCategoryHint: "اختر أسلوب الإقامة المفضل لديك (يمكنك اختيار أكثر من فئة):",
      hotelDropdownToggle: "أو اختر فئة النجوم من القائمة المنسدلة",
      hotelDropdownPrompt: "اختر الفئة...",
      hotelBoutique: "بوتيك / فلل تراثية فاخرة",
      hotel5Star: "5 نجوم فاخرة",
      hotel4Star: "4 نجوم ممتازة",
      hotel3Star: "3 نجوم قياسية",
      hotelBudget: "اقتصادي / بيئي",
      roomsLabel: "عدد الغرف المطلوبة",
      roomsSelect: "اختر عدد الغرف",
      mealPlanLabel: "خطة الوجبات المفضلة",
      mealBB: "مبيت وإفطار (BB)",
      mealHB: "نصف إقامة (HB)",
      mealFB: "إقامة كاملة مع كافة الوجبات (FB)",
      interestsLabel: "الاهتمامات والتجارب الخاصة",
      interestCulture: "الثقافة والتراث العريق",
      interestNature: "الطبيعة ومزارع الشاي الخلابة",
      interestArchaeology: "الآثار والمدن القديمة",
      interestWildlife: "الحياة البرية ورحلات السفاري",
      interestAdventure: "المغامرة والمشي الجبلي",
      interestBeach: "الشواطئ والاستجمام الساحلي",
      interestShopping: "التسوق والأحجار الكريمة",
      budgetLabel: "الميزانية المتوقعة للباكج",
      budgetPlaceholder: "مثال: 2,500",
      budgetHint: "تساعدنا في اختيار أنسب الفنادق والتجارب الحصرية المناسبة لك.",
      otherLabel: "متطلبات خاصة وملاحظات أخرى",
      otherPlaceholder: "وجبات حلال، سائق خاص يتحدث العربية، رحلات عائلية، ترتيبات شهر العسل...",
      securityLabel: "التحقق الأمني",
      securityPrompt: "يرجى التأكيد أنك مسافر حقيقي:",
      securitySuccess: "تم التحقق بنجاح ✓",
      submitButton: "إرسال طلب الاستفسار",
      submitting: "جاري تجهيز خطة رحلتك...",
      whatsappDirectBtn: "إرسال عبر الواتساب مباشرة"
    },
    validation: {
      required: "هذا الحقل مطلوب.",
      invalidEmail: "يرجى إدخال بريد إلكتروني صحيح.",
      invalidPhone: "يرجى إدخال رقم هاتف صحيح.",
      pastDate: "لا يمكن أن يكون تاريخ الوصول في الماضي.",
      departureBeforeArrival: "يجب أن يكون تاريخ المغادرة بعد تاريخ الوصول.",
      minPax: "يرجى تحديد مسافر واحد على الأقل.",
      selectHotel: "يرجى اختيار فئة فندقية واحدة على الأقل.",
      invalidBudget: "يرجى إدخال الميزانية التقريبية.",
      securityCheck: "يرجى استكمال التحقق."
    },
    modal: {
      title: "تم استلام استفساركم بكل سرور",
      message: "شكراً لكم! سيتواصل معكم فريق خبراء لوتس سيلان خلال 24 ساعة بجدول رحلة مخصص بالكامل.",
      refNumber: "رقم المرجع",
      whatsappAction: "محادثة عبر الواتساب الآن",
      downloadCopy: "حفظ نسخة",
      close: "إغلاق"
    },
    footer: {
      aboutTitle: "لوتس سيلان الدولية",
      aboutDesc: "نصنع تجارب سفر استثنائية وملهمة في جزيرة سريلانكا مع كرم الضيافة السيلانية الأصيلة منذ 2014.",
      quickLinks: "روابط سريعة",
      contactTitle: "معلومات الاتصال",
      connectTitle: "رموز QR للمحادثة الفورية",
      connectDesc: "امسح الرمز للتواصل مباشرة مع مصممي رحلاتنا:",
      since: "ملتزمون بالتميز في سريلانكا منذ عام 2014.",
      designerCredit: "تصميم"
    }
  },

  de: {
    langName: "Deutsch",
    dir: "ltr",
    nav: {
      home: "Startseite",
      tours: "Rundreisen",
      about: "Über Uns",
      contact: "Kontakt",
      inquiry: "Anfrage",
      quickInquiry: "Schnellanfrage"
    },
    hero: {
      badge: "Maßgeschneiderte Sri Lanka Reisen",
      title: "Planen Sie Ihre Reise",
      slogan: "PURE JOURNEYS. SACRED EXPERIENCES."
    },
    form: {
      cardTitle: "Reiseanfrage-Formular",
      intro: "Inspiriert von der Lotusblüte, einem Symbol für Reinheit und Erhabenheit, teilen Sie uns Ihre Reiseträume mit.",
      switchQuickNotice: "Wenig Zeit?",
      switchQuickLink: "Zum Schnellanfrage-Formular ➔",
      switchDetailedNotice: "Volle Flexibilität gewünscht?",
      switchDetailedLink: "Zum ausführlichen Formular ➔",
      nameLabel: "Vollständiger Name",
      namePlaceholder: "z.B. Thomas Müller",
      countryLabel: "Wohnsitzland",
      countryPlaceholder: "Land auswählen...",
      emailLabel: "E-Mail-Adresse",
      emailPlaceholder: "name@beispiel.de",
      whatsappLabel: "WhatsApp-Nummer",
      whatsappPlaceholder: "170 1234567",
      whatsappHint: "Für zügige Reiseplan-Abstimmungen per WhatsApp.",
      arrivalLabel: "Ankunftsdatum (in Sri Lanka)",
      departureLabel: "Abreisedatum (aus Sri Lanka)",
      paxLabel: "Anzahl Reisende (Pax)",
      adultsLabel: "Erwachsene (12+ Jahre)",
      childrenLabel: "Kinder (6–12 Jahre)",
      totalPaxBadge: "Gesamt Pax",
      hotelCategoryLabel: "Hotelkategorie",
      hotelCategoryHint: "Wählen Sie eine oder mehrere bevorzugte Unterkunftsarten:",
      hotelDropdownToggle: "Oder Stern-Kategorie als Dropdown wählen",
      hotelDropdownPrompt: "Kategorie wählen...",
      hotelBoutique: "Boutique / Historische Villa",
      hotel5Star: "5-Sterne Luxus",
      hotel4Star: "4-Sterne Superior",
      hotel3Star: "3-Sterne Standard",
      hotelBudget: "Budget / Eco-Lodge",
      roomsLabel: "Benötigte Zimmer",
      roomsSelect: "Zimmer wählen",
      mealPlanLabel: "Bevorzugte Verpflegung",
      mealBB: "Übernachtung & Frühstück (BB)",
      mealHB: "Halbpension (HB)",
      mealFB: "Vollpension (FB)",
      interestsLabel: "Besondere Interessen & Erlebnisse",
      interestCulture: "Kultur & Weltkulturerbe",
      interestNature: "Natur & Hochland-Teeberge",
      interestArchaeology: "Antike Stätten & Geschichte",
      interestWildlife: "Tierwelt & Safari",
      interestAdventure: "Abenteuer & Wandern",
      interestBeach: "Strand & Erholung",
      interestShopping: "Edelsteine & Gewürze",
      budgetLabel: "Geplantes Budget",
      budgetPlaceholder: "z.B. 2.500",
      budgetHint: "Hilft uns, passende Hotels und Exklusiv-Aktivitäten abzustimmen.",
      otherLabel: "Besondere Wünsche & Anmerkungen",
      otherPlaceholder: "Ernährung, privater Chauffeur, Jubiläen, Wunschtempel...",
      securityLabel: "Sicherheitsprüfung",
      securityPrompt: "Bestätigen Sie, dass Sie ein echter Reisender sind:",
      securitySuccess: "Erfolgreich verifiziert ✓",
      submitButton: "Anfrage absenden",
      submitting: "Ihre Reise wird vorbereitet...",
      whatsappDirectBtn: "Direkt via WhatsApp senden"
    },
    validation: {
      required: "Dieses Feld ist erforderlich.",
      invalidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
      invalidPhone: "Bitte geben Sie eine gültige Telefonnummer ein.",
      pastDate: "Das Ankunftsdatum darf nicht in der Vergangenheit liegen.",
      departureBeforeArrival: "Das Abreisedatum muss nach dem Anreisedatum liegen.",
      minPax: "Bitte wählen Sie mindestens 1 Reisenden.",
      selectHotel: "Bitte wählen Sie mindestens eine Hotelkategorie.",
      invalidBudget: "Bitte geben Sie Ihr Richtbudget an.",
      securityCheck: "Bitte Verifizierung abschließen."
    },
    modal: {
      title: "Anfrage mit Lotus-Anmut erhalten",
      message: "Vielen Dank! Unsere Sri Lanka Reisespezialisten melden sich innerhalb von 24 Stunden mit einem maßgeschneiderten Reiseplan.",
      refNumber: "Referenznummer",
      whatsappAction: "Jetzt auf WhatsApp chatten",
      downloadCopy: "Kopie speichern",
      close: "Schließen"
    },
    footer: {
      aboutTitle: "Lotus Ceylon",
      aboutDesc: "Maßgeschneiderte Sri Lanka Rundreisen mit authentischer ceylonesischer Herzlichkeit seit 2014.",
      quickLinks: "Navigation",
      contactTitle: "Kontakt",
      connectTitle: "Chat QR-Codes",
      connectDesc: "Scannen Sie den Code für den direkten Draht zu uns:",
      since: "Seit 2014 für Ihre Traumreisen in Sri Lanka da.",
      designerCredit: "Gestaltet von"
    }
  },

  es: {
    langName: "Español",
    dir: "ltr",
    nav: {
      home: "Inicio",
      tours: "Tours",
      about: "Nosotros",
      contact: "Contacto",
      inquiry: "Consulta",
      quickInquiry: "Consulta Rápida"
    },
    hero: {
      badge: "Viajes a Medida en Sri Lanka",
      title: "Planifique su Viaje",
      slogan: "VIAJES PUROS. EXPERIENCIAS SAGRADAS."
    },
    form: {
      cardTitle: "Formulario de Consulta de Viaje",
      intro: "Inspirados en la flor de loto, símbolo de pureza y serenidad, cuéntenos el viaje de sus sueños y lo diseñaremos para usted.",
      switchQuickNotice: "¿Poco tiempo?",
      switchQuickLink: "Use el Formulario Rápido ➔",
      switchDetailedNotice: "¿Desea personalizar todos los detalles?",
      switchDetailedLink: "Formulario Detallado ➔",
      nameLabel: "Nombre Completo",
      namePlaceholder: "ej. Carlos Rodríguez",
      countryLabel: "País de Residencia",
      countryPlaceholder: "Seleccione su país...",
      emailLabel: "Correo Electrónico",
      emailPlaceholder: "nombre@ejemplo.com",
      whatsappLabel: "Número de WhatsApp",
      whatsappPlaceholder: "612 34 56 78",
      whatsappHint: "Facilite su número para recibir actualizaciones rápidas de su itinerario.",
      arrivalLabel: "Fecha de Llegada (a Sri Lanka)",
      departureLabel: "Fecha de Salida (de Sri Lanka)",
      paxLabel: "Número de Pasajeros (Pax)",
      adultsLabel: "Adultos (12+ años)",
      childrenLabel: "Niños (6–12 años)",
      totalPaxBadge: "Total Pasajeros",
      hotelCategoryLabel: "Categoría de Hotel",
      hotelCategoryHint: "Elija uno o más estilos de alojamiento:",
      hotelDropdownToggle: "O use el desplegable por estrellas",
      hotelDropdownPrompt: "Seleccione categoría...",
      hotelBoutique: "Boutique / Villa Colonial",
      hotel5Star: "5 Estrellas de Lujo",
      hotel4Star: "4 Estrellas Superior",
      hotel3Star: "3 Estrellas Estándar",
      hotelBudget: "Ecolodge / Económico",
      roomsLabel: "Habitaciones Necesarias",
      roomsSelect: "Seleccionar habitaciones",
      mealPlanLabel: "Régimen de Comidas",
      mealBB: "Alojamiento y Desayuno (BB)",
      mealHB: "Media Pensión (HB)",
      mealFB: "Pensión Completa (FB)",
      interestsLabel: "Intereses Especiales y Experiencias",
      interestCulture: "Cultura y Patrimonio",
      interestNature: "Naturaleza y Tierras del Té",
      interestArchaeology: "Arqueología y Ciudades Antiguas",
      interestWildlife: "Vida Silvestre y Safaris",
      interestAdventure: "Aventura y Senderismo",
      interestBeach: "Playas y Relax Costero",
      interestShopping: "Compras, Joyas y Especias",
      budgetLabel: "Presupuesto Estimado",
      budgetPlaceholder: "ej. 2.500",
      budgetHint: "Nos ayuda a seleccionar hoteles y actividades adecuadas.",
      otherLabel: "Otros Requerimientos y Deseos",
      otherPlaceholder: "Dietas, chófer privado, aniversarios, templos favoritos...",
      securityLabel: "Verificación de Seguridad",
      securityPrompt: "Confirme que es un viajero real:",
      securitySuccess: "Verificado con éxito ✓",
      submitButton: "Enviar Consulta",
      submitting: "Diseñando su itinerario sagrado...",
      whatsappDirectBtn: "Enviar directo por WhatsApp"
    },
    validation: {
      required: "Este campo es obligatorio.",
      invalidEmail: "Por favor introduzca un correo válido.",
      invalidPhone: "Por favor introduzca un teléfono válido.",
      pastDate: "La fecha de llegada no puede ser en el pasado.",
      departureBeforeArrival: "La fecha de salida debe ser posterior a la de llegada.",
      minPax: "Por favor seleccione al menos 1 pasajero.",
      selectHotel: "Seleccione al menos una categoría de hotel.",
      invalidBudget: "Indique su presupuesto aproximado.",
      securityCheck: "Por favor complete la verificación."
    },
    modal: {
      title: "Consulta Recibida con Serenidad",
      message: "¡Gracias! Nuestros expertos en Sri Lanka le contactarán en un plazo de 24 horas con una propuesta a su medida.",
      refNumber: "Referencia de Consulta",
      whatsappAction: "Chatear en WhatsApp",
      downloadCopy: "Guardar Copia",
      close: "Cerrar"
    },
    footer: {
      aboutTitle: "Lotus Ceylon",
      aboutDesc: "Creando viajes inolvidables y a medida por toda la isla de Sri Lanka desde 2014.",
      quickLinks: "Navegación",
      contactTitle: "Contacto",
      connectTitle: "Códigos QR de Chat",
      connectDesc: "Escanee para hablar de inmediato con nuestros asesores:",
      since: "Dedicados a la excelencia en Sri Lanka desde 2014.",
      designerCredit: "Diseñado por"
    }
  },

  ru: {
    langName: "Русский",
    dir: "ltr",
    nav: {
      home: "Главная",
      tours: "Туры",
      about: "О нас",
      contact: "Контакты",
      inquiry: "Заявка",
      quickInquiry: "Быстрая заявка"
    },
    hero: {
      badge: "Индивидуальные туры по Шри-Ланке",
      title: "Спланируйте Ваше Путешествие",
      slogan: "ЧИСТЫЕ ПУТЕШЕСТВИЯ. СВЯЩЕННЫЙ ОПЫТ."
    },
    form: {
      cardTitle: "Форма Заявки на Тур",
      intro: "Вдохновляясь лотосом — символом чистоты и гармонии, расскажите нам о путешествии вашей мечты, и мы воплотим его в реальность.",
      switchQuickNotice: "Спешите?",
      switchQuickLink: "Быстрая форма заявки ➔",
      switchDetailedNotice: "Нужна детальная настройка тура?",
      switchDetailedLink: "Подробная форма заявки ➔",
      nameLabel: "Ваше Имя и Фамилия",
      namePlaceholder: "напр., Дмитрий Смирнов",
      countryLabel: "Страна проживания",
      countryPlaceholder: "Выберите страну...",
      emailLabel: "Электронная почта",
      emailPlaceholder: "name@example.com",
      whatsappLabel: "Номер WhatsApp",
      whatsappPlaceholder: "900 123 4567",
      whatsappHint: "Укажите действующий номер WhatsApp для оперативной связи.",
      arrivalLabel: "Дата прибытия (в Шри-Ланку)",
      departureLabel: "Дата вылета (из Шри-Ланки)",
      paxLabel: "Количество туристов (Pax)",
      adultsLabel: "Взрослые (12+ лет)",
      childrenLabel: "Дети (6–12 лет)",
      totalPaxBadge: "Всего человек",
      hotelCategoryLabel: "Категория Отелей",
      hotelCategoryHint: "Выберите предпочтительный уровень размещения:",
      hotelDropdownToggle: "Или выберите категорию звёзд из списка",
      hotelDropdownPrompt: "Выберите категорию...",
      hotelBoutique: "Бутик-отели / Исторические виллы",
      hotel5Star: "Премиум 5 Звёзд",
      hotel4Star: "Комфорт 4 Звезды",
      hotel3Star: "Стандарт 3 Звезды",
      hotelBudget: "Бюджетные / Эко-лоджи",
      roomsLabel: "Количество номеров",
      roomsSelect: "Выберите номера",
      mealPlanLabel: "План Питания",
      mealBB: "Завтраки (BB)",
      mealHB: "Полупансион (HB: завтрак + ужин)",
      mealFB: "Полный пансион (FB: 3-разовое)",
      interestsLabel: "Интересы и Впечатления",
      interestCulture: "Культура и Всемирное наследие",
      interestNature: "Природа и чайные плантации",
      interestArchaeology: "Древние города и раскопки",
      interestWildlife: "Сафари и дикая природа",
      interestAdventure: "Треккинг и приключения",
      interestBeach: "Пляжный отдых и океан",
      interestShopping: "Шоппинг, цейлонские сапфиры и специи",
      budgetLabel: "Ориентировочный Бюджет",
      budgetPlaceholder: "напр., 2 500",
      budgetHint: "Помогает нам точно подобрать отели и эксклюзивные экскурсии.",
      otherLabel: "Особые Пожелания и Требования",
      otherPlaceholder: "Диетическое питание, русскоязычный гид, годовщина, храмы...",
      securityLabel: "Проверка безопасности",
      securityPrompt: "Подтвердите, что вы настоящий путешественник:",
      securitySuccess: "Проверка пройдена ✓",
      submitButton: "Отправить Заявку",
      submitting: "Создаем ваш идеальный тур...",
      whatsappDirectBtn: "Отправить в WhatsApp напрямую"
    },
    validation: {
      required: "Это поле обязательно для заполнения.",
      invalidEmail: "Пожалуйста, введите корректный email.",
      invalidPhone: "Пожалуйста, введите корректный номер телефона.",
      pastDate: "Дата прибытия не может быть в прошлом.",
      departureBeforeArrival: "Дата вылета должна быть позже даты прибытия.",
      minPax: "Пожалуйста, выберите как минимум 1 туриста.",
      selectHotel: "Пожалуйста, выберите хотя бы одну категорию отеля.",
      invalidBudget: "Пожалуйста, укажите ориентировочный бюджет.",
      securityCheck: "Пожалуйста, пройдите проверку."
    },
    modal: {
      title: "Заявка успешно принята",
      message: "Благодарим вас! Наши эксперты по Шри-Ланке свяжутся с вами в течение 24 часов с индивидуальной программой.",
      refNumber: "Номер заявки",
      whatsappAction: "Написать в WhatsApp сейчас",
      downloadCopy: "Сохранить копию",
      close: "Закрыть"
    },
    footer: {
      aboutTitle: "Lotus Ceylon",
      aboutDesc: "Создаем авторские незабываемые путешествия по благословенной Шри-Ланке с 2014 года.",
      quickLinks: "Навигация",
      contactTitle: "Контакты",
      connectTitle: "QR-коды для связи",
      connectDesc: "Отсканируйте для прямого общения с нашими специалистами:",
      since: "Безупречный сервис на Шри-Ланке с 2014 года.",
      designerCredit: "Разработано"
    }
  }
};

/**
 * i18n Controller Implementation
 */
class I18nEngine {
  constructor() {
    this.currentLang = localStorage.getItem("lotus_lang") || "en";
    if (!TRANSLATIONS[this.currentLang]) {
      this.currentLang = "en";
    }
  }

  init() {
    this.applyLanguage(this.currentLang);
    this.setupSwitcherListeners();
  }

  setLanguage(langCode) {
    if (TRANSLATIONS[langCode]) {
      this.currentLang = langCode;
      localStorage.setItem("lotus_lang", langCode);
      this.applyLanguage(langCode);
      document.dispatchEvent(new CustomEvent("lotus:langchange", { detail: { lang: langCode } }));
    }
  }

  getCurrentLanguage() {
    return this.currentLang;
  }

  getTranslation(keyPath) {
    const keys = keyPath.split(".");
    let current = TRANSLATIONS[this.currentLang];
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to English
        let fallback = TRANSLATIONS.en;
        for (const fbKey of keys) {
          if (fallback && fallback[fbKey] !== undefined) {
            fallback = fallback[fbKey];
          } else {
            return keyPath;
          }
        }
        return fallback;
      }
    }
    return current;
  }

  applyLanguage(lang) {
    const data = TRANSLATIONS[lang] || TRANSLATIONS.en;
    
    // Set HTML lang and dir attributes (crucial for Arabic RTL)
    document.documentElement.lang = lang;
    document.documentElement.dir = data.dir || "ltr";
    
    if (data.dir === "rtl") {
      document.documentElement.classList.add("is-rtl");
    } else {
      document.documentElement.classList.remove("is-rtl");
    }

    // Translate all elements with data-i18n attribute
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(el => {
      const key = el.getAttribute("data-i18n");
      const translation = this.getTranslation(key);
      if (translation && typeof translation === "string") {
        el.textContent = translation;
      }
    });

    // Translate placeholder attributes
    const placeholderEls = document.querySelectorAll("[data-i18n-placeholder]");
    placeholderEls.forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      const translation = this.getTranslation(key);
      if (translation && typeof translation === "string") {
        el.setAttribute("placeholder", translation);
      }
    });

    // Translate title attributes
    const titleEls = document.querySelectorAll("[data-i18n-title]");
    titleEls.forEach(el => {
      const key = el.getAttribute("data-i18n-title");
      const translation = this.getTranslation(key);
      if (translation && typeof translation === "string") {
        el.setAttribute("title", translation);
      }
    });

    // Update active state in language selector UI
    const langButtons = document.querySelectorAll(".lang-item");
    langButtons.forEach(btn => {
      if (btn.getAttribute("data-lang") === lang) {
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
      } else {
        btn.classList.remove("active");
        btn.setAttribute("aria-selected", "false");
      }
    });

    const currentLangDisplay = document.getElementById("currentLangDisplay");
    if (currentLangDisplay) {
      currentLangDisplay.textContent = lang.toUpperCase();
    }
  }

  setupSwitcherListeners() {
    // Dropdown toggle or click delegates
    document.addEventListener("click", (e) => {
      const target = e.target.closest("[data-lang]");
      if (target) {
        const langCode = target.getAttribute("data-lang");
        this.setLanguage(langCode);
        
        // Close language dropdown if open
        const langDropdown = document.getElementById("langDropdownMenu");
        if (langDropdown) {
          langDropdown.classList.remove("show");
        }
      }
    });

    const langToggleBtn = document.getElementById("langToggleBtn");
    const langDropdown = document.getElementById("langDropdownMenu");
    if (langToggleBtn && langDropdown) {
      langToggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle("show");
      });

      document.addEventListener("click", () => {
        langDropdown.classList.remove("show");
      });
    }
  }
}

// Global instance
window.lotusI18n = new I18nEngine();
