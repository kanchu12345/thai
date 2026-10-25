/**
 * Lotus Ceylon Form Controller
 * Handles validation, date bounds, dynamic pax calculation (max 20),
 * searchable country & dial code pickers with UK aliases, dual submission (Firebase Firestore & Supabase),
 * and WhatsApp concierge hand-off.
 */

document.addEventListener("DOMContentLoaded", () => {
  initFormEngine();
});

function initFormEngine() {
  const form = document.getElementById("inquiryForm");
  if (!form) return;

  const isQuickForm = form.classList.contains("quick-form") || window.location.pathname.includes("inquiry-quick");

  // Populate dynamic elements
  setupCountrySelect();
  setupWhatsAppDialSelect();
  setupDatePickers();
  setupPaxCalculator();
  setupHotelCategoryCards();
  setupResponseTimeDisplay();
  handleUrlPrefill(isQuickForm);

  if (!isQuickForm) {
    setupCurrencySelect();
    setupCharacterCounter();
  }
  setupHumanVerification();

  // Real-time validation listeners
  setupLiveValidation(form);

  // Form submission handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleFormSubmit(form, isQuickForm);
  });
}

/**
 * Display editable response commitment note
 */
function setupResponseTimeDisplay() {
  const hours = (window.LOTUS_CONFIG && window.LOTUS_CONFIG.responseTimeHours) ? window.LOTUS_CONFIG.responseTimeHours : 2;
  const text = `We reply within ${hours} hours, Sri Lanka time (GMT+5:30)`;
  
  const el = document.getElementById("responseTimeNote");
  if (el) el.textContent = text;

  const modalMsg = document.getElementById("modalResponseTimeMsg");
  if (modalMsg) {
    modalMsg.textContent = `Thank you! Our dedicated Sri Lanka travel specialists will contact you within ${hours} hours, Sri Lanka time (GMT+5:30) with a bespoke itinerary.`;
  }
}

/**
 * Handle URL Search Parameters (e.g. ?package=, ?category=, ?style=, ?duration=, ?month=, ?offer=)
 */
function handleUrlPrefill(isQuickForm) {
  const urlParams = new URLSearchParams(window.location.search);
  const pkg = urlParams.get("package");
  const cat = urlParams.get("category");
  const style = urlParams.get("style");
  const duration = urlParams.get("duration");
  const month = urlParams.get("month");
  const offer = urlParams.get("offer");

  const otherReq = document.getElementById("otherRequirements");
  if (otherReq && (pkg || cat || style || duration || month || offer)) {
    const prefillNote = [];
    if (pkg) prefillNote.push(`Interested in Package: ${pkg}`);
    if (cat) prefillNote.push(`Tour Theme / Category: ${cat}`);
    if (offer) prefillNote.push(`Special Offer / Promotion: ${offer}`);
    if (style && style !== "All") prefillNote.push(`Preferred Style: ${style}`);
    if (duration) prefillNote.push(`Target Duration: ${duration}`);
    if (month && month !== "Flexible") prefillNote.push(`Estimated Season: ${month}`);

    if (prefillNote.length > 0) {
      const current = otherReq.value.trim();
      otherReq.value = (current ? current + "\n\n" : "") + `[Inquiry Context]\n` + prefillNote.join("\n") + "\n";
      const counter = document.getElementById("charCountDisplay");
      if (counter) counter.textContent = `${otherReq.value.length} / 1000`;
    }
  }

  // Pre-check interests if category, style or offer matches
  const matchTerm = cat || style || offer;
  if (matchTerm) {
    const interestCbs = document.querySelectorAll('input[name="interests"]');
    interestCbs.forEach((cb) => {
      const termLower = matchTerm.toLowerCase();
      const valLower = cb.value.toLowerCase();
      if (
        (termLower.includes("beach") && valLower.includes("beach")) ||
        (termLower.includes("cultur") && valLower.includes("cultur")) ||
        (termLower.includes("wildlife") && valLower.includes("wildlife")) ||
        (termLower.includes("adventure") && valLower.includes("adventure")) ||
        (termLower.includes("nature") && valLower.includes("nature"))
      ) {
        cb.checked = true;
      }
    });
  }
}

