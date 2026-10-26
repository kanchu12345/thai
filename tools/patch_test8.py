with open("tools/test_seo_accessibility_content.py", "r", encoding="utf-8") as f:
    c = f.read().replace('\r\n', '\n')

old_test8 = """        # -------------------------------------------------------------------------
        # TEST 8: WCAG Form Labels & Accessible Inputs
        # -------------------------------------------------------------------------
        page.goto("http://localhost:8089/inquiry-quick.html", wait_until="domcontentloaded")
        page.wait_for_timeout(800)

        form_labels = page.evaluate(\"\"\"() => {
            const inputs = document.querySelectorAll('input:not([type="hidden"]), select, textarea');
            let unlabelled = 0;
            inputs.forEach(inp => {
                const id = inp.id;
                let hasLabel = false;
                if (id && document.querySelector(`label[for="${id}"]`)) hasLabel = true;
                if (inp.closest('label')) hasLabel = true;
                if (inp.getAttribute('aria-label') || inp.getAttribute('aria-labelledby')) hasLabel = true;
                if (!hasLabel) unlabelled++;
            });
            return {
                totalInputs: inputs.length,
                unlabelled
            };
        }\"\"\")

        log_test("Test 8 - Accessible Form Controls", form_labels["unlabelled"] == 0,
                 f"Total inputs: {form_labels['totalInputs']}, Unlabeled inputs: {form_labels['unlabelled']}")"""

new_test8 = """        # -------------------------------------------------------------------------
        # TEST 8: WCAG Form Labels & Accessible Inputs
        # -------------------------------------------------------------------------
        page.goto("http://localhost:8089/inquiry-quick.html", wait_until="domcontentloaded")
        page.wait_for_timeout(800)

        form_labels_quick = page.evaluate(\"\"\"() => {
            const inputs = document.querySelectorAll('input:not([type="hidden"]):not([id^="goog-gt-"]), select, textarea');
            let unlabelled = 0;
            inputs.forEach(inp => {
                const id = inp.id;
                let hasLabel = false;
                if (id && document.querySelector(`label[for="${id}"]`)) hasLabel = true;
                if (inp.closest('label')) hasLabel = true;
                if (inp.getAttribute('aria-label') || inp.getAttribute('aria-labelledby') || inp.getAttribute('title')) hasLabel = true;
                if (!hasLabel) unlabelled++;
            });
            return {
                totalInputs: inputs.length,
                unlabelled
            };
        }\"\"\")

        page.goto("http://localhost:8089/inquiry-detailed.html", wait_until="domcontentloaded")
        page.wait_for_timeout(800)

        form_labels_detailed = page.evaluate(\"\"\"() => {
            const inputs = document.querySelectorAll('input:not([type="hidden"]):not([id^="goog-gt-"]), select, textarea');
            let unlabelled = 0;
            inputs.forEach(inp => {
                const id = inp.id;
                let hasLabel = false;
                if (id && document.querySelector(`label[for="${id}"]`)) hasLabel = true;
                if (inp.closest('label')) hasLabel = true;
                if (inp.getAttribute('aria-label') || inp.getAttribute('aria-labelledby') || inp.getAttribute('title')) hasLabel = true;
                if (!hasLabel) unlabelled++;
            });
            return {
                totalInputs: inputs.length,
                unlabelled
            };
        }\"\"\")

        all_forms_accessible = (form_labels_quick["unlabelled"] == 0) and (form_labels_detailed["unlabelled"] == 0)
        log_test("Test 8 - Accessible Form Controls (Quick & Bespoke)", all_forms_accessible,
                 f"Quick form unlabeled: {form_labels_quick['unlabelled']}, Detailed form unlabeled: {form_labels_detailed['unlabelled']}")"""

c = c.replace(old_test8, new_test8)
with open("tools/test_seo_accessibility_content.py", "w", encoding="utf-8", newline="\n") as f:
    f.write(c)

print("Updated Test 8 in test_seo_accessibility_content.py")
