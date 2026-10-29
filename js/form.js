/**

 * Lotus Ceylon International Tours & Services (Pvt) Ltd

 * Inquiry Form Controller (Quick & Detailed Forms)

 * 

 * Static site form handler designed for GitHub Pages hosting.

 * Handles validation, date boundaries, pax calculation (capped at 20),

 * searchable country & dial code pickers, URL prefilling, spam protection,

 * JSON POST submission to FORM_ENDPOINT, loading states, and WhatsApp fallback.

 */



// ============================================================================

// FORM ENDPOINT CONFIGURATION (Dynamic with Formspree & Firestore support)

// ============================================================================

function getFormEndpoint() {

  if (window.LOTUS_CONFIG && window.LOTUS_CONFIG.submission && window.LOTUS_CONFIG.submission.formspreeEndpoint) {

    return window.LOTUS_CONFIG.submission.formspreeEndpoint;

  }

  return "https://formspree.io/f/mqkvnzyz";

}



// Page load timestamp for minimum-time-on-page spam protection

const PAGE_LOAD_TIME = Date.now();

const MIN_TIME_ON_PAGE_MS = 3000; // Submissions in under 3 seconds are treated as automated bot traffic



document.addEventListener("DOMContentLoaded", () => {

  initInquiryFormEngine();

});



function initInquiryFormEngine() {

  const form = document.getElementById("inquiryForm");

  if (!form) return;



  const isQuickForm = form.classList.contains("quick-form") || window.location.pathname.includes("inquiry-quick");



  // Setup form modules

  setupCountrySelect();

  if (!isQuickForm) {

    setupWhatsAppDialSelect();

  }

  setupDatePickers();

  setupPaxControls(isQuickForm);

  setupHotelCategoryCards();

  handleUrlPrefill();



  if (!isQuickForm) {

    setupCharacterCounter();

  }



  // Setup live validation listeners

  setupLiveValidation(form);



  // Setup form submission handler

  form.addEventListener("submit", (e) => {

    e.preventDefault();

    handleFormSubmit(form, isQuickForm);

  });

}



/**

 * Handle URL Prefill Parameters:

 * Reads ?package=, ?category=, ?tour=, ?brand=

 * Displays "You are enquiring about: <value>" in #prefillBanner

 * Sets hidden input #prefillContext

 */

function handleUrlPrefill() {

  const urlParams = new URLSearchParams(window.location.search);

  const pkg = urlParams.get("package");

  const cat = urlParams.get("category");

  const tour = urlParams.get("tour");

  const brand = urlParams.get("brand");



  const prefillVal = pkg || tour || cat || brand;

  const prefillBanner = document.getElementById("prefillBanner");

  const prefillDisplay = document.getElementById("prefillValueDisplay");

  const prefillHidden = document.getElementById("prefillContext");



  if (prefillVal) {

    const cleanVal = decodeURIComponent(prefillVal).trim();

    if (prefillDisplay) {

      prefillDisplay.textContent = cleanVal;

    }

    if (prefillBanner) {

      prefillBanner.style.display = "flex";

    }

    if (prefillHidden) {

      prefillHidden.value = cleanVal;

    }



    // Also populate otherRequirements on detailed form if empty or initial

    const otherReq = document.getElementById("otherRequirements");

    if (otherReq && !otherReq.value.includes(cleanVal)) {

      const current = otherReq.value.trim();

      otherReq.value = (current ? current + "\n\n" : "") + `Enquiring about: ${cleanVal}`;

      const charCounter = document.getElementById("charCountDisplay");

      if (charCounter) {

        charCounter.textContent = `${otherReq.value.length} / 1000`;

      }

    }



    // Auto-check interest if category/tour matches

    const interestCbs = document.querySelectorAll('input[name="interests"]');

    if (interestCbs.length > 0) {

      const valLower = cleanVal.toLowerCase();

      interestCbs.forEach((cb) => {

        const cbLower = cb.value.toLowerCase();

        if (

          ((valLower.includes("buddhis") || valLower.includes("pilgrim") || valLower.includes("sacred")) && cbLower.includes("pilgrim")) ||

          ((valLower.includes("wildlife") || valLower.includes("yala") || valLower.includes("safari")) && cbLower.includes("wildlife")) ||

          ((valLower.includes("culture") || valLower.includes("heritage") || valLower.includes("sigiriya") || valLower.includes("kandy")) && cbLower.includes("culture")) ||

          ((valLower.includes("nature") || valLower.includes("ella") || valLower.includes("tea")) && cbLower.includes("nature")) ||

          ((valLower.includes("beach") || valLower.includes("coastal") || valLower.includes("galle")) && cbLower.includes("beach")) ||

          ((valLower.includes("ayurveda") || valLower.includes("wellness")) && cbLower.includes("ayurveda"))

        ) {

          cb.checked = true;

        }

      });

    }

  }

}