/**
 * 1. Searchable Country Picker with UK & aliases support
 */
function setupCountrySelect() {
  const wrapper = document.getElementById("countryPickerWrapper");
  const input = document.getElementById("countrySearchInput");
  const hiddenInput = document.getElementById("selectedCountry");
  const list = document.getElementById("countryOptionsList");
  if (!wrapper || !input || !hiddenInput || !list || typeof COUNTRIES_DATA === "undefined") return;

  function renderOptions(filter = "") {
    list.innerHTML = "";
    const filterLower = filter.toLowerCase().trim();
    const filtered = COUNTRIES_DATA.filter(c => {
      if (c.name.toLowerCase().includes(filterLower)) return true;
      if (c.code.toLowerCase().includes(filterLower)) return true;
      if (filterLower === "uk" && c.code === "GB") return true;
      if (c.aliases && c.aliases.some(a => a.toLowerCase().includes(filterLower))) return true;
      return false;
    });

    if (filtered.length === 0) {
      const emptyItem = document.createElement("li");
      emptyItem.className = "picker-option no-results";
      emptyItem.textContent = "No matching countries found";
      list.appendChild(emptyItem);
      return;
    }

    filtered.forEach(c => {
      const li = document.createElement("li");
      li.className = "picker-option";
      li.setAttribute("role", "option");
      li.setAttribute("data-value", c.name);
      li.setAttribute("data-code", c.code);
      li.setAttribute("data-dial", c.dial_code);
      li.innerHTML = `
        <span class="country-flag">${c.flag}</span>
        <span class="country-name">${c.name}</span>
        <span class="country-dial">${c.dial_code}</span>
      `;

      li.addEventListener("click", () => {
        selectCountry(c);
      });

      list.appendChild(li);
    });
  }

  function selectCountry(country) {
    hiddenInput.value = country.name;
    input.value = `${country.flag} ${country.name}`;
    wrapper.classList.remove("open");
    input.setAttribute("aria-expanded", "false");
    
    // Auto-sync WhatsApp dial code if not customized
    const dialInput = document.getElementById("whatsappDialCode");
    const dialDisplay = document.getElementById("whatsappDialDisplay");
    if (dialInput && dialDisplay && (!dialInput.value || dialInput.dataset.userTouched !== "true")) {
      dialInput.value = country.dial_code;
      dialDisplay.innerHTML = `<span class="flag-icon">${country.flag}</span> <span class="dial-num">${country.dial_code}</span>`;
    }

    validateField(hiddenInput);
  }

  input.addEventListener("focus", () => {
    wrapper.classList.add("open");
    input.setAttribute("aria-expanded", "true");
    renderOptions("");
  });

  input.addEventListener("input", (e) => {
    wrapper.classList.add("open");
    renderOptions(e.target.value);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      wrapper.classList.remove("open");
      input.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("click", (e) => {
    if (!wrapper.contains(e.target)) {
      wrapper.classList.remove("open");
      input.setAttribute("aria-expanded", "false");
      if (!hiddenInput.value && input.value) {
        input.value = "";
      }
    }
  });

  renderOptions();
}

/**
 * 2. WhatsApp Dial Code Picker
 */
function setupWhatsAppDialSelect() {
  const wrapper = document.getElementById("dialPickerWrapper");
  const button = document.getElementById("dialPickerBtn");
  const display = document.getElementById("whatsappDialDisplay");
  const hiddenInput = document.getElementById("whatsappDialCode");
  const list = document.getElementById("dialOptionsList");
  const searchInput = document.getElementById("dialSearchInput");
  if (!wrapper || !button || !display || !hiddenInput || !list || typeof COUNTRIES_DATA === "undefined") return;

  function renderDialOptions(filter = "") {
    list.innerHTML = "";
    const filterLower = filter.toLowerCase().trim();
    const filtered = COUNTRIES_DATA.filter(c => 
      c.name.toLowerCase().includes(filterLower) || 
      c.dial_code.includes(filterLower) ||
      c.code.toLowerCase().includes(filterLower) ||
      (filterLower === "uk" && c.code === "GB")
    );

    filtered.forEach(c => {
      const li = document.createElement("li");
      li.className = "picker-option";
      li.innerHTML = `
        <span class="country-flag">${c.flag}</span>
        <span class="country-name">${c.name}</span>
        <span class="country-dial">${c.dial_code}</span>
      `;
      li.addEventListener("click", () => {
        hiddenInput.value = c.dial_code;
        hiddenInput.dataset.userTouched = "true";
        display.innerHTML = `<span class="flag-icon">${c.flag}</span> <span class="dial-num">${c.dial_code}</span>`;
        wrapper.classList.remove("open");
      });
      list.appendChild(li);
    });
  }

  button.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    wrapper.classList.toggle("open");
    if (wrapper.classList.contains("open") && searchInput) {
      searchInput.value = "";
      renderDialOptions("");
      setTimeout(() => searchInput.focus(), 50);
    }
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderDialOptions(e.target.value);
    });
  }

  document.addEventListener("click", (e) => {
    if (!wrapper.contains(e.target)) {
      wrapper.classList.remove("open");
    }
  });

  // Default to Sri Lanka (+94)
  const defaultCountry = COUNTRIES_DATA.find(c => c.code === "LK") || COUNTRIES_DATA[0];
  hiddenInput.value = defaultCountry.dial_code;
  display.innerHTML = `<span class="flag-icon">${defaultCountry.flag}</span> <span class="dial-num">${defaultCountry.dial_code}</span>`;
  renderDialOptions();
}

