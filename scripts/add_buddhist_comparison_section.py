with open('tours/buddhist-heritage/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

comp_section = """
  <!-- ==========================================================================
       SECTION: DYNAMIC TOUR PACKAGE COMPARISON MATRIX (100% BESPOKE LOTUS CEYLON)
       ========================================================================== -->
  <section class="lotus-comparison-section js-lotus-comparison" id="package-comparison" data-category="buddhist-heritage" data-data-path="../../data/packages.json" data-comparison-path="../../data/comparison_tables.json" data-subfolder="true">
    <div class="comparison-compact-wrapper">
      <div class="comparison-intro-header text-center">
        <span class="comparison-eyebrow" data-cms="cat_buddhist-heritage.span_comp_eyebrow">✦ SIDE-BY-SIDE ITINERARY COMPARISON</span>
        <h2 class="comparison-title" data-cms="cat_buddhist-heritage.heading_comp_title">Compare Sacred Sanctuaries &amp; Highlights</h2>
        <p class="comparison-subtitle" data-cms="cat_buddhist-heritage.p_comp_sub">
          Review how each Buddhist pilgrimage traverses Sri Lanka's venerated temples, forest hermitages, and UNESCO ancient capitals.
        </p>
      </div>
      <div class="lotus-table-responsive" tabindex="0" role="region" aria-label="Buddhist Heritage Package Comparison Table">
        <!-- Rendered dynamically by LotusTourComparison -->
      </div>
    </div>
  </section>
"""

target = "  <!-- Sacred Pilgrimage FAQ -->"
if target in html and 'js-lotus-comparison' not in html:
    html = html.replace(target, comp_section + "\n" + target)
    print("Added comparison section to tours/buddhist-heritage/index.html")

script_tag = '<script src="../../js/tour-comparison.js?v=20261025"></script>'
if script_tag not in html:
    cms_tag = '<script src="../../assets/js/cms.js'
    html = html.replace(cms_tag, script_tag + "\n  " + cms_tag)
    print("Added tour-comparison.js script tag to tours/buddhist-heritage/index.html")

with open('tours/buddhist-heritage/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