/**

 * Searchable Country Dropdown

 * Supports ISO codes, names, and aliases (e.g. UK, USA)

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

    const filtered = COUNTRIES_DATA.filter((c) => {

      if (c.name.toLowerCase().includes(filterLower)) return true;

      if (c.code.toLowerCase().includes(filterLower)) return true;

      if (filterLower === "uk" && c.code === "GB") return true;

      if (c.aliases && c.aliases.some((a) => a.toLowerCase().includes(filterLower))) return true;

      return false;

    });



    if (filtered.length === 0) {

      const emptyItem = document.createElement("li");

      emptyItem.className = "picker-option no-results";

      emptyItem.textContent = "No matching countries found";

      list.appendChild(emptyItem);

      return;

    }



    filtered.forEach((c) => {

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

    list.classList.remove("is-open");

    input.setAttribute("aria-expanded", "false");



    // Auto-sync WhatsApp dial code in detailed form if user hasn't explicitly customized it

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

    list.classList.add("is-open");

    input.setAttribute("aria-expanded", "true");

    renderOptions("");

  });



  input.addEventListener("input", (e) => {

    wrapper.classList.add("open");

    list.classList.add("is-open");

    renderOptions(e.target.value);

  });



  input.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

      wrapper.classList.remove("open");

      list.classList.remove("is-open");

      input.setAttribute("aria-expanded", "false");

    }

  });



  document.addEventListener("click", (e) => {

    if (!wrapper.contains(e.target)) {

      wrapper.classList.remove("open");

      list.classList.remove("is-open");

      input.setAttribute("aria-expanded", "false");

      if (!hiddenInput.value && input.value) {

        input.value = "";

      }

    }

  });



  renderOptions();

}



/**

 * WhatsApp International Dial Code Picker (Detailed Form)

 */

function setupWhatsAppDialSelect() {

  const wrapper = document.getElementById("dialPickerWrapper");

  const button = document.getElementById("dialPickerBtn");

  const display = document.getElementById("whatsappDialDisplay");

  const hiddenInput = document.getElementById("whatsappDialCode");

  const list = document.getElementById("dialOptionsList");

  const searchInput = document.getElementById("dialSearchInput");

  const menu = wrapper ? wrapper.querySelector(".dial-dropdown-menu") : null;

  if (!wrapper || !button || !display || !hiddenInput || !list || typeof COUNTRIES_DATA === "undefined") return;



  function renderDialOptions(filter = "") {

    list.innerHTML = "";

    const filterLower = filter.toLowerCase().trim();

    const filtered = COUNTRIES_DATA.filter((c) =>

      c.name.toLowerCase().includes(filterLower) ||

      c.dial_code.includes(filterLower) ||

      c.code.toLowerCase().includes(filterLower) ||

      (filterLower === "uk" && c.code === "GB")

    );



    filtered.forEach((c) => {

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

        if (menu) menu.classList.remove("is-open");

      });

      list.appendChild(li);

    });

  }



  button.addEventListener("click", (e) => {

    e.preventDefault();

    e.stopPropagation();

    const isOpen = wrapper.classList.toggle("open");

    if (menu) menu.classList.toggle("is-open", isOpen);

    if (isOpen && searchInput) {

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

      if (menu) menu.classList.remove("is-open");

    }

  });



  // Default to Sri Lanka (+94)

  const defaultCountry = COUNTRIES_DATA.find((c) => c.code === "LK") || COUNTRIES_DATA[0];

  hiddenInput.value = defaultCountry.dial_code;

  display.innerHTML = `<span class="flag-icon">${defaultCountry.flag}</span> <span class="dial-num">${defaultCountry.dial_code}</span>`;

  renderDialOptions();

}