/**
 * 3. Arrival and Departure Date Pickers (Dynamic bounds)
 */
function setupDatePickers() {
  const arrivalInput = document.getElementById("arrivalDate");
  const departureInput = document.getElementById("departureDate");
  if (!arrivalInput || !departureInput) return;

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const minDateStr = `${yyyy}-${mm}-${dd}`;

  arrivalInput.setAttribute("min", minDateStr);

  arrivalInput.addEventListener("change", () => {
    if (arrivalInput.value) {
      const arrivalDate = new Date(arrivalInput.value);
      const nextDay = new Date(arrivalDate);
      nextDay.setDate(nextDay.getDate() + 1);
      
      const dYyyy = nextDay.getFullYear();
      const dMm = String(nextDay.getMonth() + 1).padStart(2, "0");
      const dDd = String(nextDay.getDate()).padStart(2, "0");
      const minDepartureStr = `${dYyyy}-${dMm}-${dDd}`;

      departureInput.setAttribute("min", minDepartureStr);

      if (departureInput.value && new Date(departureInput.value) <= arrivalDate) {
        departureInput.value = minDepartureStr;
      }
    }
    validateField(arrivalInput);
    validateField(departureInput);
  });

  departureInput.addEventListener("change", () => {
    validateField(departureInput);
  });
}

/**
 * 4. Number of Pax Auto-Calculator (Max 20 total)
 */
function setupPaxCalculator() {
  const adultsSelect = document.getElementById("adultsPax");
  const childrenSelect = document.getElementById("childrenPax");
  const totalDisplay = document.getElementById("totalPaxCount");
  const hiddenTotalInput = document.getElementById("totalPax");
  const paxWarning = document.getElementById("paxMaxWarning");

  if (!adultsSelect || !childrenSelect || !totalDisplay) return;

  function calculatePax() {
    const adults = parseInt(adultsSelect.value, 10) || 0;
    const children = parseInt(childrenSelect.value, 10) || 0;
    const total = adults + children;

    totalDisplay.textContent = total;
    if (hiddenTotalInput) {
      hiddenTotalInput.value = total;
    }

    const paxSummary = document.getElementById("paxSummaryText");
    if (paxSummary) {
      const adultLabel = adults === 1 ? "1 Adult" : `${adults} Adults`;
      const childLabel = children === 0 ? "No Children" : children === 1 ? "1 Child" : `${children} Children`;
      paxSummary.textContent = `(${adultLabel}, ${childLabel})`;
    }

    if (total > 20) {
      if (paxWarning) {
        paxWarning.textContent = "Maximum online booking is 20 pax. For larger groups, please chat directly with our concierge via WhatsApp.";
        paxWarning.style.display = "block";
      }
      totalDisplay.style.color = "#DC2626";
    } else {
      if (paxWarning) {
        paxWarning.textContent = "";
        paxWarning.style.display = "none";
      }
      totalDisplay.style.color = "";
    }
  }

  adultsSelect.addEventListener("change", calculatePax);
  childrenSelect.addEventListener("change", calculatePax);
  calculatePax();
}

