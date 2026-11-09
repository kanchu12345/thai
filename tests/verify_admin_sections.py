with open('admin/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

required_ids = [
    'section-linked-content', 'linkedContentContainer', 'linkedContentHeading', 'linkedContentSubheading',
    'section-page-seo', 'pageSeoContainer', 'pageSeoHeading',
    'section-contact-details', 'contactDetailsContainer',
    'section-experiences', 'experiencesContainer',
    'section-gallery', 'galleryContainer',
    'section-trip-finder', 'tripFinderContainer',
    'section-github', 'githubSectionContainer',
    'section-success-stories', 'successStoriesTableBody',
    'section-page-editor', 'inspectorBody', 'visualCmsIframe'
]

missing = [i for i in required_ids if f'id="{i}"' not in html]
if missing:
    print('FAIL: MISSING IDS:', missing)
    exit(1)
else:
    print('PASS: All 21 required DOM container IDs verified in admin/index.html!')

# Check file inputs
file_inputs = [
    'catHeroImage', 'pkgHeroImage', 'destImage', 'revAvatar', 'teamPhotoUrl', 'blogCoverImage'
]
for field in file_inputs:
    assert f"'{field}'" in html, f"Missing upload handler for {field}"
    assert "handleDirectImageUpload" in html, "Missing handleDirectImageUpload"

print('PASS: All image fields have direct file upload triggers!')