/**

 * Arrival and Departure Date Pickers:

 * - Arrival date min = today

 * - Departure date min = arrival date + 1 day

 * - Auto-bumps departure date if departure <= arrival

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

 * Passenger Count Management:

 * - Quick Form: single dropdown 1-20

 * - Detailed Form: Adults (1-15) + Children (0-10) auto-calculator

 *   Updates read-only total travellers badge and strictly caps at 20.

 */

function setupPaxControls(isQuickForm) {

  if (isQuickForm) {

    const paxSelect = document.getElementById("noPaxSelect");

    if (paxSelect) {

      paxSelect.addEventListener("change", () => {

        validateField(paxSelect);

      });

    }

    return;

  }



  // Detailed Form

  const adultsSelect = document.getElementById("adultsPax");

  const childrenSelect = document.getElementById("childrenPax");

  const totalDisplay = document.getElementById("totalPaxCount");

  const hiddenTotalInput = document.getElementById("totalPax");

  const paxWarning = document.getElementById("paxMaxWarning");

  const paxSummary = document.getElementById("paxSummaryText");



  if (!adultsSelect || !childrenSelect || !totalDisplay) return;



  function calculateDetailedPax() {

    let adults = parseInt(adultsSelect.value, 10) || 1;

    let children = parseInt(childrenSelect.value, 10) || 0;

    let total = adults + children;



    // Strict cap: never exceed 20 travellers

    if (total > 20) {

      children = Math.max(0, 20 - adults);

      childrenSelect.value = String(children);

      total = 20;



      if (paxWarning) {

        paxWarning.textContent = "Total travellers cannot exceed 20 guests online. Adjusted children count.";

        paxWarning.style.display = "block";

      }

    } else {

      if (paxWarning) {

        paxWarning.textContent = "";

        paxWarning.style.display = "none";

      }

    }



    totalDisplay.textContent = total;

    if (hiddenTotalInput) {

      hiddenTotalInput.value = total;

    }



    if (paxSummary) {

      const adultLabel = adults === 1 ? "1 Adult" : `${adults} Adults`;

      const childLabel = children === 0 ? "0 Children" : children === 1 ? "1 Child" : `${children} Children`;

      paxSummary.textContent = `(${adultLabel}, ${childLabel} · Max 20 Total)`;

    }

  }



  adultsSelect.addEventListener("change", calculateDetailedPax);

  childrenSelect.addEventListener("change", calculateDetailedPax);

  calculateDetailedPax();

}



/**

 * Hotel Category Checkboxes

 */