/**
 * 5. Hotel Category Selectable Cards & Star Dropdown Sync
 */
function setupHotelCategoryCards() {
  const checkboxes = document.querySelectorAll('input[name="hotelCategory"]');
  const starDropdown = document.getElementById("hotelStarDropdown");

  checkboxes.forEach(cb => {
    cb.addEventListener("change", () => {
      const card = cb.closest(".selectable-card");
      if (card) {
        if (cb.checked) {
          card.classList.add("selected");
        } else {
          card.classList.remove("selected");
        }
      }
      validateHotelCategory();
    });
  });

  if (starDropdown) {
    starDropdown.addEventListener("change", () => {
      const val = starDropdown.value;
      if (!val) return;

      checkboxes.forEach(cb => {
        const card = cb.closest(".selectable-card");
        if (cb.value === val) {
          cb.checked = true;
          if (card) card.classList.add("selected");
        }
      });
      validateHotelCategory();
    });
  }
}

function validateHotelCategory() {
  const checkboxes = document.querySelectorAll('input[name="hotelCategory"]:checked');
  const errorEl = document.getElementById("hotelCategoryError");
  if (!errorEl) return true;

  if (checkboxes.length === 0) {
    const msg = window.lotusI18n ? window.lotusI18n.getTranslation("validation.selectHotel") : "Please choose at least one hotel category.";
    errorEl.textContent = msg;
    errorEl.style.display = "block";
    return false;
  } else {
    errorEl.textContent = "";
    errorEl.style.display = "none";
    return true;
  }
}

/**
 * 6. Currency Selector
 */
function setupCurrencySelect() {
  const select = document.getElementById("budgetCurrency");
  if (!select || !window.LOTUS_CONFIG || !window.LOTUS_CONFIG.currencies) return;

  select.innerHTML = "";
  window.LOTUS_CONFIG.currencies.forEach(curr => {
    const option = document.createElement("option");
    option.value = curr.code;
    option.textContent = `${curr.code} (${curr.symbol})`;
    if (curr.code === "USD") {
      option.selected = true;
    }
    select.appendChild(option);
  });
}

/**
 * 7. Character counter for Other Requirements
 */
function setupCharacterCounter() {
  const textarea = document.getElementById("otherRequirements");
  const counter = document.getElementById("charCountDisplay");
  if (!textarea || !counter) return;

  textarea.addEventListener("input", () => {
    counter.textContent = `${textarea.value.length} / 1000`;
  });
}

/**
 * 8. Human Verification / Security Check
 */
function setupHumanVerification() {
  const check = document.getElementById("humanCheck");
  const badge = document.getElementById("humanCheckStatus");
  if (!check || !badge) return;

  check.addEventListener("change", () => {
    if (check.checked) {
      badge.textContent = window.lotusI18n ? window.lotusI18n.getTranslation("form.securitySuccess") : "Verified traveler ✓";
      badge.className = "security-badge verified";
    } else {
      badge.textContent = "";
      badge.className = "security-badge";
    }
    const errorEl = document.getElementById("humanCheckError");
    if (errorEl) errorEl.style.display = "none";
  });
}

/**
 * 9. Live Field Validation
 */
function setupLiveValidation(form) {
  const fields = form.querySelectorAll("input, select, textarea");
  fields.forEach(field => {
    field.addEventListener("blur", () => {
      validateField(field);
    });

    field.addEventListener("input", () => {
      const errorEl = document.getElementById(`${field.id}Error`);
      if (errorEl && errorEl.style.display === "block") {
        validateField(field);
      }
    });
  });
}

