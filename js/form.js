/**
 * Lotus Ceylon Form Controller
 * Handles validation, date bounds, dynamic pax calculation,
 * searchable country & dial code pickers, submission & WhatsApp integration.
 */

document.addEventListener("DOMContentLoaded", () => {
  initFormEngine();
});

function initFormEngine() {
  const form = document.getElementById("inquiryForm");
  if (!form) return;

  const isQuickForm = form.classList.contains("quick-form");

  // Populate dynamic elements
  setupCountrySelect();
  setupWhatsAppDialSelect();
  setupDatePickers();
  setupPaxCalculator();
  setupHotelCategoryCards();
  if (!isQuickForm) {
    setupCurrencySelect();
    setupCharacterCounter();
    handleUrlPrefill();
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
 * Handle URL Search Parameters (e.g. from Home Page Tour Packages or Trip Finder)
 */
function handleUrlPrefill() {
  const urlParams = new URLSearchParams(window.location.search);
  const pkg = urlParams.get("package");
  const style = urlParams.get("style");
  const duration = urlParams.get("duration");
  const month = urlParams.get("month");

  const otherReq = document.getElementById("otherRequirements");
  if (otherReq && (pkg || style || duration || month)) {
    const prefillNote = [];
    if (pkg) prefillNote.push(`Interested in Package: ${pkg}`);
    if (style && style !== "All") prefillNote.push(`Preferred Style: ${style}`);
    if (duration) prefillNote.push(`Target Duration: ${duration}`);
    if (month && month !== "Flexible") prefillNote.push(`Estimated Season: ${month}`);

    if (prefillNote.length > 0) {
      const current = otherReq.value.trim();
      otherReq.value = (current ? current + "\n\n" : "") + `[Inquiry Context from Home Page]\n` + prefillNote.join("\n") + "\n";
      const counter = document.getElementById("charCountDisplay");
      if (counter) counter.textContent = `${otherReq.value.length} / 1000`;
    }
  }

  // Pre-check interests if style matches
  if (style) {
    const interestCbs = document.querySelectorAll('input[name="interests"]');
    interestCbs.forEach(cb => {
      if (style.includes("Cultural") && cb.value.includes("Culture")) cb.checked = true;
      if (style.includes("Wildlife") && cb.value.includes("Wildlife")) cb.checked = true;
      if (style.includes("Hill") && cb.value.includes("Nature")) cb.checked = true;
      if (style.includes("Romantic") && cb.value.includes("Beach")) cb.checked = true;
    });
  }
}

/**
 * 1. Searchable Country Picker
 */
function setupCountrySelect() {
  const wrapper = document.getElementById("countryPickerWrapper");
  const input = document.getElementById("countrySearchInput");
  const hiddenInput = document.getElementById("selectedCountry");
  const list = document.getElementById("countryOptionsList");
  if (!wrapper || !input || !hiddenInput || !list) return;

  // Render options
  function renderOptions(filter = "") {
    list.innerHTML = "";
    const filterLower = filter.toLowerCase().trim();
    const filtered = COUNTRIES_DATA.filter(c => 
      c.name.toLowerCase().includes(filterLower) || c.code.toLowerCase().includes(filterLower)
    );

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
    
    // Auto-sync WhatsApp dial code if dial code is empty or default
    const dialInput = document.getElementById("whatsappDialCode");
    const dialDisplay = document.getElementById("whatsappDialDisplay");
    if (dialInput && dialDisplay && (!dialInput.value || dialInput.dataset.userTouched !== "true")) {
      dialInput.value = country.dial_code;
      dialDisplay.innerHTML = `<span class="flag-icon">${country.flag}</span> <span class="dial-num">${country.dial_code}</span>`;
    }

    // Trigger validation
    validateField(hiddenInput);
  }

  // Toggle list on input click/focus
  input.addEventListener("focus", () => {
    wrapper.classList.add("open");
    input.setAttribute("aria-expanded", "true");
    renderOptions("");
  });

  input.addEventListener("input", (e) => {
    wrapper.classList.add("open");
    renderOptions(e.target.value);
  });

  // Keyboard navigation
  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      wrapper.classList.remove("open");
    }
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!wrapper.contains(e.target)) {
      wrapper.classList.remove("open");
      input.setAttribute("aria-expanded", "false");
      // If user typed something but didn't pick from list, restore or check
      if (!hiddenInput.value && input.value) {
        input.value = "";
      }
    }
  });

  // Initial render
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
  if (!wrapper || !button || !display || !hiddenInput || !list) return;

  function renderDialOptions(filter = "") {
    list.innerHTML = "";
    const filterLower = filter.toLowerCase().trim();
    const filtered = COUNTRIES_DATA.filter(c => 
      c.name.toLowerCase().includes(filterLower) || 
      c.dial_code.includes(filterLower) ||
      c.code.toLowerCase().includes(filterLower)
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

  // Set today as minimum arrival date (cannot be in the past)
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const minDateStr = `${yyyy}-${mm}-${dd}`;

  arrivalInput.setAttribute("min", minDateStr);

  arrivalInput.addEventListener("change", () => {
    if (arrivalInput.value) {
      // Calculate next day as minimum departure date
      const arrivalDate = new Date(arrivalInput.value);
      const nextDay = new Date(arrivalDate);
      nextDay.setDate(nextDay.getDate() + 1);
      
      const dYyyy = nextDay.getFullYear();
      const dMm = String(nextDay.getMonth() + 1).padStart(2, "0");
      const dDd = String(nextDay.getDate()).padStart(2, "0");
      const minDepartureStr = `${dYyyy}-${dMm}-${dDd}`;

      departureInput.setAttribute("min", minDepartureStr);

      // If departure is already chosen and is before or equal to arrival, reset or increment
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
 * 4. Number of Pax Auto-Calculator
 */
function setupPaxCalculator() {
  const adultsSelect = document.getElementById("adultsPax");
  const childrenSelect = document.getElementById("childrenPax");
  const totalDisplay = document.getElementById("totalPaxCount");
  const hiddenTotalInput = document.getElementById("totalPax");

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
  }

  adultsSelect.addEventListener("change", calculatePax);
  childrenSelect.addEventListener("change", calculatePax);
  calculatePax();
}

/**
 * 5. Hotel Category Selectable Cards & Optional Star Dropdown Sync
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

  // If user prefers the star-rating dropdown, sync it with checkboxes
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
  if (!select || !LOTUS_CONFIG.currencies) return;

  select.innerHTML = "";
  LOTUS_CONFIG.currencies.forEach(curr => {
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
      // Clear error immediately when typing
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
      errorMsg = i18n ? i18n.getTranslation("validation.invalidPhone") : "Please enter a valid phone number.";
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

  // Targeted Budget (Detailed form only)
  if (id === "packageBudget") {
    if (!field.value.trim()) {
      isValid = false;
      errorMsg = reqMsg;
    } else if (isNaN(field.value.replace(/,/g, "")) || Number(field.value.replace(/,/g, "")) <= 0) {
      isValid = false;
      errorMsg = i18n ? i18n.getTranslation("validation.invalidBudget") : "Please enter a valid budget amount.";
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
  // Honeypot spam check: if hidden field is filled, silently stop bots
  const honeypot = document.getElementById("hp_website_lotus");
  if (honeypot && honeypot.value.trim() !== "") {
    console.warn("Spam bot submission intercepted by honeypot.");
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

  // Validate all fields
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
    // Scroll to first error
    const firstError = form.querySelector(".input-error, .error-message[style*='block']");
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return;
  }

  // Collect data
  const formData = extractFormData(form, isQuickForm);

  // Set loading state on submit button
  const submitBtn = document.getElementById("submitInquiryBtn");
  const originalBtnHtml = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.classList.add("loading");
  submitBtn.innerHTML = `
    <span class="spinner-lotus" aria-hidden="true"></span>
    <span data-i18n="form.submitting">${window.lotusI18n ? window.lotusI18n.getTranslation("form.submitting") : "Preparing your sacred journey..."}</span>
  `;

  try {
    // Send to chosen backend endpoint
    await submitToService(formData);

    // Save inquiry to localStorage for reference
    saveInquiryLocally(formData);

    // Show Thank-You Modal with WhatsApp action
    showThankYouModal(formData);

    // Reset form
    form.reset();
    document.querySelectorAll(".selectable-card.selected").forEach(card => card.classList.remove("selected"));
    const countrySearch = document.getElementById("countrySearchInput");
    if (countrySearch) countrySearch.value = "";
    const selectedCountryInput = document.getElementById("selectedCountry");
    if (selectedCountryInput) selectedCountryInput.value = "";
    setupPaxCalculator();

  } catch (error) {
    console.error("Submission failed, continuing to thank-you fallback:", error);
    // Even if external fetch fails (e.g. adblocker or no internet connection), don't lose the lead!
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
  
  // Selected hotel categories
  const hotelCategories = [];
  form.querySelectorAll('input[name="hotelCategory"]:checked').forEach(cb => {
    hotelCategories.push(cb.value);
  });

  // Meal plans (detailed)
  const mealPlans = [];
  form.querySelectorAll('input[name="mealPlan"]:checked').forEach(cb => {
    mealPlans.push(cb.value);
  });

  // Interests (detailed)
  const interests = [];
  form.querySelectorAll('input[name="interests"]:checked').forEach(cb => {
    interests.push(cb.value);
  });

  const dialCode = document.getElementById("whatsappDialCode") ? document.getElementById("whatsappDialCode").value : "+94";
  const rawPhone = document.getElementById("whatsappNumber") ? document.getElementById("whatsappNumber").value.trim() : "";
  const fullWhatsApp = `${dialCode} ${rawPhone}`;

  return {
    referenceId: refId,
    timestamp: new Date().toISOString(),
    isQuickForm: isQuickForm,
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
    mealPlan: mealPlans.join(", ") || "Standard",
    interests: interests.join(", ") || "General Sightseeing",
    currency: form.querySelector("#budgetCurrency") ? form.querySelector("#budgetCurrency").value : "USD",
    packageBudget: form.querySelector("#packageBudget") ? form.querySelector("#packageBudget").value.trim() : "Custom",
    otherRequirements: form.querySelector("#otherRequirements") ? form.querySelector("#otherRequirements").value.trim() : "None specified."
  };
}

/**
 * Submit to backend (Supabase / Formspree / EmailJS / Custom API)
 */
async function submitToService(data) {
  // 1. Direct Supabase Inquiries Table Insert with RLS Protection
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
        budget_range: `${data.currency || 'USD'} ${data.packageBudget || ''}`,
        special_notes: `Hotels: ${data.hotelCategory || 'N/A'}\nRooms: ${data.roomsRequired || '1'}\nMeal Plan: ${data.mealPlan || 'N/A'}\nNotes: ${data.otherRequirements || ''}`
      };
      const result = await window.LotusSupabase.submitInquiry(supaPayload);
      if (result && result.referenceNo) {
        data.referenceId = result.referenceNo;
      }
      console.info("[Lotus CMS] Inquiry recorded in Supabase:", data.referenceId);
    } catch (e) {
      console.warn("[Lotus CMS] Supabase insert warning:", e);
    }
  }

  const provider = LOTUS_CONFIG.submission ? LOTUS_CONFIG.submission.provider : null;

  if (provider === "formspree" && LOTUS_CONFIG.submission.formspreeEndpoint) {
    const response = await fetch(LOTUS_CONFIG.submission.formspreeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  if (provider === "custom_api" && LOTUS_CONFIG.submission.customApiEndpoint) {
    const response = await fetch(LOTUS_CONFIG.submission.customApiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  // Fallback simulator for GitHub Pages static hosting
  return new Promise((resolve) => setTimeout(resolve, 600));
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

  // Set reference
  const refDisplay = document.getElementById("modalRefId");
  if (refDisplay) refDisplay.textContent = data.referenceId;

  const clientName = document.getElementById("modalClientName");
  if (clientName) clientName.textContent = data.fullName;

  // Build WhatsApp pre-filled message
  const waBtn = document.getElementById("modalWhatsAppBtn");
  if (waBtn) {
    const msg = formatWhatsAppMessage(data);
    const encoded = encodeURIComponent(msg);
    waBtn.href = `https://wa.me/${LOTUS_CONFIG.phoneRaw}?text=${encoded}`;
  }

  // Populate preview summary list
  const summaryList = document.getElementById("modalSummaryList");
  if (summaryList) {
    summaryList.innerHTML = `
      <li><strong>Dates:</strong> ${data.arrivalDate || 'TBD'} to ${data.departureDate || 'TBD'}</li>
      <li><strong>Travelers:</strong> ${data.totalPax || '2'} Pax (${data.adults || '2'} Adults, ${data.children || '0'} Children)</li>
      <li><strong>Hotels:</strong> ${data.hotelCategory || 'Not selected'}</li>
      ${!data.isQuickForm ? `<li><strong>Budget:</strong> ${data.currency} ${data.packageBudget}</li>` : ''}
    `;
  }

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  // Close handlers
  const closeBtns = modal.querySelectorAll("[data-close-modal]");
  closeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      closeThankYouModal(modal);
    });
  });

  // Download / Save copy handler
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
🛏️ *Rooms Required:* ${data.roomsRequired || '1'}
🍽️ *Meal Plan:* ${data.mealPlan || 'BB'}
🎯 *Interests:* ${data.interests || 'Scenic Tour'}
💰 *Budget:* ${data.currency} ${data.packageBudget}
━━━━━━━━━━━━━━━━━━━━
📝 *Other Requirements:*
${data.otherRequirements || 'None'}
━━━━━━━━━━━━━━━━━━━━
_Submitted via Lotus Ceylon Official Website_`;
}
