with open('js/form.js', 'r', encoding='utf-8') as f:
    c = f.read()

c_norm = c.replace('\r\n', '\n')

old_endpoint_def = """// ============================================================================
// FORM ENDPOINT CONFIGURATION
// Replace this placeholder with your admin panel, cloud function, or webhook URL
// ============================================================================
const FORM_ENDPOINT = "https://api.lotusceylon.com/inquiries";"""

new_endpoint_def = """// ============================================================================
// FORM ENDPOINT CONFIGURATION (Dynamic with Formspree & Firestore support)
// ============================================================================
function getFormEndpoint() {
  if (window.LOTUS_CONFIG && window.LOTUS_CONFIG.submission && window.LOTUS_CONFIG.submission.formspreeEndpoint) {
    return window.LOTUS_CONFIG.submission.formspreeEndpoint;
  }
  return "https://formspree.io/f/mqkvnzyz";
}"""

old_post_block = """  // 6. POST JSON to FORM_ENDPOINT
  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Server returned status HTTP ${response.status}`);
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
    console.warn("Inquiry transmission to FORM_ENDPOINT failed or unavailable:", error);
    // Display error banner with pre-filled WhatsApp fallback link
    showSubmitErrorFallback(payload);
  }"""

new_post_block = """  // 6. Transmit Payload (Firestore write + Formspree endpoint)
  try {
    let transmitted = false;

    // Optional Firestore direct write if Firebase is active
    if (window.firebase && typeof window.firebase.firestore === "function") {
      try {
        const db = window.firebase.firestore();
        const collectionName = isQuickForm ? "inquiries_quick" : "inquiries_detailed";
        await db.collection(collectionName).add({
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
  }"""

if old_endpoint_def in c_norm and old_post_block in c_norm:
    c_norm = c_norm.replace(old_endpoint_def, new_endpoint_def)
    c_norm = c_norm.replace(old_post_block, new_post_block)
    with open('js/form.js', 'w', encoding='utf-8') as f:
        f.write(c_norm.replace('\n', '\r\n'))
    print('SUCCESS updating js/form.js')
else:
    print('Target blocks not found in js/form.js')