function validateField(field) {
  if (!field) return true;
  const id = field.id;
  const errorEl = document.getElementById(`${id}Error`);
  if (!errorEl) return true;

  let isValid = true;
  let errorMsg = "";

  const i18n = window.lotusI18n;
  const reqMsg = i18n ? i18n.getTranslation("validation.required") : "This field is required.";

  // Name
  if (id === "fullName") {
    if (!field.value.trim()) {
      isValid = false;
      errorMsg = reqMsg;
    } else if (field.value.trim().length < 2) {
      isValid = false;
      errorMsg = "Please enter your full name (at least 2 letters).";
    }
  }

  // Country
  if (id === "selectedCountry") {
    if (!field.value.trim()) {
      isValid = false;
      errorMsg = reqMsg;
    }
  }

  // Email
  if (id === "emailAddress") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!field.value.trim()) {
      isValid = false;
      errorMsg = reqMsg;
    } else if (!emailRegex.test(field.value.trim())) {
      isValid = false;
      errorMsg = i18n ? i18n.getTranslation("validation.invalidEmail") : "Please enter a valid email address.";
    }
  }

  // WhatsApp number
  if (id === "whatsappNumber") {
    const rawNum = field.value.replace(/[^0-9]/g, "");
    if (!field.value.trim()) {
      isValid = false;
      errorMsg = reqMsg;
    } else if (rawNum.length < 6 || rawNum.length > 15) {
      isValid = false;
      errorMsg = i18n ? i18n.getTranslation("validation.invalidPhone") : "Please enter a valid phone number (6–15 digits).";
    }
  }

  // Arrival Date
  if (id === "arrivalDate") {
    if (!field.value) {
      isValid = false;
      errorMsg = reqMsg;
    } else {
      const selected = new Date(field.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        isValid = false;
        errorMsg = i18n ? i18n.getTranslation("validation.pastDate") : "Arrival date cannot be in the past.";
      }
    }
  }

  // Departure Date
  if (id === "departureDate") {
    const arrivalVal = document.getElementById("arrivalDate") ? document.getElementById("arrivalDate").value : null;
    if (!field.value) {
      isValid = false;
      errorMsg = reqMsg;
    } else if (arrivalVal) {
      const arrival = new Date(arrivalVal);
      const departure = new Date(field.value);
      if (departure <= arrival) {
        isValid = false;
        errorMsg = i18n ? i18n.getTranslation("validation.departureBeforeArrival") : "Departure date must be after arrival date.";
      }
    }
  }

  // Targeted Budget: OPTIONAL per wireframe
  if (id === "packageBudget") {
    if (field.value.trim() !== "") {
      const cleaned = field.value.replace(/,/g, "").trim();
      if (isNaN(cleaned) || Number(cleaned) <= 0) {
        isValid = false;
        errorMsg = i18n ? i18n.getTranslation("validation.invalidBudget") : "Please enter a valid numeric budget amount.";
      }
    }
  }

  // Privacy Consent
  if (id === "privacyConsent") {
    if (!field.checked) {
      isValid = false;
      errorMsg = "Please consent to the processing of your inquiry details to continue.";
    }
  }

  if (!isValid) {
    errorEl.textContent = errorMsg;
    errorEl.style.display = "block";
    field.classList.add("input-error");
    field.setAttribute("aria-invalid", "true");
  } else {
    errorEl.textContent = "";
    errorEl.style.display = "none";
    field.classList.remove("input-error");
    field.setAttribute("aria-invalid", "false");
  }

  return isValid;
}

/**
 * 10. Submission Handler
 */