function setupHotelCategoryCards() {

  const checkboxes = document.querySelectorAll('input[name="hotelCategory"]');



  checkboxes.forEach((cb) => {

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

}



function validateHotelCategory() {

  const checkboxes = document.querySelectorAll('input[name="hotelCategory"]:checked');

  const errorEl = document.getElementById("hotelCategoryError");

  if (!errorEl) return true;



  if (checkboxes.length === 0) {

    errorEl.textContent = "Please select at least one hotel category.";

    errorEl.style.display = "block";

    return false;

  } else {

    errorEl.textContent = "";

    errorEl.style.display = "none";

    return true;

  }

}



/**

 * Character counter for Detailed Form textarea

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

 * Field Validation

 */

function setupLiveValidation(form) {

  const inputs = form.querySelectorAll("input, select, textarea");

  inputs.forEach((input) => {

    input.addEventListener("blur", () => {

      validateField(input);

    });



    input.addEventListener("input", () => {

      const errorEl = document.getElementById(`${input.id}Error`);

      if (errorEl && errorEl.style.display === "block") {

        validateField(input);

      }

    });

  });

}



function validateField(field) {

  if (!field) return true;

  const id = field.id;

  const errorEl = document.getElementById(`${id}Error`);



  let isValid = true;

  let errorMsg = "";



  // 1. Full Name

  if (id === "fullName") {

    const val = field.value.trim();

    if (!val) {

      isValid = false;

      errorMsg = "Please enter your name.";

    } else if (val.length < 2) {

      isValid = false;

      errorMsg = "Please enter your full name (at least 2 letters).";

    }

  }



  // 2. Country

  if (id === "selectedCountry") {

    if (!field.value.trim()) {

      isValid = false;

      errorMsg = "Please select your country.";

    }

  }



  // 3. Email Address

  if (id === "emailAddress") {

    const val = field.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!val) {

      isValid = false;

      errorMsg = "Email address is required.";

    } else if (!emailRegex.test(val)) {

      isValid = false;

      errorMsg = "Please enter a valid email address (e.g. name@example.com).";

    }

  }



  // 4. WhatsApp Number (Detailed form only, optional - validate only if filled)

  if (id === "whatsappNumber") {

    const val = field.value.trim();

    if (val !== "") {

      const rawNum = val.replace(/[^0-9]/g, "");

      if (rawNum.length < 6 || rawNum.length > 16) {

        isValid = false;

        errorMsg = "Please enter a valid phone number (6–16 digits).";

      }

    }

  }



  // 5. Arrival Date

  if (id === "arrivalDate") {

    if (!field.value) {

      isValid = false;

      errorMsg = "Please select your arrival date to Sri Lanka.";

    } else {

      const selected = new Date(field.value);

      const today = new Date();

      today.setHours(0, 0, 0, 0);

      if (selected < today) {

        isValid = false;

        errorMsg = "Arrival date cannot be in the past.";

      }

    }

  }



  // 6. Departure Date

  if (id === "departureDate") {

    const arrivalVal = document.getElementById("arrivalDate") ? document.getElementById("arrivalDate").value : null;

    if (!field.value) {

      isValid = false;

      errorMsg = "Please select your departure date from Sri Lanka.";

    } else if (arrivalVal) {

      const arrival = new Date(arrivalVal);

      const departure = new Date(field.value);

      if (departure <= arrival) {

        isValid = false;

        errorMsg = "Departure date must be after your arrival date.";

      }

    }

  }



  // 7. No Pax (Quick form dropdown)

  if (id === "noPaxSelect") {

    if (!field.value) {

      isValid = false;

      errorMsg = "Please select the number of travellers.";

    }

  }



  // 8. Privacy Consent Checkbox

  if (id === "privacyConsent") {

    if (!field.checked) {

      isValid = false;

      errorMsg = "You must accept the Privacy Policy to submit an inquiry.";

    }

  }



  // Render inline error state & accessibility attributes

  if (errorEl) {

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

  }



  // Special handling for country picker search input styling

  if (id === "selectedCountry") {

    const searchInput = document.getElementById("countrySearchInput");

    if (searchInput) {

      if (!isValid) {

        searchInput.classList.add("input-error");

        searchInput.setAttribute("aria-invalid", "true");

      } else {

        searchInput.classList.remove("input-error");

        searchInput.setAttribute("aria-invalid", "false");

      }

    }

  }



  return isValid;

}



/**

 * Main Form Submission Handler

 */

async function handleFormSubmit(form, isQuickForm) {

  // 1. Spam Protection: Honeypot check

  const honeypot = document.getElementById("hp_website_lotus");

  if (honeypot && honeypot.value.trim() !== "") {

    console.warn("Spam honeypot triggered; neutralising submission.");

    showThankYouModal(extractPayload(form, isQuickForm));

    return;

  }



  // 2. Spam Protection: Minimum time-on-page check (< 3 seconds rejected)

  const timeOnPage = Date.now() - PAGE_LOAD_TIME;

  if (timeOnPage < MIN_TIME_ON_PAGE_MS) {

    console.warn(`Spam guard triggered: form submitted too quickly (${timeOnPage}ms).`);

    showThankYouModal(extractPayload(form, isQuickForm));

    return;

  }



  // 3. Validate All Required Fields

  let isAllValid = true;



  const fullName = form.querySelector("#fullName");

  if (fullName && !validateField(fullName)) isAllValid = false;



  const selectedCountry = form.querySelector("#selectedCountry");

  if (selectedCountry && !validateField(selectedCountry)) isAllValid = false;



  const emailAddress = form.querySelector("#emailAddress");

  if (emailAddress && !validateField(emailAddress)) isAllValid = false;



  const whatsappNumber = form.querySelector("#whatsappNumber");

  if (whatsappNumber && !validateField(whatsappNumber)) isAllValid = false;



  const arrivalDate = form.querySelector("#arrivalDate");

  if (arrivalDate && !validateField(arrivalDate)) isAllValid = false;



  const departureDate = form.querySelector("#departureDate");

  if (departureDate && !validateField(departureDate)) isAllValid = false;



  if (isQuickForm) {

    const noPaxSelect = form.querySelector("#noPaxSelect");

    if (noPaxSelect && !validateField(noPaxSelect)) isAllValid = false;

  }



  if (!validateHotelCategory()) {

    isAllValid = false;

  }



  const privacyConsent = form.querySelector("#privacyConsent");

  if (privacyConsent && !validateField(privacyConsent)) {

    isAllValid = false;

  }



  if (!isAllValid) {

    const firstError = form.querySelector(".input-error, .error-message[style*='block']");

    if (firstError) {

      firstError.scrollIntoView({ behavior: "smooth", block: "center" });

    }

    return;

  }



  // 4. Construct JSON Payload

  const payload = extractPayload(form, isQuickForm);



  // 5. Submit Button Loading State

  const submitBtn = document.getElementById("submitInquiryBtn");

  const originalBtnHtml = submitBtn ? submitBtn.innerHTML : "Submit";

  if (submitBtn) {

    submitBtn.disabled = true;

    submitBtn.classList.add("loading");

    submitBtn.innerHTML = `

      <span class="spinner-lotus" aria-hidden="true"></span>

      <span>Submitting inquiry...</span>

    `;

  }



  // Hide existing error banner if visible

  const errorBanner = document.getElementById("formSubmitError");

  if (errorBanner) {

    errorBanner.style.display = "none";

  }



  // 6. Transmit Payload (Firestore write + Formspree endpoint)

  try {

    let transmitted = false;



    
    // Initialize Firebase for Inquiries if loaded
    if (window.firebase && (!window.firebase.apps || window.firebase.apps.length === 0)) {
      const fbConfig = (window.LOTUS_CONFIG && window.LOTUS_CONFIG.firebase) || {
        apiKey: "AIzaSyD5NyCFaPHeS1cKlsgxZ_WsraswHlYonNA",
        authDomain: "louterst-36b64.firebaseapp.com",
        projectId: "louterst-36b64",
        storageBucket: "louterst-36b64.firebasestorage.app",
        messagingSenderId: "416036235757",
        appId: "1:416036235757:web:544c89abdb74b41a585fe4"
      };
      try {
        window.firebase.initializeApp(fbConfig);
      } catch (e) {
        console.warn('[Form] Firebase init check:', e.message);
      }
    }

    // Optional Firestore direct write if Firebase is active

    if (window.firebase && typeof window.firebase.firestore === "function") {

      try {

        const db = window.firebase.firestore();

        const collectionName = isQuickForm ? "inquiries_quick" : "inquiries_detailed";
        const inqDocPayload = {
          ...payload,
          formType: isQuickForm ? 'quick' : 'detailed',
          hp_website_lotus: "",
          submittedAt: new Date().toISOString()
        };

        await db.collection(collectionName).add(inqDocPayload);
        await db.collection("inquiries").add(inqDocPayload);
        // Write to mail collection for Firebase Trigger Email Extension
        try {
          await db.collection("mail").add({
            to: ["paliforbuddhism@gmail.com"],
            message: {
              subject: `[Lotus Ceylon Inquiry] ${payload.referenceId} - ${payload.name}`,
              html: `<p><strong>Ref:</strong> ${payload.referenceId}</p><p><strong>Name:</strong> ${payload.name}</p><p><strong>Email:</strong> ${payload.email}</p><p><strong>WhatsApp:</strong> ${payload.whatsapp}</p><p><strong>Pax:</strong> ${payload.totalPax || payload.pax || 'N/A'}</p><p><strong>Hotels:</strong> ${Array.isArray(payload.hotelCategory) ? payload.hotelCategory.join(', ') : payload.hotelCategory}</p><p><strong>Dates:</strong> ${payload.arrivalDate || ''} to ${payload.departureDate || ''}</p><p><strong>Notes:</strong> ${payload.otherRequirements || ''}</p>`
            }
          });
        } catch (mailErr) {
          console.warn("[Trigger Email] Mail collection write deferred:", mailErr);
        }
        if (false) await db.collection(collectionName).add({

          ...payload,

          hp_website_lotus: "", // Honeypot pass

          submittedAt: new Date().toISOString()

        });

        transmitted = true;

      } catch (fbErr) {

        console.warn("[Lotus Inquiries] Firestore direct write deferred:", fbErr);

      }

    }

    



    // Submit to configured endpoint (Formspree)

    const endpoint = getFormEndpoint();

    if (endpoint) {

      try {

        const response = await fetch(endpoint, {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

            "Accept": "application/json"

          },

          body: JSON.stringify(payload)

        });

        if (response.ok) {

          transmitted = true;

        } else if (!transmitted) {

          throw new Error(`Server returned status HTTP ${response.status}`);

        }

      } catch (fetchErr) {

        if (!transmitted) throw fetchErr;

      }

    }



    if (!transmitted) {

      throw new Error("All submission endpoints unavailable");

    }



    // Success response

    showThankYouModal(payload);

    form.reset();



    // Reset selectable card classes

    document.querySelectorAll(".selectable-card.selected").forEach((c) => c.classList.remove("selected"));

    const countrySearch = document.getElementById("countrySearchInput");

    if (countrySearch) countrySearch.value = "";

    if (selectedCountry) selectedCountry.value = "";

    setupPaxControls(isQuickForm);



  } catch (error) {

    console.warn("Inquiry transmission failed, displaying concierge fallback:", error);

    // Display error banner with pre-filled WhatsApp fallback link

    showSubmitErrorFallback(payload);

  } finally {

    if (submitBtn) {

      submitBtn.disabled = false;

      submitBtn.classList.remove("loading");

      submitBtn.innerHTML = originalBtnHtml;

    }

  }

}



