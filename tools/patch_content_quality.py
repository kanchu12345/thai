with open('index.html', 'r', encoding='utf-8') as f:
    idx_content = f.read().replace('\r\n', '\n')

old_counters = """<div class="counter-wrap">
<div class="counter-box counter-box--gold">
<p class="counter-number">
<span class="count-up" data-target="10">0</span>+
            </p>
<p class="counter-label">Years of Inbound Excellence</p>
</div>
<div class="counter-box counter-box--sapphire">
<p class="counter-number">
<span class="count-up" data-target="10">0</span>+
            </p>
<p class="counter-label">Global Country Representatives</p>
</div>
<div class="counter-box counter-box--emerald">
<p class="counter-number">
<span class="count-up" data-target="100">0</span>%
            </p>
<p class="counter-label">Tailor-Made Private Itineraries</p>
</div>
<div class="counter-box counter-box--lotus">
<p class="counter-number">
<span class="count-up" data-target="99.8">0.0</span>%
            </p>
<p class="counter-label">5-Star Guest Satisfaction</p>
</div>
</div>"""

new_counters = """<div class="counter-wrap">
<div class="counter-box counter-box--gold">
<p class="counter-number">
<span class="count-up" data-target="12">12</span>+
            </p>
<p class="counter-label">Years of Inbound Excellence</p>
</div>
<div class="counter-box counter-box--sapphire">
<p class="counter-number">
<span class="count-up" data-target="10">10</span>+
            </p>
<p class="counter-label">Global Country Representatives</p>
</div>
<div class="counter-box counter-box--emerald">
<p class="counter-number">
<span class="count-up" data-target="100">100</span>%
            </p>
<p class="counter-label">Tailor-Made Private Itineraries</p>
</div>
<div class="counter-box counter-box--lotus">
<p class="counter-number">
<span class="count-up" data-target="99.8">99.8</span>%
            </p>
<p class="counter-label">5-Star Guest Satisfaction</p>
</div>
</div>"""

if old_counters in idx_content:
    idx_content = idx_content.replace(old_counters, new_counters)
    with open('index.html', 'w', encoding='utf-8', newline='\n') as f:
        f.write(idx_content)
    print("SUCCESS: Fixed index.html default counter values.")
else:
    print("FAILED: old_counters not found in index.html")

# sri-lanka-tours.html duplicate FAQ removal
with open('sri-lanka-tours.html', 'r', encoding='utf-8') as f:
    sri_content = f.read().replace('\r\n', '\n')

old_duplicate_faq = """<!-- ==========================================================================
       WHY TRAVEL WITH LOTUS & FREQUENTLY ASKED QUESTIONS
       ========================================================================== -->
<section class="lotus-why-section" id="why-lotus">
<div id="lotusWhyContainer"></div>
</section>
<section class="lotus-faq-section" id="faqs">
<div id="lotusFaqContainer"></div>
</section>"""

if old_duplicate_faq in sri_content:
    sri_content = sri_content.replace(old_duplicate_faq, "")
    with open('sri-lanka-tours.html', 'w', encoding='utf-8', newline='\n') as f:
        f.write(sri_content)
    print("SUCCESS: Removed duplicated FAQ & Why Lotus section in sri-lanka-tours.html")
else:
    print("FAILED: old_duplicate_faq not found in sri-lanka-tours.html")