async function handleFormSubmit(form, isQuickForm) {
  // Honeypot spam check
  const honeypot = document.getElementById("hp_website_lotus");
  if (honeypot && honeypot.value.trim() !== "") {
    console.warn("Bot submission neutralized by honeypot.");
    showThankYouModal({ fullName: "Traveler", referenceId: "LC-" + Math.floor(100000 + Math.random() * 900000) });
    return;
  }

  // Human verification check
  const humanCheck = document.getElementById("humanCheck");
  const humanCheckError = document.getElementById("humanCheckError");
  if (humanCheck && !humanCheck.checked) {
    if (humanCheckError) {
      const msg = window.lotusI18n ? window.lotusI18n.getTranslation("validation.securityCheck") : "Please complete the verification check.";
      humanCheckError.textContent = msg;
      humanCheckError.style.display = "block";
    }
    humanCheck.focus();
    return;
  }

  // Privacy consent check
  const privacyConsent = document.getElementById("privacyConsent");
  if (privacyConsent && !validateField(privacyConsent)) {
    privacyConsent.focus();
    return;
  }

  // Total pax check (max 20)
  const totalPaxInput = document.getElementById("totalPax");
  if (totalPaxInput && parseInt(totalPaxInput.value, 10) > 20) {
    alert("Maximum group size for direct online inquiries is 20 guests. For larger groups, please contact our concierge directly via WhatsApp (+94 71 54 22 384).");
    return;
  }

  // Validate all required fields
  let isAllValid = true;
  const requiredInputs = form.querySelectorAll("input[required], select[required]");
  requiredInputs.forEach(input => {
    if (!validateField(input)) {
      isAllValid = false;
    }
  });

  // Country hidden input check
  const selectedCountry = document.getElementById("selectedCountry");
  if (selectedCountry && !validateField(selectedCountry)) {
    isAllValid = false;
    const searchInput = document.getElementById("countrySearchInput");
    if (searchInput) searchInput.classList.add("input-error");
  }

  // Hotel Category check
  if (!validateHotelCategory()) {
    isAllValid = false;
  }

  if (!isAllValid) {
    const firstError = form.querySelector(".input-error, .error-message[style*='block']");
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return;
  }

  // Client-side rate limiting (10s cooldown, max 3 inquiries per 10 mins)
  const now = Date.now();
  const lastSubTime = parseInt(localStorage.getItem('lotus_last_sub_time') || '0', 10);
  if (now - lastSubTime < 10000) {
    alert("Please wait a few seconds before submitting another inquiry.");
    return;
  }

  let subTimestamps = [];
  try {
    subTimestamps = JSON.parse(localStorage.getItem('lotus_sub_history') || '[]');
  } catch (e) { subTimestamps = []; }

  subTimestamps = subTimestamps.filter(ts => (now - ts) < 600000);
  if (subTimestamps.length >= 3) {
    alert("You have reached the maximum number of inquiries allowed in 10 minutes. Please connect directly via WhatsApp: +94 71 54 22 384");
    return;
  }

  // Collect form data
  const formData = extractFormData(form, isQuickForm);

  // Set loading state on submit button
  const submitBtn = document.getElementById("submitInquiryBtn");
  const originalBtnHtml = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.classList.add("loading");
  submitBtn.innerHTML = `
    <span class="spinner-lotus" aria-hidden="true"></span>
    <span data-i18n="form.submitting">${window.lotusI18n ? window.lotusI18n.getTranslation("form.submitting") : "Preparing your bespoke journey..."}</span>
  `;

  try {
    await submitToService(formData);

    saveInquiryLocally(formData);

    subTimestamps.push(now);
    localStorage.setItem('lotus_sub_history', JSON.stringify(subTimestamps));
    localStorage.setItem('lotus_last_sub_time', now.toString());

    showThankYouModal(formData);

    form.reset();
    document.querySelectorAll(".selectable-card.selected").forEach(card => card.classList.remove("selected"));
    const countrySearch = document.getElementById("countrySearchInput");
    if (countrySearch) countrySearch.value = "";
    const selectedCountryInput = document.getElementById("selectedCountry");
    if (selectedCountryInput) selectedCountryInput.value = "";
    setupPaxCalculator();

  } catch (error) {
    console.error("Submission error, saving offline copy:", error);
    saveInquiryLocally(formData);
    showThankYouModal(formData);
  } finally {
    submitBtn.disabled = false;
    submitBtn.classList.remove("loading");
    submitBtn.innerHTML = originalBtnHtml;
  }
}

/**
 * Extract Form Data Object
 */