/**

 * Extract Complete Payload

 */

function extractPayload(form, isQuickForm) {

  const refId = "LC-" + new Date().getFullYear() + "-" + Math.floor(100000 + Math.random() * 900000);



  const hotelCategories = [];

  form.querySelectorAll('input[name="hotelCategory"]:checked').forEach((cb) => {

    hotelCategories.push(cb.value);

  });



  const mealPlans = [];

  form.querySelectorAll('input[name="mealPlan"]:checked').forEach((cb) => {

    mealPlans.push(cb.value);

  });



  const interests = [];

  form.querySelectorAll('input[name="interests"]:checked').forEach((cb) => {

    interests.push(cb.value);

  });



  const dialCode = document.getElementById("whatsappDialCode") ? document.getElementById("whatsappDialCode").value : "+94";

  const rawPhone = document.getElementById("whatsappNumber") ? document.getElementById("whatsappNumber").value.trim() : "";

  const fullWhatsApp = rawPhone ? `${dialCode} ${rawPhone}` : "";



  const totalPax = isQuickForm

    ? (form.querySelector("#noPaxSelect") ? form.querySelector("#noPaxSelect").value : "2")

    : (form.querySelector("#totalPax") ? form.querySelector("#totalPax").value : "2");



  return {

    referenceId: refId,

    formType: isQuickForm ? "quick" : "detailed",

    name: form.querySelector("#fullName") ? form.querySelector("#fullName").value.trim() : "",

    country: form.querySelector("#selectedCountry") ? form.querySelector("#selectedCountry").value.trim() : "",

    email: form.querySelector("#emailAddress") ? form.querySelector("#emailAddress").value.trim() : "",

    whatsapp: fullWhatsApp,

    arrivalDate: form.querySelector("#arrivalDate") ? form.querySelector("#arrivalDate").value : "",

    departureDate: form.querySelector("#departureDate") ? form.querySelector("#departureDate").value : "",

    pax: isQuickForm ? totalPax : undefined,

    adults: !isQuickForm && form.querySelector("#adultsPax") ? form.querySelector("#adultsPax").value : undefined,

    children: !isQuickForm && form.querySelector("#childrenPax") ? form.querySelector("#childrenPax").value : undefined,

    totalPax: totalPax,

    hotelCategory: hotelCategories,

    rooms: !isQuickForm && form.querySelector("#roomsRequired") ? form.querySelector("#roomsRequired").value : undefined,

    mealPlan: !isQuickForm ? mealPlans : undefined,

    interests: !isQuickForm ? interests : undefined,

    budget: !isQuickForm && form.querySelector("#packageBudget") ? form.querySelector("#packageBudget").value : undefined,

    otherRequirements: !isQuickForm && form.querySelector("#otherRequirements") ? form.querySelector("#otherRequirements").value.trim() : undefined,

    prefill: form.querySelector("#prefillContext") ? form.querySelector("#prefillContext").value : "",

    language: document.documentElement.lang || "en",

    timestamp: new Date().toISOString()

  };

}