function extractFormData(form, isQuickForm) {
  const refId = "LC-" + new Date().getFullYear() + "-" + Math.floor(100000 + Math.random() * 900000);
  
  const hotelCategories = [];
  form.querySelectorAll('input[name="hotelCategory"]:checked').forEach(cb => {
    hotelCategories.push(cb.value);
  });

  const mealPlans = [];
  form.querySelectorAll('input[name="mealPlan"]:checked').forEach(cb => {
    mealPlans.push(cb.value);
  });

  const interests = [];
  form.querySelectorAll('input[name="interests"]:checked').forEach(cb => {
    interests.push(cb.value);
  });

  const dialCode = document.getElementById("whatsappDialCode") ? document.getElementById("whatsappDialCode").value : "+94";
  const rawPhone = document.getElementById("whatsappNumber") ? document.getElementById("whatsappNumber").value.trim() : "";
  const fullWhatsApp = rawPhone ? `${dialCode} ${rawPhone}` : "";

  return {
    referenceId: refId,
    timestamp: new Date().toISOString(),
    isQuickForm: isQuickForm,
    formType: isQuickForm ? 'quick' : 'detailed',
    fullName: form.querySelector("#fullName") ? form.querySelector("#fullName").value.trim() : "",
    country: form.querySelector("#selectedCountry") ? form.querySelector("#selectedCountry").value.trim() : "",
    emailAddress: form.querySelector("#emailAddress") ? form.querySelector("#emailAddress").value.trim() : "",
    whatsapp: fullWhatsApp,
    arrivalDate: form.querySelector("#arrivalDate") ? form.querySelector("#arrivalDate").value : "",
    departureDate: form.querySelector("#departureDate") ? form.querySelector("#departureDate").value : "",
    adults: form.querySelector("#adultsPax") ? form.querySelector("#adultsPax").value : "2",
    children: form.querySelector("#childrenPax") ? form.querySelector("#childrenPax").value : "0",
    totalPax: form.querySelector("#totalPax") ? form.querySelector("#totalPax").value : "2",
    hotelCategory: hotelCategories.join(", "),
    roomsRequired: form.querySelector("#roomsRequired") ? form.querySelector("#roomsRequired").value : "1",
    mealPlan: mealPlans.join(", ") || (isQuickForm ? "" : "BB"),
    interests: interests.join(", ") || (isQuickForm ? "" : "Culture & Heritage"),
    currency: form.querySelector("#budgetCurrency") ? form.querySelector("#budgetCurrency").value : "USD",
    packageBudget: form.querySelector("#packageBudget") && form.querySelector("#packageBudget").value.trim() ? form.querySelector("#packageBudget").value.trim() : "Custom",
    otherRequirements: form.querySelector("#otherRequirements") ? form.querySelector("#otherRequirements").value.trim() : ""
  };
}

/**
 * Submit to backend (Firebase Firestore collections: inquiries_quick / inquiries_detailed)
 */
async function submitToService(data) {
  // 1. Firebase Firestore dual collection submission (Option B)
  if (window.LotusFirebase && typeof window.LotusFirebase.submitInquiry === "function") {
    try {
      const res = await window.LotusFirebase.submitInquiry(data, data.isQuickForm);
      if (res && res.id) {
        data.firestoreDocId = res.id;
      }
    } catch (e) {
      console.warn("[Lotus CMS] Firebase Firestore insert notice:", e.message);
    }
  }

  // 2. Secondary Supabase Inquiries Table Insert (backward compatibility)
  if (window.LotusSupabase && typeof window.LotusSupabase.submitInquiry === "function") {
    try {
      const supaPayload = {
        reference_no: data.referenceId,
        full_name: data.fullName,
        email: data.emailAddress,
        phone: data.whatsapp,
        country: data.country,
        travel_dates: `${data.arrivalDate || ''} to ${data.departureDate || ''}`,
        travelers_count: parseInt(data.totalPax) || 2,
        package_type: data.interests || (data.isQuickForm ? 'Quick Inquiry' : 'Custom Tour Inquiry'),
        budget_range: data.packageBudget !== "Custom" ? `${data.currency || 'USD'} ${data.packageBudget}` : 'Custom',
        special_notes: `Hotels: ${data.hotelCategory || 'N/A'}\nRooms: ${data.roomsRequired || '1'}\nMeal Plan: ${data.mealPlan || 'N/A'}\nNotes: ${data.otherRequirements || ''}`
      };
      await window.LotusSupabase.submitInquiry(supaPayload);
    } catch (e) {
      console.warn("[Lotus CMS] Supabase backup notice:", e.message);
    }
  }

  return new Promise((resolve) => setTimeout(resolve, 500));
}

/**
 * Save inquiry in localStorage (acts as client-side backup)
 */
function saveInquiryLocally(data) {
  try {
    const existing = JSON.parse(localStorage.getItem("lotus_inquiries") || "[]");
    existing.unshift(data);
    localStorage.setItem("lotus_inquiries", JSON.stringify(existing.slice(0, 50)));
  } catch (e) {
    console.warn("localStorage quota exceeded or unavailable:", e);
  }
}

/**
 * 11. Thank-You Modal & WhatsApp Message Generator
 */
function showThankYouModal(data) {
  const modal = document.getElementById("thankYouModal");
  if (!modal) return;

  const refDisplay = document.getElementById("modalRefId");
  if (refDisplay) refDisplay.textContent = data.referenceId;

  // Build WhatsApp pre-filled message
  const waBtn = document.getElementById("modalWhatsAppBtn");
  if (waBtn) {
    const msg = formatWhatsAppMessage(data);
    const encoded = encodeURIComponent(msg);
    waBtn.href = `https://wa.me/94715422384?text=${encoded}`;
  }

  // Populate preview summary list
  const summaryList = document.getElementById("modalSummaryList");
  if (summaryList) {
    summaryList.innerHTML = `
      <li><strong>Dates:</strong> ${data.arrivalDate || 'TBD'} to ${data.departureDate || 'TBD'}</li>
      <li><strong>Travelers:</strong> ${data.totalPax || '2'} Pax (${data.adults || '2'} Adults, ${data.children || '0'} Children)</li>
      <li><strong>Hotels:</strong> ${data.hotelCategory || 'Not selected'}</li>
      ${!data.isQuickForm && data.packageBudget !== 'Custom' ? `<li><strong>Budget:</strong> ${data.currency} ${data.packageBudget}</li>` : ''}
    `;
  }

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  const closeBtns = modal.querySelectorAll("[data-close-modal]");
  closeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      closeThankYouModal(modal);
    });
  });

  const saveBtn = document.getElementById("modalDownloadBtn");
  if (saveBtn) {
    saveBtn.onclick = () => {
      window.print();
    };
  }
}

function closeThankYouModal(modal) {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

/**
 * Format Human-Readable WhatsApp Inquiry Message
 */
function formatWhatsAppMessage(data) {
  return `🌺 *LOTUS CEYLON - NEW TOUR INQUIRY*
━━━━━━━━━━━━━━━━━━━━
📌 *Reference:* ${data.referenceId}
👤 *Name:* ${data.fullName}
🌍 *Country:* ${data.country}
✉️ *Email:* ${data.emailAddress}
📱 *WhatsApp:* ${data.whatsapp}
━━━━━━━━━━━━━━━━━━━━
✈️ *Arrival Date:* ${data.arrivalDate}
🛫 *Departure Date:* ${data.departureDate}
👥 *Total Pax:* ${data.totalPax} (${data.adults} Adults, ${data.children} Children)
🏨 *Hotel Preferences:* ${data.hotelCategory}
${data.roomsRequired ? `🛏️ *Rooms Required:* ${data.roomsRequired}\n` : ''}${data.mealPlan ? `🍽️ *Meal Plan:* ${data.mealPlan}\n` : ''}${data.interests ? `🎯 *Interests:* ${data.interests}\n` : ''}${data.packageBudget && data.packageBudget !== 'Custom' ? `💰 *Budget:* ${data.currency} ${data.packageBudget}\n` : ''}━━━━━━━━━━━━━━━━━━━━
📝 *Other Requirements:*
${data.otherRequirements || 'None specified.'}
━━━━━━━━━━━━━━━━━━━━
_Submitted via Lotus Ceylon Official Website_`;
}