/**

 * Display Error Banner with Pre-filled WhatsApp Concierge Fallback

 */

function showSubmitErrorFallback(data) {

  const banner = document.getElementById("formSubmitError");

  const waLink = document.getElementById("waFallbackLink");

  if (!banner) return;



  const msg = formatWhatsAppMessage(data);

  const waUrl = `https://wa.me/94715422384?text=${encodeURIComponent(msg)}`;



  if (waLink) {

    waLink.href = waUrl;

  }



  banner.style.display = "block";

  banner.scrollIntoView({ behavior: "smooth", block: "center" });

}



/**

 * Display Thank You Modal

 */

function showThankYouModal(data) {

  const modal = document.getElementById("thankYouModal");

  if (!modal) return;



  const refDisplay = document.getElementById("modalRefId");

  if (refDisplay) refDisplay.textContent = data.referenceId;



  // WhatsApp concierge button inside modal

  const waBtn = document.getElementById("modalWhatsAppBtn");

  if (waBtn) {

    const msg = formatWhatsAppMessage(data);

    waBtn.href = `https://wa.me/94715422384?text=${encodeURIComponent(msg)}`;

  }



  // Populate preview summary list

  const summaryList = document.getElementById("modalSummaryList");

  if (summaryList) {

    const hotelsStr = Array.isArray(data.hotelCategory) ? data.hotelCategory.join(", ") : data.hotelCategory;

    summaryList.innerHTML = `

      <li><strong>Dates:</strong> ${data.arrivalDate || "TBD"} to ${data.departureDate || "TBD"}</li>

      <li><strong>Travelers:</strong> ${data.totalPax || "2"} Pax ${data.formType === "detailed" ? `(${data.adults || 2} Adults, ${data.children || 0} Children)` : ""}</li>

      <li><strong>Hotels:</strong> ${hotelsStr || "Standard Selection"}</li>

      ${data.budget ? `<li><strong>Targeted Budget:</strong> ${data.budget}</li>` : ""}

      ${data.prefill ? `<li><strong>Enquiring About:</strong> ${data.prefill}</li>` : ""}

    `;

  }



  modal.classList.add("is-open", "show");

  modal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");



  const closeBtns = modal.querySelectorAll("[data-close-modal]");

  closeBtns.forEach((btn) => {

    btn.onclick = () => {

      closeThankYouModal(modal);

    };

  });

}



function closeThankYouModal(modal) {

  modal.classList.remove("is-open", "show");

  modal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");

}



/**

 * Format Human-Readable WhatsApp Inquiry Message

 */

function formatWhatsAppMessage(data) {

  const hotelsStr = Array.isArray(data.hotelCategory) ? data.hotelCategory.join(", ") : data.hotelCategory;

  const mealsStr = Array.isArray(data.mealPlan) ? data.mealPlan.join(", ") : data.mealPlan;

  const interestsStr = Array.isArray(data.interests) ? data.interests.join(", ") : data.interests;



  let msg = `🌺 *LOTUS CEYLON - ${data.formType === 'quick' ? 'QUICK' : 'TRAVEL'} INQUIRY*\n`;

  msg += `━━━━━━━━━━━━━━━━━━━━\n`;

  msg += `📌 *Reference:* ${data.referenceId}\n`;

  msg += `👤 *Name:* ${data.name}\n`;

  msg += `🌍 *Country:* ${data.country}\n`;

  msg += `✉️ *Email:* ${data.email}\n`;

  if (data.whatsapp) {

    msg += `📱 *WhatsApp:* ${data.whatsapp}\n`;

  }

  msg += `━━━━━━━━━━━━━━━━━━━━\n`;

  msg += `✈️ *Arrival Date:* ${data.arrivalDate}\n`;

  msg += `🛫 *Departure Date:* ${data.departureDate}\n`;

  if (data.formType === "detailed") {

    msg += `👥 *Travelers:* ${data.totalPax} Pax (${data.adults || 2} Adults, ${data.children || 0} Children)\n`;

  } else {

    msg += `👥 *Total Pax:* ${data.totalPax} Persons\n`;

  }

  msg += `🏨 *Hotel Preferences:* ${hotelsStr || "Standard"}\n`;

  if (data.rooms) {

    msg += `🛏️ *No. Rooms:* ${data.rooms}\n`;

  }

  if (mealsStr) {

    msg += `🍽️ *Meal Plan:* ${mealsStr}\n`;

  }

  if (interestsStr) {

    msg += `🎯 *Interests:* ${interestsStr}\n`;

  }

  if (data.budget) {

    msg += `💰 *Targeted Budget (USD/person):* ${data.budget}\n`;

  }

  if (data.prefill) {

    msg += `🔖 *Enquiring About:* ${data.prefill}\n`;

  }

  if (data.otherRequirements) {

    msg += `━━━━━━━━━━━━━━━━━━━━\n📝 *Other Requirements:*\n${data.otherRequirements}\n`;

  }

  msg += `━━━━━━━━━━━━━━━━━━━━\n`;

  msg += `_Sent from Lotus Ceylon Official Website (${data.language || 'en'})_`;



  return msg;

}

